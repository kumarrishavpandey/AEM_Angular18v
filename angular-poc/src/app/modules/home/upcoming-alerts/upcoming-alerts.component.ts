import { DatePipe } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { combineLatest, forkJoin, Subject } from 'rxjs';
import { distinctUntilChanged, take, takeUntil } from 'rxjs/operators';
import { GET_DOCUMENTS } from '../../../../app/app.api';
import { AnalyticsComponent } from '../../shared/constants';
import { DateWithoutYearPipe } from '../../shared/pipes/date-without-year.pipe';
// import { AdobeAnalyticsService } from '../../shared/services/adobe-analytics.service';
import { CommonService } from '../../shared/services/common.service';
import { DebugService } from '../../shared/services/debug.service';
import { RosterService } from '../../shared/services/roster-http.service';
import { StorageEncryptionService } from '../../shared/services/storage-encryption.service';
import {
  calculateDaysDifference,
  getAemDamFullPath,
  getFullCountryName,
} from '../../../../utils/utils';
import { HomeService } from '../home.service';
import { UpcomingAlertModalComponent } from '../upcoming-alert-modal/upcoming-alert-modal.component';

@Component({
  selector: 'app-upcoming-alerts',
  templateUrl: './upcoming-alerts.component.html',
  styleUrls: ['./upcoming-alerts.component.scss'],
})
export class UpcomingAlertsComponent implements OnInit, OnDestroy {
  @Input()
  siteSection: string;

  @Input() upcomingLabels: any;

  todayDate = new Date();

  isUserLoggedFromIndia: boolean;

  userPersona;

  dataNotComingImagePath: string;

  alertList: any[] = [];

  viewMoreToggle = false;

  pilotCrewAEMResponse = {
    flightTxt: 'Flight',
    onTxt: 'on',
    fromTxt: 'from',
    toTxt: 'to',
    yourTxt: 'Your ',
    goingToExpTxt: 'is set to expire in ',
    expiredTxt: 'is expired.',
    dayTxt: 'days',
    alertTxt: 'Please renew ASAP',
    alerts: {
      passport: 30,
      visa: 90,
      aep: 60,
      tsa: 60,
    },
  };

  docsWithCountry = ['passport', 'aep', 'visa'];

  pilotCrewAlertInfo = [];

  isDataLoaded: boolean = false;

  getDurationDays = calculateDaysDifference;

  upcomingDateFormat: string;

  private readonly _destroying$ = new Subject<void>();

  initialized: boolean = false;

  myTeamBirthdayFormat: string;

  constructor(
    public dialog: MatDialog,
    private storageEncryptionService: StorageEncryptionService,
    private commonService: CommonService,
    private rosterService: RosterService,
    private homeService: HomeService,
    private router: Router,
    private datePipe: DatePipe,
    // private analyticsService: AdobeAnalyticsService,
    private dateWithoutYearPipe: DateWithoutYearPipe,
    private debugService: DebugService
  ) {}

  ngOnInit(): void {
    this.commonService
      .getDateFormat()
      .pipe(distinctUntilChanged(), takeUntil(this._destroying$))
      .subscribe((data) => {
        this.upcomingDateFormat = data?.upcomingForGeneralEmployees;
        this.myTeamBirthdayFormat = data?.myTeamBirthday;
      });

    /* Data not coming getting from AEM */
    this.dataNotComingImagePath = getAemDamFullPath(
      this.commonService.checkIfVistaraLocale()
        ? '/content/dam/my-ai/upcoming/noDrafts.svg'
        : '/content/dam/my-ai/home-page/icon/data-not-coming.svg'
    );
    // currently ui handled with static data once api integrated need to add the loader accordingly

    this.commonService
      .getEmpDataStatus()
      .pipe(distinctUntilChanged(), takeUntil(this._destroying$))
      .subscribe((loaded: boolean) => {
        if (loaded && !this.initialized) {
          this.initialized = true;
          this.getUserPersona();
          this.isUserLoggedFromIndia =
            this.commonService.isLoggedInEmpFromIndia();
        }
      });
  }

  ngOnDestroy(): void {
    this._destroying$.next();
    this._destroying$.complete();
  }

  viewAlertModal() {
    // this.trackClickEvent(this.upcomingLabels.btnText, this.upcomingLabels.title, null);

    /* Close all open dialog */
    this.dialog.closeAll();

    /* Open dialog */
    this.dialog.open(UpcomingAlertModalComponent, {
      panelClass: 'upcoming-modal',
      autoFocus: false,
      data: {
        pilotCrewAlertInfo: this.alertList,
        userPersona: this.userPersona,
        employeeAlertInfo: this.alertList,
        upcomingLabels: this.upcomingLabels,
      },
    });
  }

