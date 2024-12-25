import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { EnumAvatarSize, EnumAvatarTheme } from 'src/app/shared/components/cards/employee-card/employee-card.enum';
import { AnalyticsComponent } from 'src/app/shared/constants';
import { AdobeAnalyticsService } from 'src/app/shared/services/adobe-analytics.service';
import { StorageEncryptionService } from 'src/app/shared/services/storage-encryption.service';
import {
  BaseManagerDetailsURL,
  BaseManagerListPageSession,
  BaseManagerRequestsListEnum,
  RequestStatusEnum,
} from '../base-manager.constant';
import { BaseManagerService } from '../base-manager.service';

@Component({
  selector: 'app-base-manager-list',
  templateUrl: './base-manager-list.component.html',
  styleUrls: ['./base-manager-list.component.scss'],
})
export class BaseManagerListComponent {
  @Input() baseManagerRequestsList;

  @Input() labelsBaseManager;

  @Input() selectedButton;

  @Input() labelsBaseManagerAcmList;

  @Input() activeTab;

  @Input() selectedTabIndex;

  avatarTheme = EnumAvatarTheme;

  avatarSize = EnumAvatarSize;

  baseManagerRequestsListEnum = BaseManagerRequestsListEnum;

  RequestStatusEnum = RequestStatusEnum;

  constructor(
    public baseManagerService: BaseManagerService,
    public router: Router,
    private analyticsService: AdobeAnalyticsService,
    public storageEncryptionService: StorageEncryptionService,
  ) {}

  navigateToViewDetails(reqNo: string) {
    // const url = '/content/my-ai/in/en/base-manager-list/details.html';
    this.analyticsService.clickEventDatalayer({
      isErrorPage: false,
      siteSection: this.labelsBaseManagerAcmList.pageTitle,
      siteSubSection: this.activeTab,
      clickInfo: {
        clickName: this.labelsBaseManager.btnViewDetails,
        clickComponentType: AnalyticsComponent.BUTTON,
        componentName: this.labelsBaseManager.btnViewDetails,
        componentID: `${this.labelsBaseManagerAcmList.pageTitle}_${this.activeTab}_${this.selectedButton}_${this.labelsBaseManager.btnViewDetails}`,
      },
    });
    this.storageEncryptionService.setvalue(
      BaseManagerListPageSession,
      JSON.stringify({
        listingTabIndex: this.selectedTabIndex,
        listingFilter: this.selectedButton,
      }),
    );

    this.router.navigate([BaseManagerDetailsURL], {
      queryParams: { reqNo },
    });
  }
}
