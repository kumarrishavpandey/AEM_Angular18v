import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
// import { NgDialogAnimationService } from 'ng-dialog-animation';
// import { HeaderService } from 'src/app/modules/header/header.service';
// import { NavigationComponent } from 'src/app/modules/navigation/navigation.component';
// import { NavigationService } from 'src/app/modules/navigation/navigation.service';
// import { EnumAvatarSize } from 'src/app/shared/components/cards/employee-card/employee-card.enum';
// import { AdobeAnalyticsService } from 'src/app/shared/services/adobe-analytics.service';
// import { AuthService } from 'src/app/shared/services/auth.service';
// import { CommonService } from 'src/app/shared/services/common.service';
// import { StorageEncryptionService } from 'src/app/shared/services/storage-encryption.service';
import {
  checkDevice,
  getAemDamFullPath,
  getInitials,
  replaceSpaceWithHyphen,
} from '../../../utils/utils';
// import { AdobeAnalyticsServiceMock } from '../shared/services/__mock__/adobe-analytics.service.mock';
import { AuthService } from '../shared/services/auth.service';
import { CommonService } from '../shared/services/common.service';
import { NavigationService } from '../navigation/navigation.service';
import { StorageEncryptionService } from '../shared/services/storage-encryption.service';
import { HeaderService } from './header.service';
import { EnumAvatarSize } from '../shared/components/cards/employee-card/employee-card.enum';
import {
  BaseManagerDetailsPageSession,
  BaseManagerListPageSession,
} from '../base-manager/base-manager.constant';
import { headerDeatilsSling } from './header.sling';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class HeaderComponent implements OnInit, OnDestroy {
  userDetail: any = {};

  isSearchVisible: boolean = false;

  getInitials = getInitials;

  isSearchbar: boolean = true;

  isSearchIcon: boolean = true;

  isOpen = false;

  empId;

  hideDetails = false;

  dialogRef: any;

  headerDetails = headerDeatilsSling;

  searchBarLabels: any;

  loggedInCountryCode: string;

  profileNavigationPath: any;

  selectedType: string;

  searchApiPayloadConfig: object;

  isDataloaded: boolean = false;

  avatarSize = EnumAvatarSize;

  personalisedNavigation = null;

  toDoCount: number;

  shouldHideHeader: boolean = false;

  shouldHideProfileMenu: boolean = false;

  getAemDamFullPath = getAemDamFullPath;

  constructor(
    // private analyticsService: AdobeAnalyticsServiceMock,
    private authService: AuthService,
    public commonService: CommonService,
    public dialog: NgDialogAnimationService,
    private navigationService: NavigationService,
    private router: Router,
    private storageEncryptionService: StorageEncryptionService,
    private headerService: HeaderService
  ) {
    this.shouldHideHeader = false;
    this.shouldHideProfileMenu = this.commonService.checkIfVistaraLocale();
  }

  ngOnInit(): void {
    this.navigationService.personalisedNavigation.subscribe((data) => {
      this.personalisedNavigation = data;
    });
     this.commonService.getEmployeeRole().then(async (userPersona: string) => {
        const personaWithoutSpaces = replaceSpaceWithHyphen(userPersona);

        const { personalizedNav, quickAction } =
          this.headerDetails.navigationData;

        this.navigationService.setPersonalisedNavigation(
          personalizedNav,
          quickAction + personaWithoutSpaces
        );
    //   

      this.searchApiPayloadConfig = {
        benefits: this.headerDetails?.navigationData?.benefits,
        personalizedNav: this.headerDetails?.navigationData?.personalizedNav,
        policy: this.headerDetails?.navigationData?.policy,
        quickAction: this.headerDetails?.navigationData?.quickAction,
      };
      this.commonService.setDateFormat(this.headerDetails?.dateFormat);
      this.getCountryCode();
      this.searchBarLabels = {
        ...this.headerDetails?.commonData,
        ...this.headerDetails?.searchData,
      };
    // });

    if (this.shouldShowTodo()) {
      this.headerService.getToDoCount().subscribe((count) => {
        this.toDoCount = count;
      });

      // this.headerService.fetchToDoCount();
    }

    // this.route.queryParams.subscribe((res) => {
    //   if (res['searchTerm'] && this.isMobileView()) {
    //     this.selectedType = 'open';
    //   }
    // });

    this.isDataloaded = true;

    this.commonService.getEmpDataStatus().subscribe((loaded: boolean) => {
      if (loaded) {
        this.empId = this.storageEncryptionService.getEmpId();

        // Fetch the logged-in employee data and then set the userDetail
        this.commonService.fetchLoggedInEmployeeData().subscribe((user) => {
          this.userDetail = user;
        });
      }
    });

    // Add event listener for window resize
    window.addEventListener('resize', this.onWindowResize.bind(this));
    // Initialize initial state based on window width
    this.updateViewState();

    this.updateStorage();
      });

     
}

  updateStorage() {
    const path = window.location.pathname;

    // update base manager list page storage
    if (
      !path.includes('/base-manager-list.html') &&
      !path.includes('/base-manager-list/details.html')
    ) {
      this.storageEncryptionService.deletevalue(BaseManagerListPageSession);
    }

    // update base manager view detail storage
    if (!path.includes('/base-manager-list/details.html')) {
      this.storageEncryptionService.deletevalue(BaseManagerDetailsPageSession);
    }
  }

  getImagePath(url: string) {
    return getAemDamFullPath(url);
  }

  isMobileView(): boolean {
    return checkDevice() === 'Mobile' && window.innerWidth < 768;
  }

  onWindowResize() {
    this.updateViewState();
  }

  updateViewState() {
    if (this.selectedType === 'open' && this.isMobileView()) {
      this.hideDetails = true;
      this.isSearchVisible = true;
      this.isSearchIcon = false;
    } else if (this.isMobileView()) {
      this.isSearchIcon = true;
      this.isSearchVisible = false;
    } else {
      this.hideDetails = false;
      this.isSearchIcon = false;
      this.isSearchVisible = true;
    }
  }

  checkSearchIcon: boolean = false;

  onClickSearchIcon() {
    if (this.isMobileView()) {
      this.hideDetails = true;
      this.isSearchVisible = true;
      this.isSearchIcon = false;
      this.checkSearchIcon = true;
    } else {
      // On desktop view, only toggle the visibility of the search icon
      this.isSearchIcon = !this.isSearchIcon;
    }
  }

  receivedData(e: any) {
    /* Change the default value of selectedType to the value assigned by search bar */
    this.selectedType = e?.selectedType;

    if (e?.selectedType === 'open' && this.isMobileView()) {
      this.hideDetails = true;
      this.isSearchVisible = true;
      this.isSearchIcon = false;
    } else if (e?.selectedType === 'open' && !this.isMobileView()) {
      // If it's desktop view, keep isSearchVisible true
      this.hideDetails = false;
      this.isSearchIcon = true;
    } else if (e?.selectedType === 'close' && this.isMobileView()) {
      this.hideDetails = false;
      this.isSearchVisible = false;
      this.isSearchIcon = true;
    } else if (e?.selectedType === 'close' && !this.isMobileView()) {
      // If it's desktop view, keep isSearchVisible true
      this.hideDetails = false;
      this.isSearchVisible = true;
      this.isSearchIcon = false;
    } else {
      this.hideDetails = false;
      this.isSearchVisible = false;
      this.isSearchIcon = true;
    }
  }

  async getCountryCode() {
    this.loggedInCountryCode = await this.commonService.getA2CountryCodeAsync();
    if (this.commonService.checkIfVistaraLocale()) {
      this.loggedInCountryCode = 'vs';
    }
    this.profileNavigationPath = `/content/my-ai/${this.loggedInCountryCode}/en/profile.html`;
  }

  logout() {
    // this.headerService.logout().toPromise();
    this.authService.logout();
  }

  openDialog(): void {
    this.dialogRef = this.dialog.open(NavigationComponent, {
      animation: {
        to: 'bottom',
        incomingOptions: {
          keyframeAnimationOptions: { easing: 'ease-in-out', duration: 400 },
        },
        outgoingOptions: {
          keyframeAnimationOptions: { easing: 'ease-in-out', duration: 400 },
        },
      },
      panelClass: 'custom-dialog-container',
      position: { top: '0' },
      data: {
        personalisedNavigation: this.personalisedNavigation,
        commonData: this.headerDetails.commonData,
        navigationData: {
          ...this.headerDetails.navigationData,
          logo: this.headerDetails.headerData.logo,
        },
        userDetails: this.getInitials(
          this.userDetail?.firstName,
          this.userDetail?.lastName
        ),
      },
    });
    this.isSearchbar = false;
    this.trackClickEvent('App Menu');

    this.dialogRef?.afterClosed().subscribe((result) => {
      if (result) {
        this.isSearchbar = true;
        this.isOpen = false;
        this.trackClickEvent('App Menu');
      }
    });
  }

  toggleMenu(value): void {
    this.isOpen = value;
    if (this.isOpen) {
      this.openDialog();
    } else {
      this.dialogRef.close(true);
    }
  }

  trackClickEvent(clickName: string, linkURL?: string): void {
    // this.analyticsService.clickEventDatalayer({
    //   isErrorPage: false,
    //   linkURL,
    //   siteSection: '',
    //   siteSubSection: 'Navbar',
    //   clickInfo: {
    //     clickName,
    //     clickComponentType: 'Button',
    //     componentName: 'NavBar',
    //     componentID: 'NavBar',
    //   },
    // });
  }

  navigateToHome(logoName: string) {
    const homeRedirectionPath = 'home';
    this.trackClickEvent(`${logoName} logo`, homeRedirectionPath);
    this.router.navigate([homeRedirectionPath]);
    this.dialogRef.close(true);
  }

  ngOnDestroy() {
    // Remove event listener on component destroy
    window.removeEventListener('resize', this.onWindowResize);
  }

  viewProfile() {
    const profilePath = this.profileNavigationPath;

    this.trackClickEvent('View Profile Button', profilePath);

    this.router.navigate([profilePath]);
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

  shouldShowTodo(): boolean {
    return (
      this.headerDetails &&
      'labelHeader' in this.headerDetails &&
      typeof this.headerDetails.labelHeader === 'object' &&
      'toDoIsActive' in this.headerDetails.labelHeader &&
      this.headerDetails.labelHeader.toDoIsActive
    );
  }

  getTodoCount() {
    return this.toDoCount > 99 ? '99+' : this.toDoCount;
  }
}
