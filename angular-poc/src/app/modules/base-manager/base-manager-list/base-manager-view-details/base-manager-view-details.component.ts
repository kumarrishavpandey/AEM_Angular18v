import {
  Component, Input, OnInit, ViewChild,
} from '@angular/core';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AnalyticsComponent } from 'src/app/shared/constants';
import { AdobeAnalyticsService } from 'src/app/shared/services/adobe-analytics.service';
import { DebugService } from 'src/app/shared/services/debug.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { StorageEncryptionService } from 'src/app/shared/services/storage-encryption.service';
import {
  BaseManagerDetailsPageSession,
  BaseManagerDetailsURL,
  BaseManagerListURL,
  JOURNEY_TYPES,
} from '../../base-manager.constant';
import {
  LabelsBaseManagerACMApproval,
  RequestData,
} from '../../base-manager.interface';
import { BaseManagerService } from '../../base-manager.service';

@Component({
  selector: 'app-base-manager-view-details',
  templateUrl: './base-manager-view-details.component.html',
  styleUrls: ['./base-manager-view-details.component.scss'],
})
export class BaseManagerViewDetailsComponent implements OnInit {
  title: string = '';

  managerData: RequestData;

  historyData: any = [];

  viewMoreData: boolean;

  reqNo: any;

  selectedBtn: string;

  selectedReq: string;

  selectedType: string;

  @Input() labelsBaseManagerACMapproval: LabelsBaseManagerACMApproval;

  hideDetails: boolean = false;

  @ViewChild('tabGroup') tabGroup: MatTabGroup;

  selectedTabIndex: number = 0;

  isHistory: boolean = true;

  isDetailsDataLoaded = false;

  isHistoryDataLoaded: boolean = false;

  isHistoryDetailsDataLoaded = false;

  tabLabel: string;

  activeTab : string;

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private baseManagerService: BaseManagerService,
    private analyticsService: AdobeAnalyticsService,
    private storageEncryptionService: StorageEncryptionService,
    private notificationService: NotificationService,
    private debugService: DebugService,

  ) {}

  ngOnInit(): void {
    this.activeTab = this.labelsBaseManagerACMapproval.tabCurrentRequests.labelTab;

    this.activatedRoute.queryParams.subscribe((query: Params) => {
      if (query) {
        this.reqNo = query.reqNo;
        this.selectedBtn = query.filter;

        if (query.selectedReq) {
          this.hideDetails = true;
          this.selectedReq = query.selectedReq;
        } else {
          this.hideDetails = false;
          if (
            this.storageEncryptionService.getvalue(
              BaseManagerDetailsPageSession,
            )
          ) {
            this.selectedType = JSON.parse(
              this.storageEncryptionService.getvalue(
                BaseManagerDetailsPageSession,
              ),
            )?.detailsType;
            this.selectedTabIndex = 1;
            this.activeTab = this.labelsBaseManagerACMapproval.tabHistory.labelTab;
          }

          this.analyticsService.pageLoadDatalayer({
            isErrorPage: false,
            siteSection: this.labelsBaseManagerACMapproval.tabCurrentRequests.labelHeading,
            siteSubSection: this.activeTab,
          });

          this.title = this.labelsBaseManagerACMapproval.tabCurrentRequests.labelHeading;
          this.getManagerDetails(this.reqNo);
        }
      }
    });

    /* eslint-disable no-restricted-globals */
    scrollTo(0, 0); // This helps to scroll page to top
  }

  getManagerDetails(reqNo: string) {
    this.baseManagerService.getBaseManagerData(reqNo).subscribe(
      (res) => {
        this.isDetailsDataLoaded = true;
        if (res?.status?.code === 200 && res?.data) {
          this.managerData = res?.data;

          if (!this.hideDetails) {
            this.getHistoryData(
              this.selectedType ? this.selectedType : JOURNEY_TYPES.DOMESTIC,
              this.managerData?.empId,
              0,
              1,
            );
          }
        }
      },
      (error) => {
        this.isDetailsDataLoaded = true;
        this.debugService.log('Error fetching Data:', error);
        if (!error.error.data) {
          this.notificationService.showError(error?.error.status?.errors);
          this.goBack();
        }
      },
    );
  }

  getHistoryData(type: string, empId: string, offset: number, limit: number) {
    this.baseManagerService
      .getAcmHistoryList(empId, type, offset, limit)
      .subscribe(
        (res) => {
          if (res?.status?.code === 200 && res?.data?.acmList) {
            this.isHistoryDataLoaded = true;
            /* eslint-disable no-unsafe-optional-chaining */
            this.historyData = offset === 0 ? [] : this.historyData;

            this.historyData = [...this.historyData, ...res.data?.acmList];

            // set view more indicator
            this.viewMoreData = res?.data?.isViewMore;
          }
        },
        (error) => {
          this.isHistoryDataLoaded = true;
          this.debugService.log('Error fetching URL:', error);
        },
      );
  }

  onTabChange(event: MatTabChangeEvent) {
    this.selectedTabIndex = event.index;

    const currentTab = this.activeTab;

    this.activeTab = event.tab.textLabel;

    this.analyticsService.clickEventDatalayer({
      isErrorPage: false,
      siteSection: this.labelsBaseManagerACMapproval.tabCurrentRequests.labelHeading,
      siteSubSection: currentTab,
      clickInfo: {
        clickName: this.activeTab,
        clickComponentType: AnalyticsComponent.TAB,
        componentName: currentTab,
      },
    });
  }

  onCountryTypeChange(event: {
    selectedType: string;
    offset: number;
    limit: number;
  }) {
    this.isHistoryDataLoaded = false;
    this.getHistoryData(
      event?.selectedType,
      this.managerData?.empId,
      event?.offset,
      event?.limit,
    );
  }

  goBack() {
    this.analyticsService.clickEventDatalayer({
      isErrorPage: false,
      siteSection: this.labelsBaseManagerACMapproval.tabCurrentRequests.labelHeading,
      siteSubSection: this.activeTab,
      clickInfo: {
        clickName: this.labelsBaseManagerACMapproval.labelBtnBack,
        clickComponentType: AnalyticsComponent.BUTTON,
        componentName: this.activeTab,
      },
    });

    if (this.selectedReq) {
      this.router.navigate([BaseManagerDetailsURL], {
        queryParams: {
          reqNo: this.reqNo,
        },

      });
    } else {
      this.router.navigate([BaseManagerListURL]);
    }
  }

  getRequestData(event: string) {
    this.title = `${
      this.labelsBaseManagerACMapproval.tabCurrentRequests.labelCaptain
    } ${event || ''}`;
  }

  refreshOnRejection(data: boolean) {
    if (data) {
      this.getManagerDetails(this.reqNo);
    }
  }

  getSkeletonData(event: boolean) {
    this.isHistoryDetailsDataLoaded = event;
  }
}
