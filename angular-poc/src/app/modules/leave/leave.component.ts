import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { Router } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { adobeAnalyticsLeaveConstant } from './leave-constant';
import { NewRequestComponent } from './new-request/new-request.component';
import { RequestedLeaveComponent } from './requested-leave/requested-leave.component';
import { labelsLeaveModule } from './constant';
import { DebugService } from '../shared/services/debug.service';
import { AdobeAnalyticsService } from '../shared/services/adobe-analytics.service';
import { CommonService } from '../shared/services/common.service';
import { DashboardService } from './services/dashboard.service';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss'],
})
export class LeaveComponent implements AfterViewInit, OnInit {
  leaveTitle = 'Leave Request';

  /* Default tab when we load the leave page */
  activeTab: string = 'Dashboard';

  @ViewChild('tabGroup') tabGroup: MatTabGroup;

  @ViewChild(NewRequestComponent) newLeaveRequestComponent: NewRequestComponent;

  @ViewChild(RequestedLeaveComponent)
  requestedLeaveComponent: RequestedLeaveComponent;

  @ViewChild(DashboardComponent) dashboard: DashboardComponent;

  userPersona;

  labelsLeaveModule = labelsLeaveModule;

  shouldAddTrackEvent: boolean = true;

  constructor(
    private commonService: CommonService,
    private router: Router,
    private analyticsService: AdobeAnalyticsService,
    private debugService: DebugService,
    private dashboardService: DashboardService
  ) {
    this.loadLoggedIndata();
  }

  openTab() {
    this.tabGroup.selectedIndex = 1;
    this.shouldAddTrackEvent = false;
  }

  openRequestLeaveTab() {
    this.tabGroup.selectedIndex = 2;
    this.shouldAddTrackEvent = false;
  }

  ngOnInit(): void {
   
    // this.dashboardService.getAEMKeys().subscribe((data) => {
      // this.labelsLeaveModule = data.labelsLeaveModule;

      this.analyticsService.setAnalyticsInfo(
        this.labelsLeaveModule.analyticsInfo
      );

      this.analyticsService.pageLoadDatalayer(
        adobeAnalyticsLeaveConstant.leaveDashboard.onLeaveDashboardLoad
      );
    // });
  }

  async loadLoggedIndata() {
    await this.commonService.fetchEmpDataV2('myai.test21@airindia.com');
  }

  onTabChangeInLeave(ele) {
    /* Reset form from child component */
    if (ele.tab.textLabel === 'Dashboard') {
      this.dashboard.getLeaveAndHolidayList();
      this.dashboard.getLeaveBalance();

      /* Adobe analytics when clicked on Dashboard */
      this.adobeAnalyticsOnButtonClick('Dashboard');
    }

    if (this.newLeaveRequestComponent && ele.tab.textLabel === 'New Request') {
      this.newLeaveRequestComponent.resetLeaveApplicationForm();
      this.newLeaveRequestComponent.filterLeaveInSelectOptions();

      /* Adobe analytics when clicked on New Request */
      this.adobeAnalyticsOnButtonClick('New Request');
    }
    if (
      this.requestedLeaveComponent &&
      ele.tab.textLabel === 'Requested Leave'
    ) {
      this.requestedLeaveComponent.getRequestLeaveData();

      /* Adobe analytics when clicked on Requested Leave */
      this.adobeAnalyticsOnButtonClick('Requested Leave');
    }
  }

  ngAfterViewInit(): void {
    // this.route.queryParams.subscribe((params) => {
    //   if (params.tab) {
    //     const tabIndex = parseInt(params.tab, 10);
    //     if (
    //       !Number.isNaN(tabIndex) &&
    //       tabIndex >= 0 &&
    //       tabIndex < this.tabGroup._tabs.length
    //     ) {
    //       this.tabGroup.selectedIndex = tabIndex;
    //     }
    //   }
    // });
  }

  adobeAnalyticsOnButtonClick(clickName: string) {
    if (!this.shouldAddTrackEvent) {
      this.shouldAddTrackEvent = true;
      return;
    }

    /* Adobe analytics when clicked */
    this.analyticsService.clickEventDatalayer({
      isErrorPage: false,
      siteSection: 'Leave Request',
      siteSubSection: this.activeTab,
      clickInfo: {
        clickName,
        clickComponentType: 'Button',
        componentName: this.activeTab,
        componentID: `Leave_${this.activeTab}`,
      },
    });
  }
}
