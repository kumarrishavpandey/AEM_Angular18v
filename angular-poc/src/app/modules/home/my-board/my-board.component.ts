/* eslint no-param-reassign: 'off' */
/* eslint no-prototype-builtins: 'off' */
/* eslint no-restricted-globals: 'off' */
/* eslint  no-nested-ternary: 'off' */
import { DatePipe } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

import {
  GET_FLYING_STATS,
  GET_LEAVE_BALANCE,
  GET_TAKEOFFS_LANDINGS,
  LOGGEDIN_EMP,
  MY_BOARD_LEAVE_REDIRECTION_URL,
} from '../../../../app/app.api';
import { CommonService } from '../../shared/services/common.service';
import { DebugService } from '../../shared/services/debug.service';
import { StorageEncryptionService } from '../../shared/services/storage-encryption.service';
import { environment } from '../../../../environments/environment';
import { EmployeeProfileService } from '../../employee-profile/employee-profile.service';
import { NavigationService } from '../../navigation/navigation.service';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-my-board',
  templateUrl: './my-board.component.html',
  styleUrls: ['./my-board.component.scss'],
})
export class MyBoardComponent implements OnInit, OnDestroy {
  @Input()
  siteSection: string;

  @Input()
  myBoardData: any;

  persona: string = '';

  selectedResponse: any;

  learningsResponse: any = {};

  learningResponseError: boolean;

  leaveBalResponseError: boolean;

  employeeId;

  leaveBalance: any = [];

  plLeaves: any;

  clLeaves: any;

  slLeaves: any;

  isTimeProfileEqual: boolean;

  cardDataResult: any;

  errorInfo = {
    text: 'Not updated',
    cardColour: '#BCBBBB',
    gradient3Color: '#EDECEC',
    gradient4Color: '#BCBBBB',
  };

  toolLblPrefix = 'For ';

  loadingLearningData: boolean = false;

  loadingLeaveBalance: boolean = false;

  isDataLoaded: boolean = false;

  personalNavList: any;

  subscription: Subscription = new Subscription();

  crewDashboardInfoMessageTooltipDateFormat: string;

  private readonly _destroying$ = new Subject<void>();

  initialized: boolean = false;

  constructor(
    private commonService: CommonService,
    private homeService: HomeService,
    private storageEncryptionService: StorageEncryptionService,
    private empProfileService: EmployeeProfileService,
    private datePipe: DatePipe,
    private navigationService: NavigationService,
    private debugService: DebugService
  ) {}

  ngOnInit(): void {
    this.commonService.fetchLoggedInEmployeeData().subscribe((data) => {});
    this.subscription.add(
      this.navigationService.personalisedNavigation
        .pipe(distinctUntilChanged(), takeUntil(this._destroying$))
        .subscribe((data) => {
          if (data) {
            this.personalNavList = data.personalNavList;

            this.commonService
              .getDateFormat()
              .pipe(takeUntil(this._destroying$))
              .subscribe((crewData) => {
                this.crewDashboardInfoMessageTooltipDateFormat =
                  crewData.crewDashboardInfoMessageTooltip;
              });

            this.employeeId =
              this.storageEncryptionService.getvalue(LOGGEDIN_EMP);
            this.getEmployeeRole(this.employeeId);
          }
        })
    );
  }

  ngOnDestroy() {
    this._destroying$.next();
    this._destroying$.complete();
    this.subscription.unsubscribe();
  }

  async checkTimeProfileEquality(employeeId) {
    this.isTimeProfileEqual =
      await this.commonService.isTimeProfileEqualTP_F_M();
    if (!this.isTimeProfileEqual) {
      this.getLeaveBalance(employeeId);
    }
  }

  getEmployeeRole(employeeId) {
    this.commonService.getEmployeeRole().then(
      (userPersona) => {
        this.persona = userPersona;
        this.selectedResponse = this.myBoardData?.personaData?.find(
          (persona) =>
            persona?.persona.toLowerCase() === this.persona.toLowerCase()
        );
        if (this.commonService.checkIfVistaraLocale()) {
          this.leaveBalResponseError = true;
          this.learningsResponse = { data: {} };
          this.selectedResponse.cards.forEach((cardData) => {
            cardData.data = '';
            cardData.dataUnitMins = '';
            this.generateInfoText(cardData);
            this.learningsResponse.data = {
              ...this.learningsResponse.data,
              [cardData.id]: '',
            };
          });
          this.isDataLoaded = true;
        } else if (this.persona === 'Pilot' || this.persona === 'Cabin Crew') {
          this.loadFlyingCrewData(employeeId);
        } else {
          this.getEmpLearningData();
          this.checkTimeProfileEquality(employeeId);
        }
      },
      (error) => {
        this.debugService.log('Error fetching employee role:', error);
      }
    );
  }

