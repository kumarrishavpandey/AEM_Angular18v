import { Component, Input, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { LOGGEDIN_EMP } from 'src/app/app.api';
import { AnalyticsComponent } from 'src/app/shared/constants';
import { AdobeAnalyticsService } from 'src/app/shared/services/adobe-analytics.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { DebugService } from 'src/app/shared/services/debug.service';
import { StorageEncryptionService } from 'src/app/shared/services/storage-encryption.service';
import { getAemDamFullPath } from 'utils/utils';
import { HomeService } from '../home/home.service';
import { BaseManagerListPageSession } from './base-manager.constant';
import {
  BaseManagerTabData,
  LabelsBaseManagerAcmList,
} from './base-manager.interface';
import { BaseManagerService } from './base-manager.service';

@Component({
  selector: 'app-base-manager',
  templateUrl: './base-manager.component.html',
  styleUrls: ['./base-manager.component.scss'],
})
export class BaseManagerComponent implements OnInit {
  @Input() labelsBaseManagerAcmList: LabelsBaseManagerAcmList;

  tabList = [];

  baseManagerRequestsList = [];

  selectedTabData: BaseManagerTabData = {
    approvedCount: 0,
    pendingCount: 0,
    declinedCount: 0,
    totalCount: 0,
    empId: null,
    firstName: '',
    middleName: '',
    lastName: '',
  };

  selectedButton: string;

  employeeId = this.storageEncryptionService.getvalue(LOGGEDIN_EMP);

  searchKeyword: string = '';

  viewMoreData: boolean;

  offset: number = 0;

  limit: number = 3;

  noDataImagePath;

  searchSubject = new Subject<string>();

  totalDataCount: number = 0;

  searchTextToggle: boolean = false;

  tabLabel: string;

  selectedTabIndex: number = 0;

  isTabDataLoaded: boolean = false;

  isListDataLoaded: boolean = false;

  formHasFirstValue: boolean = false;

  isFocused: boolean = false;

  constructor(
    public commonService: CommonService,
    public baseManagerService: BaseManagerService,
    public storageEncryptionService: StorageEncryptionService,
    private homeService: HomeService,
    private analyticsService: AdobeAnalyticsService,
    private debugService: DebugService,
  ) {}

  ngOnInit(): void {
    this.commonService.getEmpDataStatus().subscribe((loaded) => {
      if (loaded) {
        this.commonService.fetchLoggedInEmployeeData().subscribe((user) => {
          this.homeService.getBaseManagerList().subscribe((res: any) => {
            if (res.data && res.data.length > 0) {
              const isBaseManager = res.data.some(
                (manager: any) => manager.employeeId === user?.employeeId,
              );
              this.getBaseManagerTabData(isBaseManager);
            }
          });
        });
      }
    });

    this.noDataImagePath = getAemDamFullPath(
      this.labelsBaseManagerAcmList.tabList.imgNoRequest,
    );
  }

  getBaseManagerTabData(isBaseManager: boolean) {
    this.baseManagerService
      .getBaseManagerRequestCountApi(isBaseManager)
      .subscribe(
        (res) => {
          this.isTabDataLoaded = true;
          if (res?.status?.code === 200 && res?.data) {
            // Suffle indexes
            const baseManagerIndex = res?.data.findIndex(
              (item) => `${item?.empId}` === this.employeeId,
            );

            // Shift base manager to index=0
            if (baseManagerIndex !== -1) {
              const objectToKeepAtZero = res?.data[baseManagerIndex];

              const restObject = res?.data.filter(
                (_, i) => i !== baseManagerIndex,
              );
              this.tabList = [objectToKeepAtZero, ...restObject];
            } else {
              this.tabList = res?.data;
            }

            this.tabLabel = this.getActualTabLabel(this.tabList[0]);

            this.analyticsService.pageLoadDatalayer({
              isErrorPage: false,
              siteSection: this.labelsBaseManagerAcmList.pageTitle,
              siteSubSection: this.tabLabel,
            });

            if (this.tabList?.length > 0) {
              if (
                this.storageEncryptionService.getvalue(
                  BaseManagerListPageSession,
                )
              ) {
                const selectedFilters = JSON.parse(
                  this.storageEncryptionService.getvalue(
                    BaseManagerListPageSession,
                  ),
                );

                this.selectedTabIndex = selectedFilters?.listingTabIndex;
                /* eslint-disable prefer-destructuring */
                this.selectedTabData = this.tabList[selectedFilters?.listingTabIndex];
                this.selectedButton = selectedFilters?.listingFilter
                  ? selectedFilters?.listingFilter
                  : this.labelsBaseManagerAcmList.tabList.btnPendingView;

                this.storageEncryptionService.deletevalue(
                  BaseManagerListPageSession,
                );
              } else {
                this.selectedButton = this.labelsBaseManagerAcmList.tabList.btnPendingView;

                /* eslint-disable prefer-destructuring */
                this.selectedTabData = this.tabList[0];
              }

              this.onSearchKeyUp(this.searchKeyword);
              this.searchSubject
                .pipe(debounceTime(500))
                .subscribe((searchValue: string) => {
                  this.onSearchKeyUp(searchValue);
                });
            }
          }
        },
        (error) => {
          this.isTabDataLoaded = true;
          this.debugService.log('Error fetching Data:', error);
        },
      );
  }

  onFilterChange(type: string) {
    this.offset = 0;
    this.selectedButton = type;
    this.analyticsService.clickEventDatalayer({
      isErrorPage: false,
      siteSection: this.labelsBaseManagerAcmList.pageTitle,
      siteSubSection: this.tabLabel,
      clickInfo: {
        clickName: type,
        clickComponentType: AnalyticsComponent.BUTTON,
        componentName: type,
        componentID: `${this.labelsBaseManagerAcmList.pageTitle}_${this.tabLabel}_${type}`,
      },
    });

    this.isListDataLoaded = false;
    this.getListingData(
      this.selectedButton,
      this.offset,
      this.limit,
      this.searchKeyword,
    );
  }

  getSelectedButtonLabel(): string {
    const tabList = this.labelsBaseManagerAcmList?.tabList;
    switch (this.selectedButton) {
      case tabList.btnPendingView:
        return tabList.btnPendingView.toLowerCase();
      case tabList.btnApprovedView:
        return tabList.btnApprovedView.toLowerCase();
      case tabList.btnDeclinedView:
        return tabList.btnDeclinedView.toLowerCase();
      default:
        return '';
    }
  }

  onTabChange(event: MatTabChangeEvent) {
    this.offset = 0;
    this.selectedTabData = this.tabList[event?.index];
    const currentTab = this.tabLabel;
    this.tabLabel = this.getActualTabLabel(this.tabList[event.index]);

    this.analyticsService.clickEventDatalayer({
      isErrorPage: false,
      siteSection: this.labelsBaseManagerAcmList.pageTitle,
      siteSubSection: currentTab,
      clickInfo: {
        clickName: this.tabLabel,
        clickComponentType: AnalyticsComponent.TAB,
        componentName: this.tabLabel,
        componentID: `${this.labelsBaseManagerAcmList.pageTitle}_${currentTab}_${this.tabLabel}`,
      },
    });

    this.isListDataLoaded = false;
    this.getListingData(
      this.selectedButton,
      this.offset,
      this.limit,
      this.searchKeyword,
    );
  }

  getListingData(
    status: string,
    offset: number,
    limit: number,
    searchKeyword?: string,
  ) {
    let selectedStatus = status;
    if (status === this.labelsBaseManagerAcmList?.tabList?.btnDeclinedView) {
      selectedStatus = 'Declined';
    }

    this.baseManagerService
      .getAcmBaseManagerRequestsListApi(
        this.selectedTabData?.empId,
        selectedStatus,
        offset,
        limit,
        searchKeyword,
      )
      .subscribe(
        (res) => {
          this.isListDataLoaded = true;
          if (res?.status?.code === 200 && res?.data?.acmList) {
            this.baseManagerRequestsList = offset === 0 ? [] : this.baseManagerRequestsList;

            /* eslint-disable no-unsafe-optional-chaining */
            this.baseManagerRequestsList = [
              ...this.baseManagerRequestsList,
              ...res.data?.acmList,
            ];

            this.viewMoreData = res.data.isViewMore;
            this.totalDataCount = res.data.totalCount;
            this.searchTextToggle = !!searchKeyword;
          }
        },
        (error) => {
          this.isListDataLoaded = true;
          this.debugService.log('Error fetching Listing Data:', error);
        },
      );
  }

  resetSearch() {
    if (this.searchKeyword.trim().length > 0) {
      this.offset = 0;
      this.searchKeyword = '';
      this.getListingData(
        this.selectedButton,
        this.offset,
        this.limit,
        this.searchKeyword,
      );
    }
  }

  onSearchKeyUp(value: string) {
    if (value.length > 2) {
      this.offset = 0;
      this.isListDataLoaded = false;
      this.getListingData(this.selectedButton, this.offset, this.limit, value);
      if (!this.formHasFirstValue) {
        this.adobeAnalyticsOnFirstFormStart(value);
        this.formHasFirstValue = true;
      }
    } else if (value.length < 1) {
      this.offset = 0;
      this.isListDataLoaded = false;
      this.getListingData(this.selectedButton, this.offset, this.limit);
    }
  }

  onEnterSearch(clickName: string) {
    if (
      this.searchKeyword.trim().length <= 2
      && this.searchKeyword.trim().length > 0
    ) {
      this.offset = 0;

      this.isListDataLoaded = false;
      this.getListingData(
        this.selectedButton,
        this.offset,
        this.limit,
        this.searchKeyword,
      );
    }
    this.adobeAnalyticsOnClickOfFormSubmit(clickName);
  }

  onClickViewMore() {
    if (this.viewMoreData) {
      this.offset += 1;
      this.getListingData(
        this.selectedButton,
        this.offset,
        this.limit,
        this.searchKeyword,
      );
    }
  }

  getTabLabel(tabData: any): string {
    if (this.isTabDataLoaded && tabData) {
      if (this.employeeId === tabData.empId.toString()) {
        return `${this.labelsBaseManagerAcmList.tabList.labelTab} (${tabData.totalCount})`;
      }

      const fullName = [tabData.firstName, tabData.middleName, tabData.lastName]
        .filter((name) => name)
        .join(' ');

      return `${fullName.trim()} (${tabData.totalCount})`;
    }
    return '';
  }

  getActualTabLabel(tabData: any): string {
    return this.getTabLabel(tabData).split('(')[0].trim();
  }

  onBlur() {
    this.isFocused = false;
  }

  onFocus() {
    this.isFocused = true;
  }

  adobeAnalyticsOnFirstFormStart(key: string) {
    const payloadData = {
      isErrorPage: false,
      siteSection: this.labelsBaseManagerAcmList.pageTitle,
      siteSubSection: this.tabLabel,
      form: {
        clickName: key,
        formName: this.tabLabel,
      },
    };
    this.analyticsService.formStartDatalayer(payloadData);
  }

  adobeAnalyticsOnClickOfFormSubmit(clickName) {
    this.analyticsService.formCompleteDatalayer({
      isErrorPage: false,
      siteSection: this.labelsBaseManagerAcmList.pageTitle,
      siteSubSection: this.tabLabel,
      form: {
        clickName,
        formName: this.tabLabel,
      },
    });
  }
}
