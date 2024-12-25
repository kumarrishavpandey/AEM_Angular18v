import {
  Component, EventEmitter, Input, OnInit, Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LOGGEDIN_EMP } from 'src/app/app.api';
import { EnumAvatarSize, EnumAvatarTheme } from 'src/app/shared/components/cards/employee-card/employee-card.enum';
import { CommonSuccessDialogWithoutButtonsComponent } from 'src/app/shared/components/common-success-dialog-without-buttons/common-success-dialog-without-buttons.component';
import {
  AnalyticsComponent,
  mimeTypesJson,
} from 'src/app/shared/constants';
import { AdobeAnalyticsService } from 'src/app/shared/services/adobe-analytics.service';
import { DebugService } from 'src/app/shared/services/debug.service';
import { StorageEncryptionService } from 'src/app/shared/services/storage-encryption.service';
import { base64ToBlob, downloadBlobFile, getAemDamFullPath } from 'utils/utils';
import {
  BaseManagerRequestsListEnum,
  JOURNEY_TYPES,
  RequestStatusEnum,
} from '../../../base-manager.constant';
import {
  DialogApproveAcm,
  DialogApprovedAcm,
  DialogDeclinedAcm,
  DialogRejectAcm,
  LabelsBaseManagerACMApproval,
  TabCurrentRequests,
} from '../../../base-manager.interface';
import { BaseManagerService } from '../../../base-manager.service';
import { DeclineRequestDialogComponent } from './decline-request-dialog/decline-request-dialog.component';

@Component({
  selector: 'app-base-manager-current-request',
  templateUrl: './base-manager-current-request.component.html',
  styleUrls: ['./base-manager-current-request.component.scss'],
})
export class BaseManagerCurrentRequestComponent implements OnInit {
  @Input() managerData: any;

  @Input() labelsBaseManagerACMapproval: LabelsBaseManagerACMApproval;

  @Output() refreshData = new EventEmitter<boolean>();

  @Input() siteSection: string;

  @Input() isDataLoaded: boolean = false;

  tabCurrentRequests: TabCurrentRequests;

  dialogRejectAcm: DialogRejectAcm;

  labelReject: string;

  labelApprove: string;

  dialogApprovedAcm: DialogApprovedAcm;

  dialogDeclinedAcm: DialogDeclinedAcm;

  dialogApproveAcm: DialogApproveAcm;

  avatarTheme = EnumAvatarTheme;

  avatarSize = EnumAvatarSize;

  noAttachmentImagePath;

  baseManagerRequestsListEnum = BaseManagerRequestsListEnum;

  JOURNEY_TYPES = JOURNEY_TYPES;

  BASE_MANAGER_STATUS = RequestStatusEnum;

  imgCardLogo: string;

  comment: string = '';

  loggedEmployeeId = this.storageEncryptionService.getvalue(LOGGEDIN_EMP);

  constructor(
    private baseManagerService: BaseManagerService,
    public dialog: MatDialog,
    private analyticsService: AdobeAnalyticsService,
    private storageEncryptionService: StorageEncryptionService,
    private debugService: DebugService,
  ) {}

  ngOnInit(): void {
    this.tabCurrentRequests = this.labelsBaseManagerACMapproval?.tabCurrentRequests;
    this.dialogRejectAcm = this.labelsBaseManagerACMapproval?.dialogRejectAcm;
    this.labelReject = this.labelsBaseManagerACMapproval?.labelBtnReject;
    this.labelApprove = this.labelsBaseManagerACMapproval?.labelBtnApprove;
    this.dialogApprovedAcm = this.labelsBaseManagerACMapproval?.dialogApprovedAcm;
    this.dialogDeclinedAcm = this.labelsBaseManagerACMapproval?.dialogDeclinedAcm;
    this.dialogApproveAcm = this.labelsBaseManagerACMapproval?.dialogApproveAcm;
    this.noAttachmentImagePath = getAemDamFullPath(
      this.labelsBaseManagerACMapproval?.tabCurrentRequests?.imgNoRequest,
    );
    this.imgCardLogo = this.labelsBaseManagerACMapproval?.tabHistory?.imgCardLogo;
  }