  getEmpLearningData() {
    this.loadingLearningData = true;
    this.homeService
      .getLearningData()
      .pipe(takeUntil(this._destroying$))
      .subscribe(
        (learningData) => {
          this.learningResponseError = false;
          this.learningsResponse = learningData;
        },
        (error) => {
          this.learningResponseError = true;
          this.loadingLearningData = false;
          this.checkLoadingState();
          this.debugService.log('Error fetching employee role:', error);
        },
        () => {
          this.loadingLearningData = false;
          this.checkLoadingState();
        }
      );
  }

  getLeaveBalance(id) {
    this.loadingLeaveBalance = true;
    this.empProfileService
      .getLeaveBalance(id)
      .pipe(takeUntil(this._destroying$))
      .subscribe(
        (data) => {
          if (data && data.data !== null) {
            this.leaveBalResponseError = false;
            this.leaveBalance = data?.data?.leaveTypes;
            this.leaveBalance.forEach((leave) => {
              const leaveBalanceFloat = parseFloat(leave.leaveBalance);
              leave.leaveBalance = Number.isInteger(leaveBalanceFloat)
                ? leave.leaveBalance
                : leaveBalanceFloat.toFixed(2);
            });
            this.plLeaves = this.leaveBalance?.find(
              (leave) => leave.leaveCode === 'PL'
            )?.leaveBalance;
            this.clLeaves = this.leaveBalance?.find(
              (leave) => leave.leaveCode === 'CL'
            )?.leaveBalance;
            this.slLeaves = this.leaveBalance?.find(
              (leave) => leave.leaveCode === 'SL'
            )?.leaveBalance;
          } else {
            this.leaveBalResponseError = false;
            this.leaveBalance = [];
          }
        },
        (error) => {
          this.loadingLeaveBalance = false;
          this.checkLoadingState();
          this.leaveBalResponseError = true;
          this.debugService.log('Error fetching employee leaves data:', error);
        },
        () => {
          this.loadingLeaveBalance = false;
          this.checkLoadingState();
        }
      );
  }

  checkLoadingState() {
    if (!this.loadingLearningData && !this.loadingLeaveBalance) {
      this.isDataLoaded = true;
    }
  }

  generateLinearGradient(
    gradient1Color: string,
    gradient2Color: string,
    gradient3Color: string,
    gradient4Color: string
  ): string {
    const linearGradientString = `linear-gradient(${gradient1Color}, ${gradient2Color}) padding-box, linear-gradient(${gradient3Color}, ${gradient4Color}) border-box`;
    return linearGradientString;
  }

  generateBorderBottom(color): string {
    return `6px solid ${color}`;
  }

  generateInfoText(element) {
    if (Number(element.data) > 0) {
      let txt = element.subTitle ? element.subTitle : '';
      if (element.subTitle === null) {
        element.subData?.forEach((item, index) => {
          txt = `${txt} ${item} ${element.unitArray[index]?.key} /`;
        });
        txt = txt ? txt.substring(0, txt.length - 2) : '';
      }
      element.subTitle = txt;
    } else if (!element.data && element.data !== 0) {
      // null check
      element.dataUnit = '';
      element.subTitle = this.myBoardData?.commonMessages?.errorText;
      element.infoText = this.errorInfo.text;
      element.infoTextTooltip = '';
      element.gradient3Color = this.errorInfo.gradient3Color;
      element.gradient4Color = this.errorInfo.gradient4Color;
      element.cardcolor = this.errorInfo.gradient4Color;
    } else if (Number(element.data) === 0) {
      element.subTitle = element.zeroDataSubtitle;
      if (element.id !== 'flightDutyPeriod') {
        element.infoText = element.zeroDataInfoText;
      }
    }
  }

  leaveBalanceSum(): any {
    return (
      parseFloat(this.plLeaves) +
      parseFloat(this.clLeaves) +
      parseFloat(this.slLeaves)
    ).toFixed(2);
  }

  leaveBalanceSubText() {
    return `${this.plLeaves} PL / ${this.clLeaves} CL / ${this.slLeaves} SL`;
  }

  navigateTo(cardId: string, cardTitle: string): void {
    if (this.commonService.checkIfVistaraLocale()) {
      return;
    }

    if (cardId === 'leaveBalance') {
      window.location.href = MY_BOARD_LEAVE_REDIRECTION_URL;
    } else {
      // window.open(EMP_CARD_REDIRECT_URLS, '_blank');
      let disprzAction;
      let tcsIonAction;

      this.personalNavList?.actionList?.forEach((action) => {
        if (action.appId === environment.DISPRZ_APP_ID && action.linkPath) {
          disprzAction = action;
        }
        if (action.appId === environment.TCS_ION_APP_ID && action.linkPath) {
          tcsIonAction = action;
        }
      });

      if (disprzAction) {
        window.open(disprzAction.linkPath, '_blank');
      } else if (tcsIonAction && !disprzAction) {
        window.open(tcsIonAction.linkPath, '_blank');
      }
    }
  }

