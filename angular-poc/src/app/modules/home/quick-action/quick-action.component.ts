import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AnalyticsComponent } from '../../shared/constants';
import { ChunkPipe } from '../../shared/pipes/chunk.pipe';
// import { AdobeAnalyticsService } from '../../shared/services/adobe-analytics.service';
import { CommonService } from '../../shared/services/common.service';
import {
  isMobileDevice,
  replaceSpaceWithHyphen,
} from '../../../../utils/utils';
import { HomeService } from '../home.service';
import { MY_BOARD_LEAVE_REDIRECTION_URL_POC } from '../../../app.api';


declare let bootstrap: any;
@Component({
  selector: 'app-quick-action',
  templateUrl: './quick-action.component.html',
  styleUrls: ['./quick-action.component.scss'],
})
export class QuickActionComponent implements OnInit, OnDestroy {
  @Input()
  siteSection: string;

  @Input() quickActionLabels: any;

  QUICK_ACTION: any = {};

  isDataLoaded: boolean = false;

  userPersona: string;

  private readonly _destroying$ = new Subject<void>();

  initialized: boolean = false;

  jobTitle: string;

  isMobileView = isMobileDevice();

  userGender: string;

  constructor(
    public router: Router,
    private commonService: CommonService,
    private homeService: HomeService,
    private chunkPipe: ChunkPipe
  ) {}

  ngOnInit(): void {
    this.commonService.getEmployeeRole().then(async (userPersona: string) => {
      this.userPersona = replaceSpaceWithHyphen(userPersona);

      const userData = this.commonService.getLoggedInEmployeeData();
      this.userGender = userData.gender;
      this.jobTitle = replaceSpaceWithHyphen(userData.jobTitle);

      this.homeService.getBaseManagerList().subscribe((res: any) => {
        if (res.data && res.data.length > 0) {
          const isBaseManager = res.data.some(
            (manager: any) => manager.employeeId === userData?.employeeId
          );

          this.getQuickActionsData(isBaseManager);
          this.commonService.setIsBaseManager(isBaseManager);
        }
      });
    });
  }

  ngOnDestroy(): void {
    this._destroying$.next();
    this._destroying$.complete();
  }




  onNavigate(quickActionData) {
    if (quickActionData.label === 'Leaves') {
      window.location.href = MY_BOARD_LEAVE_REDIRECTION_URL_POC

     
    }
  }
  // onNavigate(
  //   link: string,
  //   isExternal: boolean,
  //   label: string,
  //   isMaleFemaleCheck: string,
  //   femaleUniformFormPath: string,
  //   maleUniformFormPath: string
  // ) {
  //   if (isExternal) {
  //     if (isMaleFemaleCheck === 'true') {
  //       // Check the gender and open the appropriate form link
  //       if (this.userGender === 'M') {
  //         window.open(maleUniformFormPath, '_blank');
  //       } else {
  //         window.open(femaleUniformFormPath, '_blank');
  //       }
  //     } else {
  //       // If isMaleFemaleCheck is false, just open the original link
  //       window.open(link, '_blank');
  //     }
  //   } else {
  //     // Navigate internally using Angular Router
  //     const queryParams = this.commonService.extractQueryParams(link);
  //     const route = queryParams ? [link.split('?')[0]] : [link];
  //     this.router.navigate(route, { queryParams });
  //   }
  // }

  getQuickActionsData(isBaseManager: boolean) {
    /* Get quick action list from AEM api */
    const quickActionCategoryListObservable = isBaseManager
      ? this.homeService.getQuickActionsDataFromAEM(
          this.quickActionLabels.quickAction + this.jobTitle
        )
      : this.homeService.getQuickActionsDataFromAEM(
          this.quickActionLabels.quickAction + this.userPersona
        );

    quickActionCategoryListObservable
      .pipe(takeUntil(this._destroying$))
      .subscribe(
        (quickActionData: any) => {
          this.isDataLoaded = true;
          const quickActionItemCount = this.isMobileView ? 9 : 8;
          if (quickActionData) {
            this.QUICK_ACTION = this.chunkPipe.transform(
              quickActionData.data.actionSubategoryCfModelByPath.navCategories.actionList.filter(
                (app) => app.forAppOrWeb === 'both' || app.forAppOrWeb === 'web'
              ),
              quickActionItemCount
            );
            this.initializeQuickActionCarousel();
          }
        },
        () => {
          this.isDataLoaded = true;
        }
      );
  }

  initializeQuickActionCarousel(): void {
    if (this.QUICK_ACTION.length > 1) {
      setTimeout(() => {
        /* eslint-disable no-new */
        new bootstrap.Carousel(
          document.getElementById('home-quick-action-carousel'),
          {
            interval: 5000,
          }
        );
      }, 1000);
    }
  }
}
