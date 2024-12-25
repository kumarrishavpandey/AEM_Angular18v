import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { forkJoin } from 'rxjs';

import { calendarToBeHide } from '../leave-constant';
import { DashboardService } from '../services/dashboard.service';
import { SelectRegionComponent } from './select-region/select-region.component';
import { CommonService } from '../../shared/services/common.service';
import { AdobeAnalyticsService } from '../../shared/services/adobe-analytics.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('SelectRegionComponent', { static: false })
  selectRegionComp: SelectRegionComponent;

  @ViewChild(MatMenuTrigger) ddTrigger: MatMenuTrigger;

  @Output() openTabEvent = new EventEmitter<void>();

  @Input() dashboardLabels: any;

  upcomingHolidayLeaves : any[]= [];

  selectedView: string;

  selectedCalendarName: string;

  selectedCalendarCode: string;

  isCalendarView: boolean = true;

  leave_balance_data;

  userPersona;

  selectedElementName: string;

  selectedCountryName: string;

  holidayCalendarsList = [];

  regionData;

  subRegions;

  selectedCalendarDate: Date = new Date();

  isDataLoaded: boolean = false;

  constructor(
    private dashboardService: DashboardService,
    private commonService: CommonService,
    private analyticsService: AdobeAnalyticsService,
  ) {}

  ngOnInit() {
    /* Defalut value of selected view */
    this.selectedView = this.dashboardLabels.btnCalendarView;
    this.commonService.getEmployeeTimeOff().then((timeOff) => {
      if (calendarToBeHide.includes(timeOff)) {
        this.selectedCalendarCode = 'Corporate_Office';
      } else {
        this.selectedCalendarCode = timeOff;
      }
      this.selectedElementName = this.selectedCalendarCode;

      this.combineApiCalls();
      this.getUserPersona();
      this.getLeaveBalance();
      this.getLeaveAndHolidayList();
    });
  }

  updateDashboardSelectedRegion(el) {
    this.selectedElementName = el?.subItem
      ? `${el?.subItem}, ${el?.item}`
      : `${el?.item}`;

    this.selectedCalendarCode = el?.subItemCode
      ? `${el?.subItemCode}`
      : `${el?.code}`;
    this.getLeaveAndHolidayList();
  }

  getUserPersona() {
    this.commonService.fetchPersonaInfo().subscribe((userPersona) => {
      this.userPersona = userPersona;
    });
  }

  setSelectedDate(date: Date) {
    this.selectedCalendarDate = date;
  }

  toggleView(type: string) {
    switch (type) {
      case this.dashboardLabels.btnCalendarView:
        this.selectedView = this.dashboardLabels.btnCalendarView;
        this.isCalendarView = true;
        break;
      case this.dashboardLabels.btnListView:
        this.selectedView = this.dashboardLabels.btnListView;
        this.isCalendarView = false;
        break;
      default:
        break;
    }
  }

  onApplyLeaveButtonClick() {
    this.adobeAnalyticsOnButtonClick('Apply Leave');
    this.openParentTab();
  }

  openParentTab() {
    this.openTabEvent.emit();
  }

  // Get Leave balance data
  getLeaveBalance() {
    this.dashboardService
      .getEmployeeDashboardLeaveBalance()
      .subscribe((val) => {
        if (val && 'data' in val && 'leaveTypes' in val.data) {
          this.isDataLoaded = true;
          this.leave_balance_data = val.data.leaveTypes;
        }
      });
  }

  /* eslint-disable no-param-reassign */

  combineApiCalls() {
    const holidayCalendars$ = this.dashboardService.getHolidayCalendars();
    const pickList$ = this.commonService.getPickList({
      picklistId: ['ISOCountryList'],
    });

    // Assuming regionData is an array
    this.regionData = [];
    this.subRegions = [];

    forkJoin([holidayCalendars$, pickList$]).subscribe(
      ([holidayCalendarsData, pickListData]) => {
        this.isDataLoaded = true;
        const indexOfIndia = holidayCalendarsData.data.calenderData.findIndex(
          (item) => item.countryCode === 'IND',
        );

        const filteredHolidayCalendarData = holidayCalendarsData?.data?.calenderData[
          indexOfIndia
        ].calendarList.filter(
          (el) => !calendarToBeHide.includes(el.calendarCode),
        );

        holidayCalendarsData.data.calenderData[indexOfIndia].calendarList = [];
        holidayCalendarsData.data.calenderData[indexOfIndia].calendarList = filteredHolidayCalendarData;

        this.holidayCalendarsList = holidayCalendarsData.data.calenderData;

        const picklistArray = pickListData[0].Picklist;
        const countryCodeLabelMap = picklistArray.reduce((acc, item) => {
          acc[item.externalCode] = {
            label: item.label,
          };
          return acc;
        }, {});

        this.holidayCalendarsList.forEach((calendar) => {
          const labelInfo = countryCodeLabelMap[calendar.countryCode];
          if (labelInfo) {
            calendar.label = labelInfo.label;
          }

          // Integration with the second piece of code when countryCode = IND
          if (calendar.countryCode === 'IND') {
            if (
              calendar.calendarList.calendarCode !== 'KA_HC'
              && calendar.calendarList.calendarCode !== 'TLAP_HC'
              && calendar.calendarList.calendarCode !== 'TN_HC'
              && calendar.calendarList.calendarCode !== 'KL_HC'
            ) {
              // Add regions other than South directly into regionData array
              calendar.calendarList.forEach((element) => {
                if (
                  element.calendarCode !== 'KA_HC'
                  && element.calendarCode !== 'TLAP_HC'
                  && element.calendarCode !== 'TN_HC'
                  && element.calendarCode !== 'KL_HC'
                ) {
                  // Add regions other than South directly into regionData array
                  let regionName = '';
                  if (element.calendarName === 'Eastern Holiday Calendar') {
                    regionName = 'East';
                  } else if (
                    element.calendarName === 'Northern Holiday Calendar'
                  ) {
                    regionName = 'North';
                  } else if (
                    element.calendarName === 'Western Holiday Calendar'
                  ) {
                    regionName = 'West';
                  } else if (
                    element.calendarName === 'Flying Holiday Calendar'
                  ) {
                    regionName = 'Flying';
                  }
                  this.regionData.push({
                    calendarName:
                      regionName !== '' ? regionName : element.calendarName,
                    calendarCode: element.calendarCode,
                    subRegion: [],
                  });
                } else if (element.calendarCode === 'KA_HC') {
                  calendar.calendarList.forEach((subElement) => {
                    // Handle South region separately

                    if (
                      subElement.calendarCode === 'KA_HC'
                      || subElement.calendarCode === 'KL_HC'
                      || subElement.calendarCode === 'TLAP_HC'
                      || subElement.calendarCode === 'TN_HC'
                    ) {
                      let regionName = '';

                      // Determine subRegionName based on calendarName
                      if (
                        subElement.calendarName === 'Karnataka Holiday Calendar'
                      ) {
                        regionName = 'South - Bangalore';
                      } else if (
                        subElement.calendarName === 'Kerala Holiday Calendar'
                      ) {
                        regionName = 'South - Kerala';
                      } else if (
                        subElement.calendarName
                        === 'Telangana & AP  Holiday Calendar'
                      ) {
                        regionName = 'South - Hyderabad';
                      } else if (
                        subElement.calendarName
                        === 'Tamil Nadu Holiday Calendar'
                      ) {
                        regionName = 'South - Chennai';
                      }

                      this.regionData.push({
                        calendarName:
                          regionName !== '' ? regionName : element.calendarName,
                        calendarCode: subElement.calendarCode,
                      });
                    }
                  });
                }
              });

              // Replace calendarList with regionData
              calendar.calendarList = this.regionData;
              delete calendar.regionData;
            }
          }
        });
      },
      () => {},
    );
  }

  // Get leaves and holiday list
  getLeaveAndHolidayList() {
    this.upcomingHolidayLeaves = [];

    this.dashboardService
      .getEmployeeDashboardLeaveList(this.selectedCalendarCode)
      .subscribe((response) => {
        if (response && 'data' in response) {
          const { data } = response;
          if (data && 'upcomingHolidayLeavesCalendarView' in data) {
            this.upcomingHolidayLeaves = data.upcomingHolidayLeavesCalendarView;
            this.isDataLoaded = true;
          }
        }
      });
  }

  onHeaderButtonClick(clickName: string) {
    /* Adobe analytics on the of calendar or list  */
    this.adobeAnalyticsOnButtonClick(clickName);

    this.toggleView(clickName);
  }

  selectRegionButtonClicked() {
    /* Adobe analytics on the click ofselect region */
    this.adobeAnalyticsOnButtonClick('Select Region');
  }

  adobeAnalyticsOnButtonClick(clickName: string) {
    this.analyticsService.clickEventDatalayer({
      isErrorPage: false,
      siteSection: 'Leave Request',
      siteSubSection: 'Dashboard',
      clickInfo: {
        clickName,
        clickComponentType: 'Button',
        componentName: 'Dashboard',
        componentID: 'Leave_Dashboard',
      },
    });
  }
}