  getCardData(card: any): any {
    const leaveBalanceSum = this.leaveBalanceSum();
    const cardData = this.learningsResponse?.data?.[card?.id];
    return card.id !== 'leaveBalance' &&
      cardData !== undefined &&
      !isNaN(cardData)
      ? cardData
      : isNaN(leaveBalanceSum)
      ? 0
      : leaveBalanceSum;
  }

  getLearningCardData(card: any): {
    value: string;
    unit: string;
    minObj?: { value: string; unit: string };
  } | null {
    const cardData = this.learningsResponse?.data?.[card?.id];

    if (cardData < 60) {
      return { value: `${cardData}`, unit: card?.dataUnitMins };
    }
    if (cardData >= 60 && cardData < 6000) {
      const hours = Math.floor(cardData / 60);
      const mins = cardData % 60;
      return {
        value: `${hours}`,
        unit: card?.dataUnitHrs,
        minObj: {
          value: `${mins}`,
          unit: card?.dataUnitMins,
        },
      };
    }
    return { value: `${cardData}`, unit: card?.dataUnit };
  }

  getLeaveBalanceText(card: any): any {
    return this.leaveBalanceSum() !== 0 &&
      this.leaveBalanceSum() !== undefined &&
      !isNaN(this.leaveBalanceSum())
      ? this.leaveBalanceSubText()
      : card?.zeroDataSubtitle;
  }

  getCardSubText(card: any): any {
    return this.learningsResponse?.data &&
      this.learningsResponse?.data[card?.id] !== 0 &&
      this.learningsResponse?.data[card?.id] !== undefined
      ? card?.subTitle
      : card?.zeroDataSubtitle;
  }

  loadFlyingCrewData(employeeId) {
    if (this.persona === 'Pilot') {
      this.homeService
        .getTakeOffsLanding(GET_TAKEOFFS_LANDINGS, employeeId)
        .pipe(takeUntil(this._destroying$))
        .subscribe(
          (info) => {
            this.selectedResponse.cards[1].data = info?.totalperformance;
            const dataArr = [];
            dataArr.push(
              this.parseResponse(info.takeOffsLandings, null, 'take offs')?.val
            );
            dataArr.push(
              this.parseResponse(info.takeOffsLandings, null, 'landings')?.val
            );
            this.selectedResponse.cards[1].subData = dataArr;
            // this.selectedResponse.cards[1].infoTextTooltip = info?.info;
            this.generateInfoText(this.selectedResponse.cards[1]);
            this.generateTooltipText(this.selectedResponse.cards[1], 90);
          },
          (err) => {
            this.generateInfoText(this.selectedResponse.cards[1]);
            this.debugService.log('Error fetching take offs data:', err);
          }
        );
    }
    this.homeService
      .getFlyingStats(GET_FLYING_STATS, employeeId)
      .pipe(takeUntil(this._destroying$))
      .subscribe(
        (info) => {
          // Pay Hours
          const flyingHrs = this.parseResponse(
            info.stat,
            info.statInfoIcon,
            'FLYING HOURS'
          );
          this.selectedResponse.cards[0].data = this.convertHrMin(
            flyingHrs?.val
          );
          this.selectedResponse.cards[0].infoTextTooltip = '';
          this.selectedResponse.cards[0].dataUnit = '';
          this.selectedResponse.cards[0].infoText = flyingHrs?.tooltipTxt;
          this.generateInfoText(this.selectedResponse.cards[0]);
          if (this.selectedResponse.cards[0].data === '0h') {
            this.selectedResponse.cards[0].subTitle =
              this.selectedResponse.cards[0].zeroDataSubtitle;
          }
          // SOD Hours
          const sodHrs = this.parseResponse(
            info.stat,
            info.statInfoIcon,
            'SOD HOURS'
          );
          this.selectedResponse.cards[2].data = this.convertHrMin(sodHrs?.val);
          this.selectedResponse.cards[2].infoTextTooltip = '';
          this.selectedResponse.cards[2].dataUnit = '';
          this.selectedResponse.cards[2].infoText = sodHrs?.tooltipTxt;
          this.generateInfoText(this.selectedResponse.cards[2]);
          if (this.selectedResponse.cards[2].data === '0h') {
            this.selectedResponse.cards[2].subTitle =
              this.selectedResponse.cards[2].zeroDataSubtitle;
          }

          if (this.persona === 'Cabin Crew') {
            // Night Stops
            const nightStops = this.parseResponse(
              info.stat,
              info.statInfoIcon,
              'NIGHT STOP'
            );
            this.selectedResponse.cards[1].data = isNaN(
              Math.floor(nightStops?.val)
            )
              ? nightStops?.val
              : Math.floor(nightStops?.val);
            this.selectedResponse.cards[1].infoTextTooltip = '';
            this.selectedResponse.cards[1].infoText = nightStops?.tooltipTxt;
            this.generateInfoText(this.selectedResponse.cards[1]);
          } else if (this.persona === 'Pilot') {
            const simHrs = this.parseResponse(
              info.stat,
              info.statInfoIcon,
              'SIM INST HRS'
            );
            if (simHrs?.val && this.selectedResponse.cards[0].data !== '0h') {
              const unit = this.selectedResponse.cards[0].unitArray[1].key;
              const simHrMin = this.convertHrMin(simHrs.val);
              this.selectedResponse.cards[0].subTitle = `${this.selectedResponse.cards[0].subTitle} & ${simHrMin} ${unit}`;
            }
          }
        },
        (err) => {
          this.generateInfoText(this.selectedResponse.cards[0]);
          this.generateInfoText(this.selectedResponse.cards[2]);
          if (this.persona === 'Cabin Crew') {
            this.generateInfoText(this.selectedResponse.cards[1]);
          }
          this.debugService.log('Error fetching flying statistics data:', err);
        }
      );
    this.homeService
      .getLeaveBalance(GET_LEAVE_BALANCE, employeeId)
      .pipe(takeUntil(this._destroying$))
      .subscribe(
        (info) => {
          this.selectedResponse.cards[3].data = info.totalleaves;
          const dataArr = [];
          dataArr.push(
            this.parseResponse(info.leaves, null, 'Privilege Leave(PL)')?.val
          );
          dataArr.push(
            this.parseResponse(info.leaves, null, 'Casual Leave(CL)')?.val
          );
          dataArr.push(
            this.parseResponse(info.leaves, null, 'Sick Leave(SL)')?.val
          );
          this.selectedResponse.cards[3].subData = dataArr;
          this.generateInfoText(this.selectedResponse.cards[3]);
          this.generateTooltipText(this.selectedResponse.cards[3]);
          this.isDataLoaded = true;
        },
        (err) => {
          this.generateInfoText(this.selectedResponse.cards[3]);
          this.isDataLoaded = true;
          this.debugService.log('Error fetching flying statistics data:', err);
        }
      );
  }

