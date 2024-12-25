import { Component, Input, OnInit } from '@angular/core';
import {
  getAemDamFullPath,
  getDynamicMediaPath,
} from '../../../../utils/utils';
import { CommonService } from '../../shared/services/common.service';
import { AWARDS_REDIRECTION_URL, AwardsEnum } from '../home.constant';
import { HomeService } from '../home.service';

declare let bootstrap: any;

@Component({
  selector: 'app-emp-dashboard-awards',
  templateUrl: './emp-dashboard-awards.component.html',
  styleUrls: ['./emp-dashboard-awards.component.scss'],
})
export class EmpDashboardAwardsComponent implements OnInit {
  @Input()
  siteSection: string;

  @Input()
  awardsAndAppreciationsLabels;

  awardsResponse = {
    awardsAndAppreciationTitle: 'Awards & Appreciations',
    startAppreciatingBtn: 'Start appreciating your colleagues',
    noAwardsAndAppreciationsTitle:
      'Every achievement begins with the first step',
  };

  awardsData: any[] = [];

  awardsTitle: string;

  awardsBtn: string;

  awardsApiResponse;

  badgesDefaultImagePath: string;

  noAwardsAndAppreciations: string;

  awardsDataAfterSlice: any[];

  isDataLoaded: boolean = false;

  disableAwardCTA: boolean = false;

  constructor(
    private homeService: HomeService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.badgesDefaultImagePath = getAemDamFullPath(
      '/content/dam/my-ai/badges/default.png'
    );
    this.awardsTitle = this.awardsAndAppreciationsLabels?.title;
    this.awardsBtn = this.awardsAndAppreciationsLabels?.ctaText;
    this.noAwardsAndAppreciations =
      this.awardsAndAppreciationsLabels?.noDataText;

    if (this.commonService.checkIfVistaraLocale()) {
      this.disableAwardCTA = true;
      this.isDataLoaded = true;
    } else {
      this.homeService.getAwardsData().subscribe(
        (res) => {
          this.isDataLoaded = true;
          this.awardsApiResponse = res;
          if (this.awardsApiResponse.data) {
            const awardsInfo = this.mapAwardsData(
              this.awardsApiResponse?.data?.awardInfo
            );
            const appreciationsInfo = this.mapAwardsData(
              this.awardsApiResponse?.data?.AppreciationInfo
            );
            this.awardsData = [...awardsInfo, ...appreciationsInfo];
          }

          this.awardsDataSplit();
          this.initializeCarousel();
        },
        () => {
          this.isDataLoaded = true;
        }
      );
    }
  }

  initializeCarousel(): void {
    if (this.awardsData.length > 0) {
      setTimeout(() => {
        /* eslint-disable no-new */
        new bootstrap.Carousel(document.getElementById('awardsCarousel'), {
          interval: 5000,
        });
      }, 1000);
    }
  }

  mapAwardsData(data: any[]): any[] {
    return data?.map((info: any) => {
      let enumValue;

      if (info.awardName) {
        enumValue = AwardsEnum[info.awardName as keyof typeof AwardsEnum];
      } else if (info.appreciationName) {
        enumValue =
          AwardsEnum[info.appreciationName as keyof typeof AwardsEnum];
      }

      const imageSrc = enumValue ? getDynamicMediaPath(enumValue) : undefined;

      return {
        awardName: info.awardName || info.appreciationName,
        numberOfAwardsReceived:
          info.numberOfAwardReceived || info.numberOfAppreciationReceived,
        imageSrc,
      };
    });
  }

  awardsDataSplit() {
    const awardsSize = 2;
    const slicedAwardsData = [];

    for (let i = 0; i < this.awardsData.length; i += awardsSize) {
      slicedAwardsData.push(this.awardsData.slice(i, i + awardsSize));
    }

    this.awardsDataAfterSlice = slicedAwardsData;
  }

  navigateOnAwardsBtnClick() {
    window.open(AWARDS_REDIRECTION_URL, '_blank');
  }
}