  getUserPersona() {
    this.commonService.getEmployeeRole().then(async (userPersona: string) => {
      this.userPersona = userPersona;
      if (this.commonService.checkIfVistaraLocale()) {
        if (this.userPersona === 'General') {
          this.fetchEmployeeAlertInformation();
        } else {
          this.isDataLoaded = true;
        }
      } else if (
        this.userPersona === 'Pilot' ||
        this.userPersona === 'Cabin Crew'
      ) {
        this.fetchRosterInformation();
        this.updateCrewNoDataScenarion();
      } else {
        this.fetchEmployeeAlertInformation();
      }
    });
  }

  fetchEmployeeAlertInformation() {
    const todayDate = `${new Date().getFullYear()}-${(new Date().getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${new Date().getDate().toString().padStart(2, '0')}`;

    const employeeId = this.storageEncryptionService.getEmpId();

    forkJoin([
      this.homeService.getUpcomingAlertDataFromAEM(
        this.commonService?.getLocale(),
        this.commonService?.loggedInEmployeeData?.function,
        this.commonService?.loggedInEmployeeData?.location
      ),
      this.homeService.getUpcomingHolidayData(
        employeeId,
        this.commonService?.loggedInEmployeeData?.timeInfo?.holidayCalendar,
        todayDate,
        this.upcomingLabels?.holidaysList?.duration
      ),
      this.homeService.getUpcomingTeamBirthdayData(
        employeeId,
        'B',
        'All',
        1,
        100,
        this.upcomingLabels?.teamBirthdaysList?.duration
      ),
      this.homeService.getUpcomingLearningData(employeeId, 'upcoming', 1),
    ])
      .pipe(takeUntil(this._destroying$))
      .subscribe(([aemData, holidayData, teamData, learningData]: any) => {
        // 1. Goal setting data
        this.isDataLoaded = true;
        const doj = new Date(
          this.commonService.loggedInEmployeeData?.dateOfJoining?.replace(
            ' ',
            'T'
          )
        );

        aemData?.data?.goalSettingList?.items.forEach((item) => {
          if (
            doj <= new Date(item?.cutOffDate) &&
            this.isBetweenDates(item?.startDate, item?.endDate)
          ) {
            const alertDate = new Date(item?.date);
            this.alertList.push({
              ...item,
              summaryAlert: item?.date
                ? `Due: ${this.datePipe.transform(
                    alertDate,

                    this.upcomingDateFormat
                  )}`
                : null,
              designation: null,
            });
          }
        });

        // 2. Tax document data
        aemData?.data?.taxDocumentsList?.items.forEach((item) => {
          if (this.isBetweenDates(item?.startDate, item?.endDate)) {
            const alertDate = new Date(item?.date);
            this.alertList.push({
              ...item,
              summaryAlert: item?.date
                ? `Due: ${this.datePipe.transform(
                    alertDate,

                    this.upcomingDateFormat
                  )}`
                : null,
              designation: null,
            });
          }
        });

        // 3. Events data
        aemData?.data?.eventsList?.items.forEach((item) => {
          if (this.isBetweenDates(item?.startDate, item?.endDate)) {
            this.alertList.push({
              ...item,
              summaryAlert: 'NA',
              date: this.datePipe.transform(
                item?.date,
                this.upcomingDateFormat
              ),
              designation: null,
            });
          }
        });

        // 4. Learning module
        if (
          learningData?.status?.code === 200 &&
          learningData?.data?.courses &&
          learningData?.data?.courses?.length > 0 &&
          this.commonService.loggedInEmployeeData?.isManager === 'YES' &&
          this.commonService.isLoggedInEmpFromIndia()
        ) {
          const learningVal = learningData?.data?.courses[0];
          const learningDuration = this.getDurationDays(
            todayDate,
            learningVal?.registrationEndDate
          );
          const summaryText =
            learningDuration > 0
              ? `${learningDuration} days left`
              : 'Last day left';

          this.alertList.push({
            name: this.upcomingLabels?.learningCalendarList?.name,
            summary: this.upcomingLabels?.learningCalendarList?.summary,
            date: this.datePipe.transform(
              learningVal.date,
              this.upcomingDateFormat
            ),
            icon: this.upcomingLabels?.learningCalendarList?.icon,
            iconColor: this.upcomingLabels?.learningCalendarList?.iconColor,
            iconBgColor: this.upcomingLabels?.learningCalendarList?.iconBgColor,
            type: 'learning-calendar',
            cutOffDate: null,
            eventLocation: null,
            isExternal: this.upcomingLabels?.learningCalendarList?.isExternal,
            externalLink:
              this.upcomingLabels?.learningCalendarList?.externalLink,
            criticality: this.upcomingLabels?.learningCalendarList?.criticality,
            summaryAlert: learningVal?.registrationEndDate ? summaryText : null,
            designation: null,
          });
        }

        // 5. Holiday data
        if (
          holidayData?.status?.code === 200 &&
          holidayData?.data?.upcomingHolidayLeavesCalendarView &&
          holidayData?.data?.upcomingHolidayLeavesCalendarView?.length > 0
        ) {
          const holidayFilterData =
            holidayData?.data?.upcomingHolidayLeavesCalendarView.filter(
              (filterData) => filterData?.title === 'Holiday'
            );
          holidayFilterData.forEach((el: any) => {
            this.alertList.push({
              name: el?.extendedProps?.name,
              summary: null,
              date: this.datePipe.transform(el?.start, this.upcomingDateFormat),
              icon: this.upcomingLabels?.holidaysList?.icon,
              iconColor: this.upcomingLabels?.holidaysList?.iconColor,
              iconBgColor: this.upcomingLabels?.holidaysList?.iconBgColor,
              type: 'holidays',
              cutOffDate: null,
              eventLocation: null,
              isExternal: this.upcomingLabels?.holidaysList?.isExternal,
              externalLink: this.upcomingLabels?.holidaysList?.externalLink,
              criticality: this.upcomingLabels?.holidaysList?.criticality,
              summaryAlert: 'NA',
              designation: null,
            });
          });
        }

        // 6. Team birthday
        /* eslint-disable no-unsafe-optional-chaining */
        if (
          teamData?.status?.code === 200 &&
          teamData?.data?.teamList &&
          teamData?.data?.teamList?.length > 0
        ) {
          teamData?.data?.teamList.forEach((el: any) => {
            this.alertList.push({
              name: this.upcomingLabels?.teamBirthdaysList?.title,
              summary: `${el?.firstName} ${el?.middleName} ${el?.lastName}`,
              date: this.dateWithoutYearPipe.transform(
                el?.dob,
                this.myTeamBirthdayFormat
              ),
              icon: this.upcomingLabels?.teamBirthdaysList?.icon,
              iconColor: this.upcomingLabels?.teamBirthdaysList?.iconColor,
              iconBgColor: this.upcomingLabels?.teamBirthdaysList?.iconBgColor,
              type: 'team-birthdays',
              cutOffDate: null,
              eventLocation: null,
              isExternal: this.upcomingLabels?.teamBirthdaysList?.isExternal,
              externalLink:
                this.upcomingLabels?.teamBirthdaysList?.externalLink,
              criticality: this.upcomingLabels?.teamBirthdaysList?.criticality,
              summaryAlert: 'NA',
              designation: el?.jobTitle,
            });
          });
        }

        // To display sorting
        this.sortData();
      });
    this.isDataLoaded = true;
  }

