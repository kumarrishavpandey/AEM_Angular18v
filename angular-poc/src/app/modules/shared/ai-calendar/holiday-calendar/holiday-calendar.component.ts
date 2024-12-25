import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { DAY_TO_MILLISECONDS, DeviceType } from '../../constants';
import { WindowService } from '../../services/window.service';
import { Day } from '../interface/day.model';
import { EventHolidayData } from '../interface/holiday-calendar/event-holiday.interface';
import { LeaveHolidayData } from '../interface/holiday-calendar/leave-holiday.interface';
import {
  getDateGMT,
  getDaysBetweenDates,
  isExceptionalLeave,
  isExceptionalLeaveStatus,
  isMobile,
  isWeekend,
} from '../utility';

@Component({
  selector: 'app-calendar-holiday-calendar',
  templateUrl: './holiday-calendar.component.html',
  styleUrls: ['./holiday-calendar.component.scss'],
})
export class HolidayCalendarComponent implements OnInit, OnDestroy {
  @Input()
  fontFamily: string = '"Nunito Sans", sans-serif';

  @Input()
  width: string = '';

  @Input()
  height: string = '';

  @Input()
  scale: number = 1;

  @Input()
  leaveHoliday: LeaveHolidayData[];

  @Output()
  getSelectedDate = new EventEmitter<Date>();

  @Input()
  currentDate: Date;

  days: Day[];

  dateEventMap: Map<string, EventHolidayData[]>;

  deviceType: DeviceType;

  eventHolidayData: EventHolidayData[];

  resizeSubscription$: Subscription;

  constructor(private windowService: WindowService) {
    this.currentDate = getDateGMT(this.currentDate || new Date());
    this.deviceType = DeviceType.DESKTOP;
  }

  ngOnInit(): void {
    this.deviceType = this.windowService.getDeviceTypeByWindowWidth();

    this.resizeSubscription$ = this.windowService
      .onResizeDeviceTypeByWindowWidth()
      .subscribe((type) => {
        this.deviceType = type;
      });

    this.eventHolidayData = this.getLeaveHolidays(this.leaveHoliday);

    this.generateCalendar(this.currentDate);
  }

  ngOnDestroy(): void {
    this.resizeSubscription$.unsubscribe();
  }

  adjustEventDate(event: EventHolidayData): EventHolidayData {
    const {
      eventProps,
      eventProps: { start, end, duration },
    } = event;

    let updatedEvent = { ...event };

    if (isWeekend(end)) {
      const newEndDate = new Date(end.getTime() - DAY_TO_MILLISECONDS);

      updatedEvent = {
        ...event,
        eventProps: { ...eventProps, end: newEndDate, duration: duration - 1 },
      };
    }

    if (isWeekend(start)) {
      const newStartDate = new Date(start.getTime() + DAY_TO_MILLISECONDS);

      updatedEvent = {
        ...event,
        eventProps: {
          ...eventProps,
          start: newStartDate,
          duration: duration - 1,
        },
      };
    }

    return updatedEvent;
  }

