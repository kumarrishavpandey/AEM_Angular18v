import { Component, Input } from '@angular/core';

import { Day } from '../../interface/day.model';
import { EventHolidayData } from '../../interface/holiday-calendar/event-holiday.interface';
import { DeviceType } from '../../../constants';

@Component({
  selector: 'app-calendar-grid',
  templateUrl: './calendar-grid.component.html',
  styleUrls: ['./calendar-grid.component.scss'],
})
export class CalendarGridComponent {
  @Input()
  currentDate: Date;

  @Input()
  dateEventMap: Map<string, EventHolidayData[]>;

  @Input()
  days: Day[];

  @Input()
  deviceType: DeviceType;

  weekDays: string[];

  constructor() {
    this.weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  }
}
