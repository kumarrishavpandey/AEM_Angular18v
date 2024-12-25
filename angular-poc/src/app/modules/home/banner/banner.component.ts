/* eslint prefer-destructuring: 'off' */
import { DatePipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subject, forkJoin } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { AzureService } from '../../shared/services/azure.service';
import { CommonService } from '../../shared/services/common.service';
import { environment } from '../../../../environments/environment';
import { getDynamicMediaPath, getInitials } from '../../../../utils/utils';
import { NavigationService } from '../../navigation/navigation.service';
import { weatherPath } from '../home.constant';
import { NavigationComponent } from '../../navigation/navigation.component';
import { NavigationLabels } from '../constant';

declare let bootstrap: any;

interface LocationInfo {
  latitude: number;
  longitude: number;
}

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input()
  siteSection: string;

  @Input()
  siteSubSection: string;

  @Input()
  bannerLabels: any;

  time: Date;

  hours: number;

  msg: string;

  isRosterApplicable = false;

  employeeHomePageData: any;

  weatherData;

  timezoneData;

  userLocation: string = '';

  slides: any = [];

  weatherDomain: string;

  weatherImagePath: string;

  actualTimezone: string;

  isDataLoaded: boolean = false;

  personalNavList: any;

  private readonly _destroying$ = new Subject<void>();

  imageUrlFixedBanner: string;

  userGender: string;

  dialogRef: any;

  getInitials = getInitials;

  userData: any;

  navigationLabels = NavigationLabels;

  isOpen: boolean = false;

  personalisedNavigation: any;

  constructor(
    public commonService: CommonService,
    public azureService: AzureService,
    public router: Router,
    private datePipe: DatePipe,
    private navigationService: NavigationService,
    public dialog: NgDialogAnimationService
  ) {
    this.time = new Date(); // set time variable with current date
    this.weatherDomain = environment.AEM_BASE_URL;
  }

  ngOnInit(): void {
    const imageName = this.bannerLabels.fixedBanner.bannerImage
      .split('/')
      .pop()
      .replace(/\.[^/.]+$/, '');

    this.imageUrlFixedBanner = getDynamicMediaPath(imageName);

    this.navigationService.personalisedNavigation
      .pipe(takeUntil(this._destroying$))
      .subscribe((data) => {
        if (data) {
          this.personalNavList = data.personalNavList;
          this.personalisedNavigation = data;
          this.fetchBannerInfo();
          this.checkLocationPermission();
        }
      });

    this.commonService.getEmpDataStatus().subscribe((loaded) => {
      if (loaded) {
        this.userData = this.commonService.getLoggedInEmployeeData();
        this.userGender = this.userData.gender;
      }
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      /* eslint-disable no-new */
      new bootstrap.Carousel(
        document.getElementById('home-banner-carouselExample'),
        {
          interval: 5000,
        }
      );
    }, 1000);
  }

  ngOnDestroy(): void {
    this._destroying$.next();
    this._destroying$.complete();
  }

  fetchBannerInfo() {
    this.commonService
      .bannerInfo()
      .pipe(takeUntil(this._destroying$))
      .subscribe((bannerData: any) => {
        this.slides =
          bannerData?.data?.bannerDetailsModelList?.items.filter(
            (app) => app.forAppOrWeb === 'both' || app.forAppOrWeb === 'web'
          ) || [];
        this.slides = this.slides.map((slide) => {
          const imageName = slide.bannerImage._path
            .split('/')
            .pop()
            .replace(/\.[^/.]+$/, '');
          return {
            ...slide,
            updatedImagePath: getDynamicMediaPath(imageName),
          };
        });
      });
  }

  onLocationPermissionStateChange(state: PermissionState) {
    if (['prompt', 'denied'].includes(state)) {
      this.getCurrentWeatherInfoBrowserLocationOff();
    }

    if (['prompt', 'granted'].includes(state)) {
      this.getCurrentLocation().then((locationInfo) => {
        this.getCurrentWeatherInfoBrowserLocationOn(locationInfo);
      });
    }
  }

  checkLocationPermission() {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: 'geolocation' })
        .then((permissionStatus) => {
          this.onLocationPermissionStateChange(permissionStatus.state);

          permissionStatus.addEventListener('change', () => {
            this.onLocationPermissionStateChange(permissionStatus.state);
          });
        });
    } else {
      new Error('Geolocation is not supported by this browser.');
    }
  }

  setRosterApplicable(userPersona: string) {
    if (userPersona === 'crew') {
      this.isRosterApplicable = true;
    }
  }

  getCurrentWeatherInfo(latitude, longitude, a2CountryCode) {
    this.commonService.getEmployeeRole().then(async (userPersona: string) => {
      this.setRosterApplicable(userPersona);

      const unitType =
        a2CountryCode === 'US' || a2CountryCode === 'UM'
          ? 'imperial'
          : 'metric';

      const weatherObservable = this.azureService.fetchAzureWeatherInfo(
        latitude,
        longitude,
        unitType
      );

      const timezoneObservable = this.azureService.fetchAzureTimezoneInfo(
        latitude,
        longitude
      );

      forkJoin([weatherObservable, timezoneObservable])
        .pipe(takeUntil(this._destroying$))
        .subscribe(
          ([weatherResp, timezoneResp]) => {
            this.weatherData = weatherResp.results[0];

            if (this.weatherData) {
              this.weatherImagePath = `${this.weatherDomain}${weatherPath}${this.weatherData?.iconCode}.png`;
            }

            this.timezoneData = timezoneResp.TimeZones[0];

            const parts = this.timezoneData?.ReferenceTime?.WallTime.split('T');
            const timePart = parts[1];
            this.hours = timePart.substr(0, 2);
            this.decideGreetingMessage(this.bannerLabels, userPersona);

            this.actualTimezone = this.formatTimeOffset(
              this.timezoneData.ReferenceTime.StandardOffset
            );
          },
          () => {
            this.isDataLoaded = true;
          },
          () => {
            this.isDataLoaded = true;
          }
        );
    });
  }

  getCurrentWeatherInfoBrowserLocationOn(locationInfo: LocationInfo) {
    const { latitude, longitude } = locationInfo;

    this.azureService
      .fetchAzureLocationInfo(latitude, longitude)
      .pipe(takeUntil(this._destroying$))
      .subscribe(
        (locationResp) => {
          if (locationResp.addresses[0].address.localName) {
            this.userLocation = locationResp.addresses[0].address.localName;
          } else {
            this.userLocation =
              locationResp.addresses[0].address.countrySecondarySubdivision;
          }

          const a2CountryCode = locationResp.addresses[0].address.countryCode;

          this.getCurrentWeatherInfo(latitude, longitude, a2CountryCode);
        },
        () => {
          this.isDataLoaded = true;
        }
      );
  }

  getCurrentWeatherInfoBrowserLocationOff() {
    this.commonService
      .getEmpDataStatus()
      .pipe(takeUntil(this._destroying$))
      .subscribe((loaded) => {
        if (loaded) {
          this.azureService
            .fetchAzureCrossStreetInfo(
              this.commonService.loggedInEmployeeData.locationGroupDesc
            )
            .pipe(takeUntil(this._destroying$))
            .subscribe((locationResp) => {
              this.userLocation =
                this.commonService.loggedInEmployeeData.locationGroupDesc;

              const matchedCountryCodeObj = locationResp?.results?.find(
                (location) =>
                  location?.address?.countryCode ===
                  this.commonService?.loggedInEmployeeData?.countryA2
              );

              if (matchedCountryCodeObj) {
                const latitude = matchedCountryCodeObj.position.lat;
                const longitude = matchedCountryCodeObj.position.lon;
                const a2CountryCode = this.commonService.getA2CountryCode();

                this.getCurrentWeatherInfo(latitude, longitude, a2CountryCode);
              }
            });
        }
      });
  }

  extractTimezoneOffset(dateString: string): string {
    const offsetIndex = dateString?.lastIndexOf(':');
    const timezoneOffset = dateString?.substring(
      offsetIndex - 3,
      offsetIndex + 3
    );

    return timezoneOffset;
  }

  formatBannerTime(
    value: any,
    format: string,
    timezone: string
  ): string | null {
    return this.datePipe.transform(value, format, timezone);
  }

  public formatTimeOffset(timeString: string): string {
    // Check if the time string has a negative sign
    const hasMinus = timeString.includes('-');

    let formattedTime = timeString;
    // Remove any trailing '00'
    formattedTime = formattedTime.replace(/:00$/, '');

    // Add a '+' sign if there's no '-' sign and the time string is not zero
    if (!hasMinus && formattedTime !== '00:00') {
      formattedTime = `+${formattedTime}`;
    }

    return formattedTime;
  }

  getCurrentLocation(): Promise<LocationInfo> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          if (position) {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          }
        });
      } else {
        reject(new Error('Geolocation is not supported by this browser.'));
      }
    });
  }

  decideGreetingMessage(bannerData, userPersona) {
    if (!bannerData || !bannerData.salutationPersonaDetails) {
      return;
    }

    const userBannerData = bannerData.salutationPersonaDetails.find(
      (data) => data.salutationPersona === userPersona
    );

    if (!userBannerData || !userBannerData.salutationText) {
      return;
    }

    const greetingText = userBannerData.salutationText[0];

    if (!greetingText) {
      return;
    }

    if (this.hours < 12) {
      this.msg = greetingText.goodMorning;
    } else if (this.hours >= 12 && this.hours <= 16) {
      this.msg = greetingText.goodAfternoon;
    } else if (this.hours > 16 && this.hours <= 24) {
      this.msg = greetingText.goodEvening;
    }
  }

  bannerChangeInitCtaDL() {}

  bannerChangeCtaDL(slide, index) {}

  bannerCtaRedirection(slide) {
    if (slide.isChatbot) {
      document.getElementById('ask-aig').click();
    } else if (slide.isAllApps === 'true') {
      this.isOpen = true;
      this.toggleMenu(this.isOpen); // Open menu if `isAllApps` is true
    } else if (slide.isInternal) {
      const queryParams = this.commonService.extractQueryParams(
        slide.bannerCtaPath
      );

      const route = queryParams
        ? [slide.bannerCtaPath.split('?')[0]]
        : [slide.bannerCtaPath];

      this.router.navigate(route, { queryParams });
    } else if (slide.isTcs_disperz) {
      let disprzAction;
      let tcsIonAction;

      this.personalNavList?.actionList?.forEach((action) => {
        if (
          action.appId === environment.DISPRZ_APP_ID &&
          slide.bannerExtCtaPath
        ) {
          disprzAction = slide.bannerExtCtaPath;
        }
        if (
          action.appId === environment.TCS_ION_APP_ID &&
          slide.bannerCtaPath
        ) {
          tcsIonAction = slide.bannerCtaPath;
        }
      });

      if (disprzAction) {
        window.open(disprzAction, '_blank');
      } else if (tcsIonAction && !disprzAction) {
        window.open(tcsIonAction, '_blank');
      }
    } else if (slide.isMaleFemaleCheck === 'true') {
      if (this.userGender === 'M') {
        window.open(slide.maleUniformformPath, '_blank');
      } else {
        window.open(slide.femaleUniformFormPath, '_blank');
      }
    } else {
      window.open(slide.bannerCtaPath, '_blank');
    }
  }

  toggleMenu(isOpen: boolean): void {
    if (isOpen) {
      // Open dialog or handle menu toggle here
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
          commonData: this.navigationLabels.commonData,
          navigationData: {
            ...this.navigationLabels.navigationData,
            logo: this.navigationLabels.headerData.logo,
          },
          userDetails: this.getInitials(
            this.userData?.firstName,
            this.userData?.lastName
          ),
        },
      });

      // Handle dialog close event
      this.dialogRef?.afterClosed().subscribe((result) => {
        if (result) {
          this.isOpen = false;
        }
      });
    } else if (this.dialogRef) {
      // Close dialog if `isOpen` is false
      this.dialogRef.close(true);
    }
  }
}
