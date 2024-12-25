import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AnchorTagModule } from 'src/app/shared/components/anchor-tag/anchor-tag.module';
import { StackCardComponent } from 'src/app/shared/components/cards/stack-card/stack-card.component';
import { SkeletonModule } from 'src/app/shared/components/skeleton/skeleton.module';
import { ApprovalCardModule } from '../approval-card/approval-card.module';
import { StackCardSkeletonComponent } from './stack-card-skeleton/stack-card-skeleton.component';

@NgModule({
  declarations: [
    StackCardComponent,
    StackCardSkeletonComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AnchorTagModule,
    ApprovalCardModule,
    SkeletonModule,
  ],
  exports: [
    StackCardComponent,
    StackCardSkeletonComponent,
  ],
})
export class StackCardModule {}