  parseResponse(dataObj, labelObj, label) {
    const labelIndex = dataObj?.unit.indexOf(label);
    const value = dataObj?.data[labelIndex];
    const tooltipLabel = labelObj?.data[labelIndex];
    return { val: value, tooltipTxt: tooltipLabel };
  }

  convertHrMin(time) {
    if (time !== undefined) {
      const hr = Math.floor(time);
      const min = Math.floor((time - hr) * 60);
      if (min > 0) {
        return `${hr}h ${min}m`;
      }
      return `${hr}h`;
    }
    return time;
  }

  generateTooltipText(data, numOfDays = 28) {
    if (data.infoTextTooltip.includes('end_date')) {
      const start = new Date();
      const end = new Date();
      const startDateDiff = numOfDays + 1;
      end.setDate(end.getDate() - 1);
      start.setDate(start.getDate() - startDateDiff);
      // const formattedStartDate = start.toLocaleDateString('EN-IN', {
      //   day: 'numeric',
      //   month: 'short',
      //   year: 'numeric',
      // });
      // const formattedEndDate = end.toLocaleDateString('EN-IN', {
      //   day: 'numeric',
      //   month: 'short',
      //   year: 'numeric',
      // });
      const formattedStartDate = this.datePipe.transform(
        start,
        this.crewDashboardInfoMessageTooltipDateFormat
      );
      const formattedEndDate = this.datePipe.transform(
        end,
        this.crewDashboardInfoMessageTooltipDateFormat
      );
      data.infoTextTooltip = data.infoTextTooltip.replace(
        'start_date',
        formattedStartDate
      );
      data.infoTextTooltip = data.infoTextTooltip.replace(
        'end_date',
        formattedEndDate
      );
    } else if (data.infoTextTooltip.includes('current_timestamp')) {
      // const curTime = new Date().toLocaleDateString('EN-IN', {
      //   day: '2-digit',
      //   month: 'short',
      //   year: 'numeric',
      //   hour: '2-digit',
      //   minute: '2-digit',
      // });
      const curTime = this.datePipe.transform(
        new Date(),
        this.crewDashboardInfoMessageTooltipDateFormat
      );

      data.infoTextTooltip = data.infoTextTooltip.replace(
        'current_timestamp',
        curTime
      );
    }
  }
}
