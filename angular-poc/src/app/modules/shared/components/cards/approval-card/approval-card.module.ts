import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { AnchorTagModule } from 'src/app/shared/components/anchor-tag/anchor-tag.module';
import { SkeletonModule } from 'src/app/shared/components/skeleton/skeleton.module';
import { CommonButtonModule } from '../../common-button/common-button.module';
import { EmployeeCardModule } from '../employee-card/employee-card.module';
import { ApprovalCardEmployeeNameComponent } from './approval-card-employee-name/approval-card-employee-name.component';
import { ApprovalCardPendingForComponent } from './approval-card-pending-for/approval-card-pending-for.component';
import { ApprovalCardSkeletonComponent } from './approval-card-skeleton/approval-card-skeleton.component';
import { ApprovalCardStatusComponent } from './approval-card-status/approval-card-status.component';
import { ApprovalCardSubmittedOnComponent } from './approval-card-submitted-on/approval-card-submitted-on.component';
import { ApprovalCardComponent } from './approval-card.component';

@NgModule({
  declarations: [
    ApprovalCardEmployeeNameComponent,
    ApprovalCardPendingForComponent,
    ApprovalCardSubmittedOnComponent,
    ApprovalCardComponent,
    ApprovalCardSkeletonComponent,
    ApprovalCardStatusComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    EmployeeCardModule,
    MatIconModule,
    MatTooltipModule,
    AnchorTagModule,
    CommonButtonModule,
    SkeletonModule,
  ],
  exports: [ApprovalCardComponent, ApprovalCardSkeletonComponent],
})
export class ApprovalCardModule {}
