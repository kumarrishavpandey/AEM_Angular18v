import { Component, Input } from '@angular/core';
import { EnumApprovalCardRequestStatus } from 'src/app/shared/components/cards/approval-card/approval-card-status/approval-card-status.enum';
import { ApprovalCardService } from 'src/app/shared/components/cards/approval-card/approval-card.service';

@Component({
  selector: 'app-approval-card-pending-for',
  templateUrl: './approval-card-pending-for.component.html',
  styleUrls: ['./approval-card-pending-for.component.scss'],
})
export class ApprovalCardPendingForComponent {
  @Input()
  iconTimer: string;

  @Input()
  labelPendingFor: string;

  @Input()
  labelPendingCancellationFor: string;

  @Input()
  labelDay: string;

  @Input()
  labelDays: string;

  @Input()
  lastModifiedDateTime: Date;

  @Input()
  requestStatus: string;

  constructor(private approvalCardService: ApprovalCardService) {}

  shouldShowPendingForData(): boolean {
    if (
      this.lastModifiedDateTime
      && this.approvalCardService.getDaysDifference(this.lastModifiedDateTime) > 0
    ) {
      return true;
    }

    return false;
  }

  getPendingForData(): string {
    return this.approvalCardService.getDaysDifference(this.lastModifiedDateTime).toString();
  }

  getPendingForDayLabel(): string {
    if (this.approvalCardService.getDaysDifference(this.lastModifiedDateTime) > 1) {
      return this.labelDays;
    }

    return this.labelDay;
  }

  isPendingCancellation(): boolean {
    return this.requestStatus && this.requestStatus.toUpperCase() === EnumApprovalCardRequestStatus.PENDING_CANCELLATION;
  }

  getPendingForLabel() {
    if (this.isPendingCancellation()) {
      return this.labelPendingCancellationFor;
    }

    return this.labelPendingFor;
  }
}