  sortData() {
    if (this.alertList?.length > 0) {
      this.alertList = this.alertList?.sort((a: any, b: any) => {
        const criticalityOrder = { High: 1, Medium: 2, Low: 3 };
        const categoryOrder = {
          'goal-setting': 1,
          'tax-document': 2,
          events: 3,
          'learning-calendar': 4,
          holidays: 5,
          'team-birthdays': 6,
        };

        // Sort criticality
        if (
          criticalityOrder[a.criticality] !== criticalityOrder[b.criticality]
        ) {
          return (
            criticalityOrder[a.criticality] - criticalityOrder[b.criticality]
          );
        }

        // If criticality is the same, compare by date
        if (a?.date && b?.date) {
          const dateComparison =
            new Date(a.date).getTime() - new Date(b.date).getTime();
          if (dateComparison !== 0) {
            return dateComparison;
          }
        } else {
          return -1;
        }

        // If date is also the same, compare by categoryId ascending
        return categoryOrder[a.type] - categoryOrder[b.type];
      });
    }
    this.viewMoreToggle = this.alertList?.length > 2;
  }

  navigateToURL(data) {
    if (data?.isExternal) {
      // this.trackClickEvent(data.name, this.upcomingLabels.title, data.externalLink);

      if (
        data?.externalLink?.toLowerCase().startsWith('https://') ||
        data?.externalLink?.toLowerCase().startsWith('http://')
      ) {
        window.open(data?.externalLink, '_blank');
      } else {
        this.router.navigateByUrl(data?.externalLink);
      }
    }
  }