  getLeaveHolidays(leaveHoliday: LeaveHolidayData[]): EventHolidayData[] {
    const targetEvents: EventHolidayData[] = [];

    const partedEvents: EventHolidayData[] = [];

    leaveHoliday?.forEach((event) => {
      const eventStart = getDateGMT(new Date(event.start));

      const eventEnd = getDateGMT(new Date(event.end));

      const eventDuration = getDaysBetweenDates(eventStart, eventEnd);

      if (
        !isMobile(this.deviceType)
        && eventDuration > 1
        && eventStart.getDay() + eventDuration > 6
      ) {
        let remainingDuration = eventDuration;

        while (remainingDuration > 0) {
          const newDuration = Math.min(
            remainingDuration,
            6 - eventStart.getDay() + 1,
          );

          const newStartDate = new Date(eventStart);

          const newEndDate = new Date(
            eventStart.getTime() + (newDuration - 1) * DAY_TO_MILLISECONDS,
          );

          const updatedEvent: EventHolidayData = {
            ...event,
            eventProps: {
              start: newStartDate,
              end: newEndDate,
              duration: newDuration,
            },
          };

          partedEvents.push(updatedEvent);

          remainingDuration -= newDuration;

          eventStart.setDate(eventStart.getDate() + newDuration);
        }
      } else {
        targetEvents.push({
          ...event,
          eventProps: {
            start: eventStart,
            end: eventEnd,
            duration: eventDuration,
          },
        });
      }
    });

    const eventHoliday = [...targetEvents, ...partedEvents].map((event) => {
      const {
        extendedProps: { name },
      } = event;

      if (!isExceptionalLeave(name)) return event;

      return this.adjustEventDate(event);
    });

    const finalHoliday = eventHoliday.filter((event) => {
      const {
        eventProps: { start, end },
        extendedProps: { name, status },
      } = event;

      const leaveStatus = status?.toLowerCase() ?? '';

      return (
        !(isExceptionalLeave(name) && isWeekend(start) && isWeekend(end))
        && (!leaveStatus || isExceptionalLeaveStatus(leaveStatus))
      );
    });

    const sortedHolidayList = finalHoliday.sort((a, b) => {
      if (a.start !== b.start) return a.start < b.start ? -1 : 1;
      return a.eventProps.start < b.eventProps.start ? -1 : 1;
    });

    return sortedHolidayList;
  }

  generateCalendar(date: Date): void {
    this.days = [];
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const pastMonthLastDay = new Date(date.getFullYear(), date.getMonth(), 0);

    for (let i = 0; i < firstDay.getDay(); i += 1) {
      const previousMonthDay = new Date(
        date.getFullYear(),
        date.getMonth() - 1,
        pastMonthLastDay.getDate() - i,
      );

      this.days.unshift({
        date: previousMonthDay,
        events: [],
        isSelected: false,
        isCurrentMonth: false,
      });
    }

    for (let i = 1; i <= lastDay.getDate(); i += 1) {
      const currentDay = new Date(date.getFullYear(), date.getMonth(), i);
      const today = new Date();

      this.days.push({
        date: currentDay,
        events: [],
        isSelected:
          currentDay.getDate() === today.getDate()
          && currentDay.getMonth() === today.getMonth()
          && currentDay.getFullYear() === today.getFullYear(),
        isCurrentMonth: true,
      });
    }

    const nextMonthFiller = this.days.length;

    for (let i = 1; i <= 42 - nextMonthFiller; i += 1) {
      const nextMonthDay = new Date(date.getFullYear(), date.getMonth() + 1, i);

      this.days.push({
        date: nextMonthDay,
        events: [],
        isSelected: false,
        isCurrentMonth: false,
      });
    }

    this.populateEvents();
  }

  getTargetEvents(date: Date): EventHolidayData[] {
    const targetDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60 * 1000,
    );

    const targetEvents = this.eventHolidayData.filter((event) => {
      const {
        eventProps: { start, end },
        extendedProps: { name },
      } = event;

      if (isExceptionalLeave(name) && isWeekend(start) && isWeekend(end)) {
        return false;
      }

      return (
        start.getTime() <= targetDate.getTime()
        && end.getTime() >= targetDate.getTime()
      );
    });

    return targetEvents;
  }

  populateEvents() {
    this.dateEventMap = new Map();

    for (const day of this.days) {
      const date = getDateGMT(day.date);

      const targetEvents = this.getTargetEvents(date);

      this.dateEventMap.set(date.toLocaleDateString(), targetEvents);
    }
  }

  previousMonth(): void {
    this.currentDate.setDate(1);

    this.currentDate.setMonth(this.currentDate.getMonth() - 1);

    this.generateCalendar(this.currentDate);

    this.getSelectedDate.emit(this.currentDate);
  }

  nextMonth(): void {
    this.currentDate.setDate(1);

    this.currentDate.setMonth(this.currentDate.getMonth() + 1);

    this.generateCalendar(this.currentDate);

    this.getSelectedDate.emit(this.currentDate);
  }
}
