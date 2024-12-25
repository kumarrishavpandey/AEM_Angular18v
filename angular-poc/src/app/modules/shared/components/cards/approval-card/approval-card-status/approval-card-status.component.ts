import { Component, Input } from '@angular/core';
import { EnumApprovalCardRequestStatus } from 'src/app/shared/components/cards/approval-card/approval-card-status/approval-card-status.enum';
import { ApprovalCardService } from 'src/app/shared/components/cards/approval-card/approval-card.service';
import { toTitleCase } from 'utils/utils';

@Component({
  selector: 'app-approval-card-status',
  templateUrl: './approval-card-status.component.html',
  styleUrls: ['./approval-card-status.component.scss'],
})
export class ApprovalCardStatusComponent {
  @Input()
  requestStatus: string;

  @Input()
  submittedOn: Date;

  constructor(private approvalCardService: ApprovalCardService) {}

  getRequestStatus(): string {
    return toTitleCase(this.requestStatus.split('_').join(' '));
  }

  getRequestStatusClass(): string {
    return this.requestStatus.toLowerCase();
  }

  isPendingRequest(): boolean {
    return this.requestStatus && [EnumApprovalCardRequestStatus.PENDING, EnumApprovalCardRequestStatus.PENDING_CANCELLATION].includes(this.requestStatus.toUpperCase() as EnumApprovalCardRequestStatus);
  }

  shouldShowPendingRequest() {
    return this.approvalCardService.getDaysDifference(this.submittedOn) === 0;
  }
}
