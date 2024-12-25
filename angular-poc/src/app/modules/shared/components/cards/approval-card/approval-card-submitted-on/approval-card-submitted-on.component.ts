import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { EnumApprovalCardRequestStatus } from 'src/app/shared/components/cards/approval-card/approval-card-status/approval-card-status.enum';

@Component({
  selector: 'app-approval-card-submitted-on',
  templateUrl: './approval-card-submitted-on.component.html',
  styleUrls: ['./approval-card-submitted-on.component.scss'],
})
export class ApprovalCardSubmittedOnComponent {
  @Input()
  labelSubmittedOn: string;

  @Input()
  labelLastUpdatedOn: string;

  @Input()
  labelRejectedOn: string;

  @Input()
  labelApprovedOn: string;

  @Input()
  submittedOn: Date;

  @Input()
  lastModifiedDateTime: Date;

  @Input()
  requestStatus: string;

  constructor(private datePipe: DatePipe) {}

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'dd MMM yyyy');
  }

  getActionOnDate(): string {
    if (this.submittedOn && this.lastModifiedDateTime && this.submittedOn.getTime() !== this.lastModifiedDateTime.getTime()) {
      return this.formatDate(this.lastModifiedDateTime);
    }

    return this.formatDate(this.submittedOn);
  }

  getActionStatusLabel(): string {
    if (this.requestStatus) {
      const status = this.requestStatus.toUpperCase();

      if (status === EnumApprovalCardRequestStatus.APPROVED) {
        return this.labelApprovedOn;
      }

      if (status === EnumApprovalCardRequestStatus.REJECTED) {
        return this.labelRejectedOn;
      }

      if (this.submittedOn && this.lastModifiedDateTime && this.submittedOn.getTime() !== this.lastModifiedDateTime.getTime()) {
        return this.labelLastUpdatedOn;
      }
    }

    return this.labelSubmittedOn;
  }
}
