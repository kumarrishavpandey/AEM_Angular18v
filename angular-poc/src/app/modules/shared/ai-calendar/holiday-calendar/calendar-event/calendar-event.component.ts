import { Component, Input } from '@angular/core';

import { EventHolidayData } from '../../interface/holiday-calendar/event-holiday.interface';
import { ExtendedProps } from '../../interface/holiday-calendar/extended-props.interface';
import { isExceptionalLeave, isMobile, toTitleCase } from '../../utility';
import { DeviceType } from '../../../constants';

@Component({
  selector: 'app-calendar-event',
  templateUrl: './calendar-event.component.html',
  styleUrls: ['./calendar-event.component.scss'],
})
export class CalendarEventComponent {
  @Input()
  deviceType: DeviceType;

  @Input()
  date: Date;

  @Input()
  eventHolidayData: EventHolidayData;

  isMobile(): boolean {
    return isMobile(this.deviceType);
  }

  getEventTitle(event: EventHolidayData) {
    const {
      extendedProps: { name },
      title,
    } = event;

    if (title && title.toLowerCase() === 'leave' && isExceptionalLeave(name)) {
      return toTitleCase(name.toLowerCase().replace(' leave', ''));
    }

    return name;
  }

  getEventIconType(event: EventHolidayData): string {
    const { extendedProps, title } = event;

    if (extendedProps && 'status' in extendedProps) {
      const { name } = extendedProps;

      if (title && title.toLowerCase() === 'leave') {
        return name.toLowerCase().replace(' leave', '');
      }

      return name.toLowerCase();
    }

    return 'all day';
  }

  getStatus(extendedProps: ExtendedProps): string {
    if (extendedProps && 'status' in extendedProps) {
      return extendedProps.status;
    }

    return 'all day';
  }

  getEventStatus(event: EventHolidayData) {
    const { extendedProps } = event;

    const eventStatus = this.getStatus(extendedProps);

    return toTitleCase(eventStatus.replace('_', ' ').toLowerCase());
  }

  getLeaveStatus(event: EventHolidayData) {
    const { extendedProps } = event;

    const eventStatus = this.getStatus(extendedProps);

    return eventStatus.replace(' ', '-').toLowerCase();
  }

  getEventDuration(event: EventHolidayData): number {
    const { eventProps } = event;
    const { duration } = eventProps;

    if (duration && !Number.isNaN(duration)) {
      return duration;
    }

    return 0;
  }

  px2em(px: number, base: number = 16): number {
    return px / base;
  }

  getEventTileWidth(event: EventHolidayData): string {
    const eventDuration = this.getEventDuration(event);
    const emValue = Math.ceil(eventDuration) * 100 - 15 + (Math.ceil(eventDuration) - 1) * 2;
    return `${emValue}%`;
  }
}