  viewDocument(doc) {
    this.baseManagerService.getUploadedAttachment(doc?.docId).subscribe(
      (res) => {
        if (res?.data?.imgData) {
          const extension = doc?.originalFileName
            .split('?')[0]
            .split('.')
            .pop();

          const mimeType = mimeTypesJson[extension.toLowerCase()] || 'application/octet-stream';

          const blob = base64ToBlob(res.data.imgData, mimeType);

          downloadBlobFile(blob);
        } else {
          this.debugService.error('Invalid response or missing URL');
        }
      },
      (error) => {
        this.debugService.error('Error fetching PDF URL:', error);
      },
    );

    this.analyticsService.trackClickEvent({
      siteSection: this.siteSection,
      siteSubSection: this.labelsBaseManagerACMapproval.tabCurrentRequests.labelTab,
      clickName: this.labelsBaseManagerACMapproval.tabCurrentRequests.detailsComponent.labelBtnView,
      clickComponentType: AnalyticsComponent.BUTTON,
      componentName: this.labelsBaseManagerACMapproval.tabCurrentRequests.detailsComponent.labelAttachments,
    });
  }

  onRejectClick(reqNo: string) {
    this.dialog.closeAll();

    this.analyticsService.clickEventDatalayer({
      isErrorPage: false,
      siteSection: this.siteSection,
      siteSubSection:
        this.labelsBaseManagerACMapproval.tabCurrentRequests.labelTab,
      clickInfo: {
        clickName: this.labelReject,
        clickComponentType: AnalyticsComponent.BUTTON,
        componentName: this.labelReject,
        componentID: `${this.siteSection}_${this.labelsBaseManagerACMapproval.tabCurrentRequests.labelTab}_${this.labelReject}`,
      },
    });

    const rejectDialog = this.dialog.open(DeclineRequestDialogComponent, {
      autoFocus: false,
      panelClass: 'decline-modal-popup',
      data: {
        requestNo: reqNo,
        dialogRejectAcm: this.dialogRejectAcm,
        dialogDeclinedAcm: this.dialogDeclinedAcm,
        siteSection: this.siteSection,
        siteSubSection:
          this.labelsBaseManagerACMapproval.tabCurrentRequests.labelTab,
      },
    });

    rejectDialog.afterClosed().subscribe((res) => {
      if (res?.event === 'refresh') {
        this.refreshData.emit(true);
      }
    });
  }

  onApproveClick(reqNo: string) {
    this.analyticsService.clickEventDatalayer({
      isErrorPage: false,
      siteSection: this.siteSection,
      siteSubSection:
        this.labelsBaseManagerACMapproval.tabCurrentRequests.labelTab,
      clickInfo: {
        clickName: this.labelApprove,
        clickComponentType: AnalyticsComponent.BUTTON,
        componentName: this.labelApprove,
        componentID: `${this.siteSection}_${this.labelsBaseManagerACMapproval.tabCurrentRequests.labelTab}_${this.labelApprove}`,
      },
    });

    const data = {
      requestNo: reqNo,
      approve: true,
      comment: '',
    };

    const successIconPath = getAemDamFullPath(
      this.dialogApprovedAcm?.iconDialogApprovedAcm,
    );

    this.baseManagerService.submitApproveRequest(data).subscribe(
      (res) => {
        if (res?.status?.code === 200) {
          this.dialog.open(CommonSuccessDialogWithoutButtonsComponent, {
            autoFocus: false,
            data: {
              title: this.dialogApprovedAcm?.labelDialogApprovedAcm,
              message: this.dialogApprovedAcm?.labelDialogApprovedMsg,
              iconPath: successIconPath,
              iconColor: 'success',
            },
          });

          this.refreshData.emit(true);
        }
      },
      (error) => {
        this.debugService.log('error', error);
      },
    );
  }

  isRejectApproveButtonsEnabled() {
    if (this.managerData.empId === this.loggedEmployeeId) {
      return false;
    }
    return true;
  }
}
