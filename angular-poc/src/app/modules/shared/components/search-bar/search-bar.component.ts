/* eslint-disable no-underscore-dangle */
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {  Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
// import { EnumAvatarSize, EnumAvatarTheme } from 'src/app/shared/components/cards/employee-card/employee-card.enum';
// import { HeaderSize } from 'src/app/shared/constants';
// import { AdobeAnalyticsService } from 'src/app/shared/services/adobe-analytics.service';
// import {
//   checkDevice, getAemDamFullPath, getInitials, isDeviceTypeMatch,
// } from 'utils/utils';
import { CommonService } from '../../services/common.service';
import { SearchService } from '../../services/search.service';
import { searchBarData } from './search-bar.constant';
import { checkDevice, getAemDamFullPath, getInitials, isDeviceTypeMatch } from '../../../../../utils/utils';
import { EnumAvatarSize, EnumAvatarTheme } from '../cards/employee-card/employee-card.enum';
import { HeaderSize } from '../../constants';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class SearchBarComponent implements OnInit, AfterViewInit {
  @ViewChild('globalSearchInput') private _inputElement: ElementRef;

  checkDevice = checkDevice();

  getInitials = getInitials;

  searchResults = {};

  searchSubject = new Subject<string>();

  // Filter json
  employeeSearch: any = [];

  actionSearch: any = [];

  policySearch: any = [];

  benefitsSearch: any = [];

  // Search value
  searchValue = '';

  // Constant
  constantData = searchBarData;

  public pageNumber: number = 0;

  public pageSize: number = 3;

  @Input() searchBarLabels: any;

  @Input() searchApiConfig: any;

  @Input() checkSearchIcon: boolean;

  @Output() clickEvent = new EventEmitter<any>();

  loggedInCountryCode: string;

  searchResultPath: string;

  checkIsEmpFromInd: boolean;

  getAemDamFullPath = getAemDamFullPath;

  formStartEventTriggred: boolean = false;

  isDataLoaded: boolean = false;

  avatarTheme = EnumAvatarTheme;

  avatarSize = EnumAvatarSize;

  headerSize = HeaderSize;

  isFocused: boolean = false;

  searchBarReadonly : boolean = false;

  constructor(
    private searchService: SearchService,
    private commonService: CommonService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.getCountryCode();
    this.searchBarReadonly = this.commonService.checkIfVistaraLocale();
    this.checkIsEmpFromInd = this.commonService.isLoggedInEmpFromIndia();
    // this.route.queryParams.subscribe((res) => {
    //   if (this.checkSearchIcon) {
    //     this.searchValue = '';
    //   }

    //   if (res['searchTerm'] && !this.checkSearchIcon) {
    //     this.searchValue = res['searchTerm'];
    //     this.clickEvent.emit({ selectedType: 'open' });
    //   }
    // });

    this.isDataLoaded = true;

    /* Logic for making search more optimised */
    this.searchSubject
      .pipe(debounceTime(500))
      .subscribe((searchValue: string) => {
        // Perform your search or other actions here
        this.onSearchKeyUp(searchValue);
      });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.checkDevice === 'Mobile'){
        this._inputElement.nativeElement.focus();
      }
    }, 100);
  }

  async getCountryCode() {
    const countryCode = await this.commonService.getA2CountryCodeAsync();
    this.searchResultPath = `/content/my-ai/${countryCode}/en/search-results.html`;
  }

  /**
   * Attempt to enter the search bar
   * @param e Selected event
   */
  onSearchChange(e: any) {
    const { value } = e.currentTarget;
    if (value.length > 2) {
      this.navigateToSearchResult(value);
      this.clickEvent.emit({ selectedType: 'open' });
    }
  }

  onPaste(event) {
    const disallowedCharacters = ['>', '<', '/', '%'];
    const pastedText = event.clipboardData.getData('text');
    for (const char of pastedText) {
      if (disallowedCharacters.includes(char)) {
        return false;
      }
    }
    return true;
  }

  removeSpecialCharacters(e: any) {
    const disallowedCharacters = ['>', '<', '/', '%'];

    if (disallowedCharacters.includes(e.key)) {
      e.preventDefault();
    }
  }

  /**
   * Key up on searchbar
   * @param e Selected event
   */
  onSearchKeyUp(value: string) {
    if (value.length > 2) {
      this.adobeAnalyticsOnFirstFormStart(value);
      // 1st api
      this.searchService
        .getSearchEmpData(value, this.pageNumber, this.pageSize)
        .subscribe((res) => {
          this.employeeSearch = [];
          if (res?.data && res?.status?.code === 200) {
            res?.data?.SearchDetails?.map((data) => this.employeeSearch.push(data));
          }
        });

      // AEM api call for actions, policy and benefits
      this.commonService.fetchLoggedInEmployeeData().subscribe((user) => {
        this.commonService.getIsBaseManager().subscribe((isBaseManager) => {
          this.getAEMsearchData(value, user.role, user.jobTitle, isBaseManager);
        });
      });
    } else {
      this.actionSearch = [];
      this.employeeSearch = [];
      this.policySearch = [];
      this.benefitsSearch = [];
    }
  }

  getAEMsearchData(value, userPersona, userRole, isBaseManager) {
    const searchValueWithoutSpaces = value?.replace(/\s/g, ',');
    const personaWithoutSpaces = userPersona?.replace(/\s/g, '-');
    const userJobTitle = userRole?.replace(/\s/g, '-');

    this.commonService
      .getSearchData(
        searchValueWithoutSpaces,
        this.searchApiConfig,
        personaWithoutSpaces,
        userJobTitle,
        isBaseManager,
      )
      .subscribe((res: { data }) => {
        // Action
        this.actionSearch = [];
        this.actionSearch = res?.data?.actionToolList?.items;
        this.actionSearch = this.actionSearch.filter((item) => isDeviceTypeMatch(item.deviceType));
        if (this.actionSearch?.length > 3) {
          this.actionSearch = this.actionSearch.slice(0, 3);
        }

        // Policy
        this.policySearch = [];
        this.policySearch = res?.data?.aiPolicyCfModelList?.items;
        if (this.policySearch?.length > 3) {
          this.policySearch = this.policySearch.slice(0, 3);
        }

        // Benefits
        this.benefitsSearch = [];
        this.benefitsSearch = res?.data?.benefitsCfModelList?.items;
        if (this.benefitsSearch?.length > 3) {
          this.benefitsSearch = this.benefitsSearch.slice(0, 3);
        }
      });
  }

  // On Clear
  clearSearchValue() {
    this.searchValue = '';
    this.actionSearch = [];
    this.employeeSearch = [];
    this.policySearch = [];
    this.benefitsSearch = [];
    this.clickEvent.emit({ selectedType: 'close' });
  }

  /**
   * Attempt to redirect to search result
   * @param searchTerm Search value
   * @param id selected id
   */
  onClickRedirection(searchTerm: string, id: string) {
    if (searchTerm) {
      this.router.navigate([this.searchResultPath], {
        queryParams: {
          searchTerm,
          employeeid: id,
          benefitsPath: this.searchApiConfig.benefits,
          personalizedNavPath: this.searchApiConfig.personalizedNav,
          policyPath: this.searchApiConfig.policy,
          quickActionPath: this.searchApiConfig.quickAction,
        },
      });
    }
  }

  /**
   * Attempt to redirect
   * @param searchTerm Search Value
   * @param type Selected type
   * @param selectedData Selected data
   */
  onClickDocumentRedirection(
    searchTerm: string,
    type: string,
    selectedData?: any,
  ) {
    if (searchTerm) {
      switch (type) {
        case this.constantData?.label?.actionLabel:
          this.navigateToSearchResult(searchTerm);

          break;
        case this.constantData?.label?.policyLabel:
          this.router.navigate([`${selectedData?.link}`], {
            queryParams: { policyid: selectedData?.cardId },
          });
          break;
        case this.constantData?.label?.benefitsLabel:
          this.router.navigate([`${selectedData?.link}`], {
            queryParams: { benefitid: selectedData?.cardId },
          });
          break;
        case this.constantData?.label?.allLabel:
          this.navigateToSearchResult(searchTerm);
          break;
        default:
          break;
      }
    }
  }

  searchClicked(type: string) {
    if (type === 'close') {
      this.clearSearchValue();
    } else if (type === 'open') {
      this.isFocused = true;
      this.clickEvent.emit({ selectedType: type });
    }
  }

  onBlur(searchTerm) {
    this.isFocused = false;
    if (searchTerm === ''){
      this.clickEvent.emit({ selectedType: 'close' });
    }
  }

  navigateToSearchResult(value: string) {
    this.adobeAnalyticsOnClickOfFormSubmit(value);

    this.router.navigate([this.searchResultPath], {
      queryParams: {
        searchTerm: value,
        benefitsPath: this.searchApiConfig.benefits,
        personalizedNavPath: this.searchApiConfig.personalizedNav,
        policyPath: this.searchApiConfig.policy,
        quickActionPath: this.searchApiConfig.quickAction,
      },
    });
  }

  adobeAnalyticsOnFirstFormStart(Name: string) {
    if (this.formStartEventTriggred) {
      return;
    }

    const payloadData = {
      isErrorPage: false,
      siteSection: 'Home page',
      siteSubSection: 'Navbar',
      form: {
        clickName: Name,
        formName: 'Navigation SearchBar',
      },
    };

    // this.analyticsService.formStartDatalayer(payloadData);

    this.formStartEventTriggred = true;
  }

  adobeAnalyticsOnClickOfFormSubmit(clickName) {
  //   this.analyticsService.formCompleteDatalayer({
  //     isErrorPage: false,
  //     siteSection: 'Home page',
  //     siteSubSection: 'Navbar',
  //     form: {
  //       clickName,
  //       formName: 'Navigation SearchBar',
  //     },
  //   });
  }
}
