import {
  Component, Input, OnInit, ViewChild,
} from '@angular/core';

import { MatTabGroup } from '@angular/material/tabs';
import { forkJoin } from 'rxjs';
import { calendarToBeHide } from '../leave-constant';
import { DashboardService } from '../services/dashboard.service';
import { CommonService } from '../../shared/services/common.service';

@Component({
  selector: 'app-holiday-calendar',
  templateUrl: './holiday-calendar.component.html',
  styleUrls: ['./holiday-calendar.component.scss'],
})
export class HolidayCalendarComponent implements OnInit {
  @ViewChild('tabGroup') tabGroup: MatTabGroup;

  holidayCalendarTitle = 'Holiday Calendar';

  upcomingHolidayLeaves = [];

  selectedCalendarCode: string;

  selectedCalendarName: string;

  selectedElementName: string;

  selectedCountryName: string;

  picklist = [];

  holidayCalendarsList = [];

  regionData;

  subRegions;

  @Input() labelsHolidayModule: any;

  constructor(
    private dashboardService: DashboardService,
    private commonService: CommonService,
  ) {}

  ngOnInit(): void {
    this.commonService.getEmployeeTimeOff().then((timeOff) => {
      if (calendarToBeHide.includes(timeOff)) {
        this.selectedCalendarCode = 'Corporate_Office';
      } else {
        this.selectedCalendarCode = timeOff;
      }
      this.selectedElementName = this.selectedCalendarCode;

      this.getLeaveAndHolidayList();
      this.combineApiCalls();
    });
  }

  openTab() {
    this.tabGroup.selectedIndex = 1;
  }

  // Get leaves and holiday list
  getLeaveAndHolidayList() {
    this.dashboardService
      .getEmployeeDashboardLeaveList(this.selectedCalendarCode)
      .subscribe((val) => {
        this.upcomingHolidayLeaves = [];
        val?.data?.upcomingHolidayLeavesCalendarView?.forEach((element) => {
          this.upcomingHolidayLeaves.push(element);
        });
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
        const indexOfIndia = holidayCalendarsData?.data?.calenderData?.findIndex(
          (item) => item.countryCode === 'IND',
        );

        const filteredHolidayCalendarData = holidayCalendarsData?.data?.calenderData[
          indexOfIndia
        ]?.calendarList?.filter(
          (el) => !calendarToBeHide.includes(el?.calendarCode),
        );

        holidayCalendarsData.data.calenderData[indexOfIndia].calendarList = [];
        holidayCalendarsData.data.calenderData[indexOfIndia].calendarList = filteredHolidayCalendarData;

        this.holidayCalendarsList = holidayCalendarsData?.data?.calenderData;

        const picklistArray = pickListData[0].Picklist;
        const countryCodeLabelMap = picklistArray.reduce((acc, item) => {
          acc[item.externalCode] = {
            label: item.label,
          };
          return acc;
        }, {});

        this.holidayCalendarsList?.forEach((calendar) => {
          const labelInfo = countryCodeLabelMap[calendar?.countryCode];
          if (labelInfo) {
            calendar.label = labelInfo.label;
          }

          // Integration with the second piece of code when countryCode = IND
          if (calendar?.countryCode === 'IND') {
            if (
              calendar?.calendarList?.calendarCode !== 'KA_HC'
              && calendar?.calendarList?.calendarCode !== 'TLAP_HC'
              && calendar?.calendarList?.calendarCode !== 'TN_HC'
              && calendar?.calendarList?.calendarCode !== 'KL_HC'
            ) {
              // Add regions other than South directly into regionData array
              calendar?.calendarList?.forEach((element) => {
                if (
                  element?.calendarCode !== 'KA_HC'
                  && element?.calendarCode !== 'TLAP_HC'
                  && element?.calendarCode !== 'TN_HC'
                  && element?.calendarCode !== 'KL_HC'
                ) {
                  // Add regions other than South directly into regionData array
                  let regionName = '';
                  if (element?.calendarName === 'Eastern Holiday Calendar') {
                    regionName = 'East';
                  } else if (
                    element?.calendarName === 'Northern Holiday Calendar'
                  ) {
                    regionName = 'North';
                  } else if (
                    element?.calendarName === 'Western Holiday Calendar'
                  ) {
                    regionName = 'West';
                  } else if (
                    element?.calendarName === 'Flying Holiday Calendar'
                  ) {
                    regionName = 'Flying';
                  }
                  this.regionData.push({
                    calendarName:
                      regionName !== '' ? regionName : element?.calendarName,
                    calendarCode: element?.calendarCode,
                    subRegion: [],
                  });
                } else if (element?.calendarCode === 'KA_HC') {
                  calendar?.calendarList.forEach((subElement) => {
                    // Handle South region separately

                    if (
                      subElement?.calendarCode === 'KA_HC'
                      || subElement?.calendarCode === 'KL_HC'
                      || subElement?.calendarCode === 'TLAP_HC'
                      || subElement?.calendarCode === 'TN_HC'
                    ) {
                      let regionName = '';

                      // Determine subRegionName based on calendarName
                      if (
                        subElement?.calendarName
                        === 'Karnataka Holiday Calendar'
                      ) {
                        regionName = 'South - Bangalore';
                      } else if (
                        subElement?.calendarName === 'Kerala Holiday Calendar'
                      ) {
                        regionName = 'South - Kerala';
                      } else if (
                        subElement?.calendarName
                        === 'Telangana & AP  Holiday Calendar'
                      ) {
                        regionName = 'South - Hyderabad';
                      } else if (
                        subElement?.calendarName
                        === 'Tamil Nadu Holiday Calendar'
                      ) {
                        regionName = 'South - Chennai';
                      }

                      this.regionData.push({
                        calendarName:
                          regionName !== ''
                            ? regionName
                            : element?.calendarName,
                        calendarCode: subElement?.calendarCode,
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

  getLabelFromExternalCode(pickListId, externalCode) {
    return this.picklist
      .find((obj) => obj.picklistId === pickListId)
      ?.Picklist.find(
        (picklistobj) => picklistobj.externalCode === externalCode,
      )?.label;
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
}
