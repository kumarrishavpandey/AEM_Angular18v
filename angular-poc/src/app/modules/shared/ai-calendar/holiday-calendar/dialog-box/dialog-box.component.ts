import {
  Component, EventEmitter, Input, Output,
} from '@angular/core';
import { EventHolidayData } from '../../interface/holiday-calendar/event-holiday.interface';
import { ExtendedProps } from '../../interface/holiday-calendar/extended-props.interface';
import { getDateGMT, isExceptionalLeave, toTitleCase } from '../../utility';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss'],
})
export class DialogBoxComponent {
  @Input()
  date: Date;

  @Input()
  eventHolidayData: EventHolidayData[];

  @Input()
  isDialogVisible: boolean;

  @Output()
  isDialogVisibleChange = new EventEmitter<boolean>();

  closeDialog(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
    this.isDialogVisibleChange.emit(false);
  }

  handleDialogClick(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
  }

  getDateString(inpDate: string) {
    return getDateGMT(new Date(inpDate)).toDateString();
  }

  getEventTitle(event: EventHolidayData) {
    const { extendedProps, title } = event;

    const { name } = extendedProps;

    if (!(extendedProps && 'status' in extendedProps)) {
      return title;
    }

    if (title && title.toLowerCase() === 'leave' && isExceptionalLeave(name)) {
      return toTitleCase(name.toLowerCase().replace(' leave', ''));
    }

    return name;
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

  getEventContent(event: EventHolidayData) {
    const { extendedProps } = event;

    if (!(extendedProps && 'status' in extendedProps)) {
      return extendedProps.name;
    }

    return this.getEventStatus(event);
  }

  getEventDuration(event: EventHolidayData): string {
    const { extendedProps } = event;

    if (extendedProps && 'duration' in extendedProps) {
      const eventDuration = parseFloat(extendedProps.duration);

      if (!Number.isNaN(eventDuration) && eventDuration > 0) {
        return `(${eventDuration} day${eventDuration > 1 ? 's' : ''})`;
      }
    }

    return '';
  }
}
