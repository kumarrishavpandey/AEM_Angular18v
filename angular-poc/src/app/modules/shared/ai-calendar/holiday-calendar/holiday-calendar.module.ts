import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CalendarCellComponent } from './calendar-cell/calendar-cell.component';
import { CalendarEventComponent } from './calendar-event/calendar-event.component';
import { CalendarGridComponent } from './calendar-grid/calendar-grid.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { HeaderToolbarComponent } from './header-toolbar/header-toolbar.component';
import { HolidayCalendarComponent } from './holiday-calendar.component';

@NgModule({
  declarations: [
    HolidayCalendarComponent,
    CalendarGridComponent,
    CalendarEventComponent,
    DialogBoxComponent,
    CalendarCellComponent,
    HeaderToolbarComponent,
  ],
  exports: [HolidayCalendarComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
})
export class HolidayCalendarModule {}
