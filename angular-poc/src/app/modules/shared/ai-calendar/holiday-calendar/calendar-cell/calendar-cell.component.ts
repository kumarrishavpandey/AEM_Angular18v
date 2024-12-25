import {
  Component, Input,
} from '@angular/core';

import { EventHolidayData } from '../../interface/holiday-calendar/event-holiday.interface';
import { isCurrentMonth, isMobile, isToday } from '../../utility';
import { DeviceType } from '../../../constants';

@Component({
  selector: 'app-calendar-cell',
  templateUrl: './calendar-cell.component.html',
  styleUrls: ['./calendar-cell.component.scss'],
})
export class CalendarCellComponent {
  @Input()
  currentDate: Date;

  @Input()
  date: Date;

  @Input()
  dateEventMap: Map<string, EventHolidayData[]>;

  @Input()
  deviceType: DeviceType;

  isDialogVisible: boolean;

  constructor() {
    this.isDialogVisible = false;
  }

  showDialog() {
    this.isDialogVisible = true;
  }

  isCurrentDayEvent(targetDate: Date, eventDate: Date): boolean {
    return (
      targetDate.getFullYear() === eventDate.getFullYear()
      && targetDate.getMonth() === eventDate.getMonth()
      && targetDate.getDate() === eventDate.getDate()
    );
  }

  isCurrentMonth(date: Date): boolean {
    return isCurrentMonth(this.currentDate, date);
  }

  isMobile(): boolean {
    return isMobile(this.deviceType);
  }

  isToday(date: Date): boolean {
    return isToday(date);
  }

  getEventCount(date: Date): number {
    const holidayEvents: EventHolidayData[] = this.dateEventMap.get(date.toLocaleDateString());

    if (holidayEvents && holidayEvents.length) {
      return holidayEvents.filter((event) => this.isCurrentDayEvent(date, event.eventProps.start)).length;
    }

    return 0;
  }

  getEventsCount(date: Date): number {
    return this.dateEventMap.get(date.toLocaleDateString())?.length || 0;
  }

  getEvent(date: Date): EventHolidayData {
    const formatedDate = date.toLocaleDateString();

    const holidayEvents: EventHolidayData[] = this.dateEventMap.get(formatedDate);

    if (holidayEvents && holidayEvents.length) {
      const currentDayEvents = holidayEvents.filter((event) => this.isCurrentDayEvent(date, event.eventProps.start));

      if (currentDayEvents && currentDayEvents.length) {
        const maxDuration = Math.max(...currentDayEvents.map((event) => event.eventProps.duration));

        const maxDurationEvents = currentDayEvents.filter((event) => event.eventProps.duration === maxDuration);

        const holiday = maxDurationEvents.filter((event) => !('status' in event.extendedProps));

        if (holiday && holiday.length) {
          return holiday[0];
        }

        const leaves = maxDurationEvents.filter((event) => 'status' in event.extendedProps);

        if (leaves && leaves.length) {
          return leaves[0];
        }
      }
    }

    return {} as EventHolidayData;
  }

  getMobileEvent(date: Date): EventHolidayData {
    const actualEvent = this.getEvent(date);

    if (actualEvent && 'title' in actualEvent) {
      return actualEvent;
    }

    const holidayEvents: EventHolidayData[] = this.dateEventMap.get(date.toLocaleDateString());

    if (holidayEvents && holidayEvents.length) {
      const maxDuration = Math.max(...holidayEvents.map((event) => event.eventProps.duration));

      const maxDurationEvents = holidayEvents.filter((event) => event.eventProps.duration === maxDuration);

      const holiday = maxDurationEvents.filter((event) => !('status' in event.extendedProps));

      if (holiday && holiday.length) {
        return holiday[0];
      }

      const leaves = maxDurationEvents.filter((event) => 'status' in event.extendedProps);

      if (leaves && leaves.length) {
        return leaves[0];
      }
    }

    return {} as EventHolidayData;
  }

  getEvents(date: Date): EventHolidayData[] {
    return this.dateEventMap.get(date.toLocaleDateString()) || [];
  }

  renderMonthName(): boolean {
    return this.date.getDate() === 1 && (!isMobile(this.deviceType) || !isToday(this.date));
  }

  renderDesktopEvent(): boolean {
    return !isMobile(this.deviceType) && this.getEventCount(this.date) > 0;
  }

  renderMobileEvent(): boolean {
    return isMobile(this.deviceType) && this.getEventsCount(this.date) > 0;
  }
}
