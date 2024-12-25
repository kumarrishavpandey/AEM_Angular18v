import { CommonModule, DatePipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CalendarViewComponent } from './dashboard/calendar-view/calendar-view.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HolidayLeavesListViewComponent } from './dashboard/holiday-leaves-list-view/holiday-leaves-list-view.component';
import { SelectRegionComponent } from './dashboard/select-region/select-region.component';
import { HolidayCalendarComponent } from './holiday-calendar/holiday-calendar.component';
import { LeaveComponent } from './leave.component';
import { NewRequestComponent } from './new-request/new-request.component';
import { RequestedLeaveComponent } from './requested-leave/requested-leave.component';
import { ViewEditLeaveDialogComponent } from './requested-leave/view-edit-leave-dialog/view-edit-leave-dialog.component';
import { RouterModule, Routes } from '@angular/router';
import { AngularMaterialModule } from '../../angular-material.module';
import { SharedModule } from '../shared/shared.module';

const routes:Routes = [{
  path:"",
  component:LeaveComponent
}]

@NgModule({
  declarations: [
    LeaveComponent,
    DashboardComponent,
    RequestedLeaveComponent,
    NewRequestComponent,
    ViewEditLeaveDialogComponent,
    HolidayLeavesListViewComponent,
    CalendarViewComponent,
    SelectRegionComponent,
    HolidayCalendarComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [DatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LeaveModule {}
