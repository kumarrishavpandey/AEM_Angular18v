import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { NavigationService } from './navigation.service';
import { getAemDamFullPath, isDeviceTypeMatch } from '../../../utils/utils';
import { CommonService } from '../shared/services/common.service';
import { EnumAvatarSize } from '../shared/components/cards/employee-card/employee-card.enum';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class NavigationComponent implements OnInit {
  selectedTab = 'recent-employees';

  navigationTabData: any[] = [];

  searchInput: string = '';

  allSubCategories: any[] = [];

  filteredOptions: string[] = [];

  searchControl = new FormControl(null);

  searchResultArray = [];

  isSearch: boolean = false;

  selectedLabel = '';

  ALL;
  UPDATED_NAVIGATION: object = {};

  selectedCategoryId = '';

  navigationData = [];

  employeeInfo: any;

  isLoading: boolean = true;

  isSearchLoading: boolean = true;

  getAemDamFullPath = getAemDamFullPath;

  isDeviceTypeMatch = isDeviceTypeMatch;

  avatarSize = EnumAvatarSize;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private commonService: CommonService,
    private dialogRef: MatDialogRef<NavigationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private navigationService: NavigationService
  ) {}

  onClose() {
    this.dialogRef.close(true);
    this.searchControl.reset();
  }

  ngOnInit() {
    this.employeeInfo = this.commonService.loggedInEmployeeData;

    if (this.data && this.data.searchKey) {
      this.searchControl.setValue(this.data.searchKey);
    }

    if (this.data && this.data.personalisedNavigation) {
      this.UPDATED_NAVIGATION = {
        ...this.data.personalisedNavigation.personalNavList,
        actionList:
          this.data.personalisedNavigation.personalNavList?.actionList.map(
            (app) => {
              if (app.appId === 'NA' && app.adGroup && app.adGroup.length > 0) {
                // Update appId with the first element of adGroup array
                return { ...app, appId: app.label.replaceAll(' ', '-') };
              }
              return app;
            }
          ),
      };

      this.isLoading = false;

      this.getAnalyzeApps(
        this.employeeInfo.employeeId,
        this.UPDATED_NAVIGATION
      );
    }
  }

  onNavigate(link: string, isExternal: boolean, appId, toolLabel: string) {
    this.adobeAnalyticsOnButtonClick(toolLabel, this.selectedLabel, link);
    if (isExternal) {
      // Open link in a new browser tab
      window.open(link, '_blank');
    } else {
      // Navigate internally using Angular Router
      const queryParams = this.commonService.extractQueryParams(link);
      const route = queryParams ? [link.split('?')[0]] : [link];
      this.router.navigate(route, { queryParams });
      this.dialogRef.close(true);
    }
    const counterObj = {
      employeeId: this.employeeInfo.employeeId,
      azureADAppID: appId,
      favourite: false,
    };
    this.navigationService.updateAppCounter(counterObj).subscribe(
      (data) => {
        if (data.status.code === 200) {
          this.getAnalyzeApps(
            this.employeeInfo.employeeId,
            this.UPDATED_NAVIGATION,
            false
          );
        }
      },
      () => {}
    );
  }

  _filter(value: string) {
    if (value) {
      return this.collectActionList(this.navigationData)
        ?.filter((category) =>
          category?.label
            ?.toLowerCase()
            .trim()
            .includes(value.toLowerCase().trim())
        )
        .sort((a, b) => a.label.localeCompare(b.label));
    }
    return this.collectActionList(this.navigationData);
  }

  onEnter(): void {
    this.isSearchLoading = true;
    if (this.searchControl.value) {
      this.selectedTab = '';
      this.isSearch = true;
      this.searchResultArray = this.collectActionList(
        this.navigationData
      )?.filter((category) =>
        category?.label
          ?.toLowerCase()
          .includes(this.searchControl?.value?.toLowerCase())
      );
      this.isSearchLoading = false;
      this.adobeAnalyticsOnClickOfFormSubmit(this.searchControl.value);
    } else {
      this.resetSearch();
    }
    this.toggleAutocompleteVisibility(false);
    this.cdr.detectChanges();
  }

  collectActionList(nav) {
    const allActions = [];
    const tempObj = {};
    if (nav) {
      for (const category of nav) {
        for (const action of category?.actionList ?? []) {
          const key = action?.label.trim(); // Assuming label is unique
          if (!tempObj[key]) {
            allActions.push(action);
            tempObj[key] = true;
          }
        }
      }
    }

    const newActionList = allActions.filter((item) =>
      isDeviceTypeMatch(item.deviceType)
    );
    return newActionList;
  }

  getActionList(
    categoryId: string,
    label: string,
    isFirstLoad?: boolean,
    shouldResetSearch: boolean = true
  ) {
    if (!isFirstLoad) {
      this.adobeAnalyticsOnButtonClick(
        label,
        this.data.navigationData.navigationMenuTitle
      );
    }

    if (shouldResetSearch) {
      this.isSearchLoading = true;
      this.isSearch = false;
      this.searchControl.reset();
      this.selectedCategoryId = categoryId;
      this.selectedTab = label;
      this.selectedLabel = label;
      this.navigationTabData = this.navigationData
        ?.find((category) => category.categoryId === categoryId)
        ?.actionList?.filter((item) => isDeviceTypeMatch(item.deviceType));
      this.isSearchLoading = false;
    }
  }

  resetSearch() {
    this.searchControl.reset();
    this.isSearch = false;
    this.isSearchLoading = false;
    this.getActionList(this.selectedCategoryId, this.selectedLabel);
  }

  getAppList(actionList, analyzeAppList) {
    return actionList
      ?.filter((action: any) => analyzeAppList.includes(action.appId))

      .map((action: any) => ({
        ...action,
        timeStamp: '', // Add timestamp here
      }))
      .sort(
        (a: any, b: any) =>
          analyzeAppList.indexOf(a.appId) - analyzeAppList.indexOf(b.appId)
      );
  }

  getAnalyzeApps(employeeId, navData, shouldResetSearch: boolean = true) {
    this.navigationService
      .getAnalyzeAppData(employeeId)
      ?.pipe(
        map((data) => {
          const updatedNavigationData = navData;
          const { actionList } = navData;
          const recentUsedApps =
            data?.data?.recentUsedApps?.length > 0
              ? {
                  ...this.data?.navigationData?.navCategories?.find(
                    (category) => category?.categoryId?.startsWith('recent')
                  ),
                  actionList: this.getAppList(
                    actionList,
                    data?.data?.recentUsedApps
                  ),
                }
              : {
                  ...this.data?.navigationData?.navCategories.find((category) =>
                    category?.categoryId?.startsWith('recent')
                  ),
                  actionList: [],
                };

          const mostUsedApps =
            data?.data?.mostUsedApps?.length > 0
              ? {
                  ...this.data?.navigationData?.navCategories?.find(
                    (category) => !category?.categoryId?.startsWith('recent')
                  ),
                  actionList: this.getAppList(
                    actionList,
                    data?.data?.mostUsedApps
                  ),
                }
              : {
                  ...this.data?.navigationData?.navCategories?.find(
                    (category) => !category?.categoryId?.startsWith('recent')
                  ),
                  actionList: [],
                };

          // Assuming your data is in a variable named `data`
          return [recentUsedApps, mostUsedApps, updatedNavigationData];
        })
      )
      .subscribe((data) => {
        this.isLoading = false;
        this.navigationData = data;
        this.filteredOptions = this._filter(this.searchControl.value);

        const index =
          data[0]?.actionList?.filter((item) =>
            isDeviceTypeMatch(item.deviceType)
          ).length > 0
            ? 0
            : 2;
        this.selectedCategoryId =
          this.selectedCategoryId || data[index].categoryId;
        this.selectedLabel = this.selectedLabel || data[index].label;

        /* On default reset load */
        this.getActionList(
          this.selectedCategoryId,
          this.selectedLabel,
          true,
          shouldResetSearch
        );
      });
  }

  getImageDescriptionIcon() {
    const endPoint = '/content/dam/my-ai/icon/search-folder.svg';
    const fullUrl = getAemDamFullPath(endPoint);
    return fullUrl;
  }

  onSelectionChange(event) {
    if (event.option.value) {
      this.selectedTab = '';
      this.isSearch = true;
      this.searchResultArray = this.collectActionList(
        this.navigationData
      )?.filter((category) =>
        category?.label
          ?.toLowerCase()
          .includes(event?.option?.value.toLowerCase())
      );
    } else {
      this.isSearch = false;
    }
  }

  hasFormStarted = false;

  onSearchKeyUp(e: any) {
    const { value } = e.currentTarget;
    this.cdr.detectChanges();
    this.filteredOptions = this._filter(value);
    if (value !== '' && !this.hasFormStarted) {
      this.adobeAnalyticsOnFirstFormStart(value); // Call Adobe Analytics form start
      this.hasFormStarted = true;
    }
    if (value === '') {
      this.isSearch = false;
      this.selectedTab = this.selectedLabel;
    }
  }

  toggleAutocompleteVisibility(visible: boolean): void {
    const autocompletePanel = document.querySelector('.mat-autocomplete-panel');
    if (autocompletePanel) {
      if (visible) {
        autocompletePanel.classList.remove('mat-autocomplete-hide-panel');
        autocompletePanel.classList.add('mat-autocomplete-visible');
      } else {
        autocompletePanel.classList.add('mat-autocomplete-hide-panel');
        autocompletePanel.classList.remove('mat-autocomplete-visible');
      }
    }
  }

  onBackspace(): void {
    this.toggleAutocompleteVisibility(true); // Show autocomplete panel on Backspace
  }

  isPanelExpanded(panelId: string): boolean {
    const panel = document.getElementById(panelId);
    return panel?.classList.contains('mat-expanded') ?? false;
  }

  getLogoPath(url) {
    return getAemDamFullPath(url);
  }

  getMobileNavigationData(navData) {
    return navData?.filter(
      (app) =>
        app?.actionList?.filter((item) => isDeviceTypeMatch(item.deviceType))
          .length > 0
    );
  }

  getNavigationData(selectedLabel, navData) {
    this.isSearchLoading = true;
    if (selectedLabel !== 'All Apps') {
      this.isSearchLoading = false;
      return navData.slice(0, 12);
    }
    this.isSearchLoading = false;
    return navData;
  }

  getFilteredMobileNavActionList(selectedLabel, navData) {
    const selectedNav = navData.find((navOb) => navOb.label === selectedLabel);

    if (selectedLabel !== 'All Apps' && selectedNav) {
      return selectedNav.actionList.slice(0, 12);
    }

    return selectedNav ? selectedNav.actionList : [];
  }

  adobeAnalyticsOnFirstFormStart(Name: string) {
    const payloadData = {
      isErrorPage: false,
      siteSection: 'Navbar',
      siteSubSection: 'Apps',
      form: {
        clickName: Name,
        formName: 'SearchBar',
      },
    };

    // this.analyticsService.formStartDatalayer(payloadData);
  }

  adobeAnalyticsOnClickOfFormSubmit(clickName) {}

  adobeAnalyticsOnButtonClick(
    clickName: string,
    siteSubSection: string,
    linkURL?: string
  ) {}
}
