import {
  Component, ContentChild, Input, TemplateRef,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IApproveRequestData } from 'src/app/modules/approvals/services/approval-action.model';
import { ApprovalActionService } from 'src/app/modules/approvals/services/approval-action.service';
import { IRequestDialogData } from 'src/app/modules/approvals/services/approval-dialog.model';
import { ApprovalDialogService } from 'src/app/modules/approvals/services/approval-dialog.service';
import { EnumAnchorTagLabelColor } from 'src/app/shared/components/anchor-tag/anchor-tag.enum';
import { EnumApprovalType } from 'src/types/approval/approval-type.enum';
import { getEmployeeFullName } from 'utils/utils';
import {
  IDataApprovalCard,
  ILabelsApprovalCard,
} from '../approval-card/approval-card.model';
import { ILabelsStackCard } from './stack-card.model';

@Component({
  selector: 'app-stack-card',
  templateUrl: './stack-card.component.html',
  styleUrls: ['./stack-card.component.scss'],
})
export class StackCardComponent {
  @ContentChild('stackCardRef')
  stackCardRef: TemplateRef<any>;

  @Input()
  siteSection: string;

  @Input()
  siteSubSection: string;

  @Input()
  labelsStackCard: ILabelsStackCard;

  @Input()
  labelsApprovalCard: ILabelsApprovalCard;

  @Input()
  cardData: any;

  @Input()
  pathParams: string;

  @Input()
  requestType: string;

  @Input()
  totalCount: number;

  @Input()
  showTagData: boolean = true;

  @Input() overlapCard: boolean = true;

  @Input() showHistoryData: boolean = false;

  urlParmas: {
    [key: string]: Params;
  };

  enumAnchorTagLabelColor = EnumAnchorTagLabelColor;

  constructor(
    private activatedRoute: ActivatedRoute,
    private approvalDialogService: ApprovalDialogService,
    private approvalActionService: ApprovalActionService,
  ) {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.urlParmas = params;
    });
  }

  getQueryParams() {
    return { ...this.urlParmas, type: this.requestType };
  }

  onRejectClick(cardData: IDataApprovalCard) {
    const rejectData: IRequestDialogData = {
      employeeId: cardData.employee.id,
      pathParams: this.pathParams,
      requestId: cardData.requestId,
      requestType: this.requestType,
    };

    this.approvalDialogService.showRejectRequestDialog(
      this.siteSection,
      this.siteSubSection,
      rejectData,
      this.labelsApprovalCard,
      true,
      !(this.requestType === EnumApprovalType.LEAVE_REQUEST),
    );
  }

  onApproveClick(cardData: IDataApprovalCard) {
    const approveData: IApproveRequestData = {
      employeeName: getEmployeeFullName(cardData.employee),
      pathParams: this.pathParams,
      labelRequestType: this.labelsApprovalCard.labelRequestType,
      requestId: cardData.requestId,
      requestType: this.requestType,
    };

    this.approvalActionService.approveRequestWithUndo(
      this.siteSection,
      this.siteSubSection,
      this.labelsStackCard.labelCardTitle,
      approveData,
      this.labelsApprovalCard.labelsAprovalCardSnackbar,
    );
  }
}
