import {
  Component, EventEmitter, Input, OnInit, Output,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { getAemDamFullPath } from 'utils/utils';
import { AdobeAnalyticsService } from 'src/app/shared/services/adobe-analytics.service';
import { StorageEncryptionService } from 'src/app/shared/services/storage-encryption.service';
import { AnalyticsComponent } from 'src/app/shared/constants';
import {
  BaseManagerDetailsPageSession,
  BaseManagerDetailsURL,
  BaseManagerRequestsListEnum,
  JOURNEY_TYPES,
  RequestStatusEnum,
} from '../../../base-manager.constant';

@Component({
  selector: 'app-base-manager-history',
  templateUrl: './base-manager-history.component.html',
  styleUrls: ['./base-manager-history.component.scss'],
})
export class BaseManagerHistoryComponent implements OnInit {
  @Input() historyData;

  @Input() siteSection;

  @Input() viewMoreData;

  @Input() historyTabLabels;

  @Input() isDataLoaded: boolean = false;

  @Output() selectedTab = new EventEmitter<any>();

  JOURNEY_TYPES = JOURNEY_TYPES;

  selectedType: string;

  noDataImagePath;

  offset = 0;

  limit = 1; // 1=10

  baseManagerRequestsListEnum = BaseManagerRequestsListEnum;

  RequestStatusEnum = RequestStatusEnum;

  reqNo: string;

  filter: string;

  type: string;

  selectedReq: string;

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private storageEncryptionService: StorageEncryptionService,
    private analyticsService: AdobeAnalyticsService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((query: Params) => {
      this.reqNo = query?.reqNo;
      this.selectedReq = query?.selectedReq;
    });

    if (!this.selectedReq) {
      if (
        this.storageEncryptionService.getvalue(BaseManagerDetailsPageSession)
      ) {
        this.selectedType = JSON.parse(
          this.storageEncryptionService.getvalue(BaseManagerDetailsPageSession),
        )?.detailsType;

        this.storageEncryptionService.deletevalue(
          BaseManagerDetailsPageSession,
        );
      } else {
        this.selectedType = JOURNEY_TYPES.DOMESTIC;
      }
    }

    this.noDataImagePath = getAemDamFullPath(
      this.historyTabLabels?.imgNoRequest,
    );
  }

  onTabClick(type: string) {
    this.selectedType = type;
    this.offset = 0;

    this.selectedTab.emit({
      selectedType: this.selectedType,
      offset: this.offset,
      limit: this.limit,
    });
    // const tabLabel = event.tab.textLabel;
    this.analyticsService.clickEventDatalayer({
      isErrorPage: false,
      siteSection: this.siteSection,
      siteSubSection: this.historyTabLabels.labelTab,
      clickInfo: {
        clickName: type,
        clickComponentType: AnalyticsComponent.BUTTON,
        componentName: type,
        componentID: `${this.siteSection}_${this.historyTabLabels.labelTab}_${type}`,
      },
    });
  }

  onClickViewMore() {
    this.adobeAnalyticsOnButtonClick(this.historyTabLabels.labelBtnViewMore);
    if (this.viewMoreData) {
      this.offset += 1;
      this.selectedTab.emit({
        selectedType: this.selectedType,
        offset: this.offset,
        limit: this.limit,
      });
    }
  }

  navigateToHistoryViewDetails(reqNo: string) {
    this.adobeAnalyticsOnButtonClick(this.historyTabLabels.labelBtnViewDetails);
    this.storageEncryptionService.setvalue(
      BaseManagerDetailsPageSession,
      JSON.stringify({
        detailsType: this.selectedType,
      }),
    );

    this.router.navigate([BaseManagerDetailsURL], {
      queryParams: {
        reqNo: this.reqNo,
        selectedReq: reqNo,
      },
    });
  }

  adobeAnalyticsOnButtonClick(clickName: string) {
    /* Adobe analytics when clicked */
    this.analyticsService.clickEventDatalayer({
      isErrorPage: false,
      siteSection: this.siteSection,
      siteSubSection: this.historyTabLabels.labelTab,
      clickInfo: {
        clickName,
        clickComponentType: AnalyticsComponent.BUTTON,
        componentName: `${this.siteSection}_${clickName}`,
      },
    });
  }
}
