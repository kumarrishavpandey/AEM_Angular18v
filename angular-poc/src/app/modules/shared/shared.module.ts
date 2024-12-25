import { CommonModule, TitleCasePipe } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DateFormatPipe } from './pipes/date-format.pipe';

import { ChunkPipe } from './pipes/chunk.pipe';
import { KeysPipe } from './pipes/keys.pipe';
import { CommonService } from './services/common.service';
// import { CurrentBidComponent } from '../modules/bidding/bidding-dashboard/current-bid/current-bid.component';

import { BoldPipe } from './pipes/bold.pipe';
import { DateWithoutYearPipe } from './pipes/date-without-year.pipe';
import { OrdinalDateForUsPipe } from './pipes/ordinal-date-for-us.pipe';
import { OrdinalDatePipe } from './pipes/ordinal-date.pipe';
import { SanitizedHtmlPipe } from './pipes/sanitized-html.pipe';
import { DynamicScriptLoaderService } from './services/dynamic-script-loader.service';
// import { HttpService } from './services/http.service';
import { RosterService } from './services/roster-http.service';

import { UtcDateFormatPipe } from './pipes/utc-date-format.pipe';
import { AngularMaterialModule } from '../../angular-material.module';
import { searchBarData } from './components/search-bar/search-bar.constant';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { EmployeeCardComponent } from './components/cards/employee-card/employee-card.component';
import { SkeletonLoaderComponent } from './components/skeleton-loader/skeleton-loader.component';
import { HolidayCalendarComponent } from './ai-calendar/holiday-calendar/holiday-calendar.component';
import { CommonDropdownComponent } from './components/common-dropdown/common-dropdown.component';
import { CommonFileUploaderComponent } from './components/common-file-uploader/common-file-uploader.component';
import { CommonErrorMessageBarComponent } from './components/common-error-message-bar/common-error-message-bar.component';
import { CommonWarningDialogWithButtonsComponent } from './components/common-warning-dialog-with-buttons/common-warning-dialog-with-buttons.component';
import { CommonSuccessDialogWithoutButtonsComponent } from './components/common-success-dialog-without-buttons/common-success-dialog-without-buttons.component';
import { HolidayCalendarModule } from './ai-calendar/holiday-calendar/holiday-calendar.module';
import { NpsFeedbackComponent } from './components/nps-feedback/nps-feedback.component';
import { TitleComponent } from './components/title/title.component';
import { RosterSectionComponent } from './components/roster-section/roster-section.component';
import { RosterCardComponent } from './components/roster-card/roster-card.component';
import { TitleDescComponent } from './components/title-desc/title-desc.component';
import { IconWithTextComponent } from './components/icon-with-text/icon-with-text.component';
import { CommonCalendarComponent } from './components/common-calendar/common-calendar.component';

@NgModule({
  declarations: [
    SearchBarComponent,
    EmployeeCardComponent,
    SkeletonLoaderComponent,
    CommonWarningDialogWithButtonsComponent,
    CommonSuccessDialogWithoutButtonsComponent,
    CommonDropdownComponent,
    CommonFileUploaderComponent,
    CommonErrorMessageBarComponent,
    NpsFeedbackComponent,
    TitleComponent,
    RosterSectionComponent,
    RosterCardComponent,
    TitleDescComponent,
    IconWithTextComponent,
    CommonCalendarComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HolidayCalendarModule,
  ],
  exports: [
    SearchBarComponent,
    EmployeeCardComponent,
    SkeletonLoaderComponent,
    HolidayCalendarComponent,
    CommonDropdownComponent,
    CommonFileUploaderComponent,
    CommonErrorMessageBarComponent,
    NpsFeedbackComponent,
    TitleComponent,
    RosterSectionComponent,
    RosterCardComponent,
    TitleDescComponent,
    IconWithTextComponent,
    CommonCalendarComponent
  ],
  providers: [RosterService, DynamicScriptLoaderService],
  schemas: [NO_ERRORS_SCHEMA],
})
export class SharedModule {}