  fetchRosterInformation() {
    combineLatest([
      this.rosterService.getUpcomingRosterInfor(),
      this.homeService.getDocExpInfo(GET_DOCUMENTS),
    ])
      .pipe(takeUntil(this._destroying$), take(1))
      .subscribe(
        ([info, doc]: any) => {
          // for pilot and cabin crew upcoming section will only contain roster and docs expiry info
          this.alertList = [];
          info.forEach((item) => {
            this.alertList.push({
              icon: 'flight',
              summary: `${this.pilotCrewAEMResponse.flightTxt} <b>${item.flightNumber}</b> ${this.pilotCrewAEMResponse.onTxt} <b>${item.depDate}</b> ${this.pilotCrewAEMResponse.fromTxt} <b>${item.src} (${item.depTime})</b> ${this.pilotCrewAEMResponse.toTxt} <b>${item.destination} (${item.arrTime})</b>`,
            });
          });
          this.viewMoreToggle = this.alertList?.length > 3;
          this.calcDocAlertInfo(doc);
          this.isDataLoaded = true;
        },
        (error) => {
          this.isDataLoaded = true;
          this.debugService.log('Error retrieving API:', error);
        }
      );
  }

  updateCrewNoDataScenarion() {
    this.upcomingLabels.noDataTitle = this.upcomingLabels?.crewList.noDataTitle;
    this.upcomingLabels.noDataDesc = this.upcomingLabels?.crewList.noDataDesc;
    this.dataNotComingImagePath = getAemDamFullPath(
      '/content/dam/my-ai/upcoming/noDrafts.svg'
    );
  }

  calcDocAlertInfo(docs) {
    if (this.upcomingLabels && this.upcomingLabels.crewAlertList) {
      this.pilotCrewAEMResponse.alerts = this.upcomingLabels.crewAlertList;
    }
    const expDoc = docs.filter(
      (item) =>
        item.expiry_days <=
        this.pilotCrewAEMResponse.alerts[item.documentType.toLowerCase()]
    );
    expDoc.sort((a, b) => a.expiry_days - b.expiry_days);
    expDoc.forEach((doc) => {
      if (doc.expiry_days > 0) {
        let summaryTxt = '';
        if (this.docsWithCountry.indexOf(doc.documentType.toLowerCase()) > -1) {
          summaryTxt = `${
            this.pilotCrewAEMResponse.yourTxt
          } ${this.getFullDocName(doc.documentType)}(${getFullCountryName(
            doc.issueCountryCode
          )}) ${this.pilotCrewAEMResponse.goingToExpTxt} ${doc.expiry_days} ${
            this.pilotCrewAEMResponse.dayTxt
          }`;
        } else {
          summaryTxt = `${
            this.pilotCrewAEMResponse.yourTxt
          } ${this.getFullDocName(doc.documentType)} ${
            this.pilotCrewAEMResponse.goingToExpTxt
          } ${doc.expiry_days} ${this.pilotCrewAEMResponse.dayTxt}`;
        }
        this.alertList.push({
          icon: 'warning',
          summary: summaryTxt,
          alert: `${this.pilotCrewAEMResponse.alertTxt}`,
        });
      } else {
        this.alertList.push({
          icon: 'warning',
          summary: `${this.pilotCrewAEMResponse.yourTxt} ${
            doc.sub_documentType || doc.documentType?.toUpperCase()
          } ${this.pilotCrewAEMResponse.expiredTxt}`,
          alert: `${this.pilotCrewAEMResponse.alertTxt}`,
        });
      }
    });
    this.viewMoreToggle = this.alertList?.length > 3;
  }

  isBetweenDates(startDate, endDate): boolean {
    const currentDate = new Date();
    return (
      currentDate >= new Date(startDate) && currentDate <= new Date(endDate)
    );
  }

  getFullDocName(id) {
    const docName = this.upcomingLabels?.docNames
      ? this.upcomingLabels?.docNames[id]
      : '';
    if (docName) {
      return docName;
    }
    return id;
  }

  // trackClickEvent(
  //   clickName: string,
  //   componentName: string,
  //   linkURL: string,
  // ) {
  //   this.analyticsService.trackClickEvent({
  //     siteSection: this.siteSection,
  //     siteSubSection: this.upcomingLabels.title,
  //     clickName,
  //     clickComponentType: AnalyticsComponent.BUTTON,
  //     componentName,
  //     linkURL,
  //   });
  // }
}
