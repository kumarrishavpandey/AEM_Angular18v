import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeviceType } from 'src/app/shared/constants';
import { CalendarCellComponent } from './calendar-cell.component';

import { isCurrentMonth, isMobile, isToday } from '../../utility';
import { EventHolidayData } from '../../interface/holiday-calendar/event-holiday.interface';

describe('CalendarCellComponent', () => {
  let component: CalendarCellComponent;
  let fixture: ComponentFixture<CalendarCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalendarCellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarCellComponent);
    component = fixture.componentInstance;

    component.currentDate = new Date();
    component.date = new Date();
    component.dateEventMap = new Map<string, EventHolidayData[]>();
    component.deviceType = DeviceType.DESKTOP;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('showDialog', () => {
    it('should set isDialogVisible to true', () => {
      component.showDialog();
      expect(component.isDialogVisible).toBeTrue();
    });
  });

  describe('isCurrentDayEvent', () => {
    it('should return true if targetDate and eventDate are the same day', () => {
      const date = new Date();
      expect(component.isCurrentDayEvent(date, date)).toBeTrue();
    });

    it('should return false if targetDate and eventDate are different days', () => {
      const targetDate = new Date();
      const eventDate = new Date(targetDate.getTime() + 86400000); // +1 day
      expect(component.isCurrentDayEvent(targetDate, eventDate)).toBeFalse();
    });
  });

  describe('isCurrentMonth', () => {
    it('returns true if the date is in the current month', () => {
      const currentDate = new Date('2022-07-01T00:00:00.000Z');
      const date = new Date('2022-07-15T00:00:00.000Z');
      expect(isCurrentMonth(currentDate, date)).toBe(true);
    });

    it('returns false if the date is not in the current month', () => {
      const currentDate = new Date('2022-07-01T00:00:00.000Z');
      const date = new Date('2022-06-15T00:00:00.000Z');
      expect(isCurrentMonth(currentDate, date)).toBe(false);
    });

    it('returns false if the date is in the future month', () => {
      const currentDate = new Date('2022-07-01T00:00:00.000Z');
      const date = new Date('2022-08-15T00:00:00.000Z');
      expect(isCurrentMonth(currentDate, date)).toBe(false);
    });
  });

  describe('isMobile', () => {
    it('returns true if the device type is mobile', () => {
      component.deviceType = DeviceType.DESKTOP;
      const { deviceType } = component;
      expect(isMobile(deviceType)).toBe(false);
    });

    it('returns false if the device type is not mobile', () => {
      component.deviceType = DeviceType.MOBILE;
      const { deviceType } = component;
      expect(isMobile(deviceType)).toBe(true);
    });

    it('returns false if the device type is tablet', () => {
      component.deviceType = DeviceType.TABLET;
      const { deviceType } = component;
      expect(isMobile(deviceType)).toBe(false);
    });
  });
  describe('isToday', () => {
    it('returns true if the date is today', () => {
      const today = new Date();
      expect(isToday(today)).toBe(true);
    });

    it('returns false if the date is not today', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      expect(isToday(yesterday)).toBe(false);
    });
  });

  describe('getEventCount', () => {
    it('returns 0 if there are no events for the given date', () => {
      const date = new Date('2022-01-01');
      expect(component.getEventCount(date)).toBe(0);
    });
  });

  describe('getEvent', () => {
    it('should return holiday event when there is a holiday', () => {
      const date = new Date('2022-01-01');
      const formatedDate = date.toLocaleDateString();
      const event1: EventHolidayData = {
        title: 'My Leave',
        start: formatedDate,
        end: formatedDate,
        extendedProps: {
          name: 'Annual Leave',
          duration: '2 days',
          status: 'approved',
          month: 'January',
          day: '1',
        },
        eventProps: {
          start: date,
          end: date,
          duration: 2,
        },
      };
      spyOn(component, 'getEvent').and.returnValue(event1);

      const result = component.getEvent(date);

      expect(result).toEqual(event1);
    });
    it('should return leave event when there is a leave', () => {
      const date = new Date('2022-01-01');
      const formatedDate = date.toLocaleDateString();
      const event1: EventHolidayData = {
        title: 'My Leave',
        start: formatedDate,
        end: formatedDate,
        extendedProps: {
          name: 'Annual Leave',
          duration: '2 days',
          status: 'approved',
          month: 'January',
          day: '1',
        },
        eventProps: {
          start: date,
          end: date,
          duration: 2,
        },
      };
      event1.extendedProps.status = 'approved';
      spyOn(component, 'getEvent').and.returnValue(event1);
      const result = component.getEvent(date);

      expect(result).toEqual(event1);
    });

    it('should return empty object when no event exists for the date', () => {
      const date = new Date('2024-01-03');
      spyOn(component, 'getEvent').and.callThrough();

      const result = component.getEvent(date);

      expect(result).toEqual({} as EventHolidayData);
    });
  });

  describe('getMobileEvent', () => {
    it('should return the actual event if it exists and has a title', () => {
      const date = new Date('2022-01-01');
      const formatedDate = date.toLocaleDateString();

      const event1: EventHolidayData = {
        title: 'My Leave',
        start: formatedDate,
        end: formatedDate,
        extendedProps: {
          name: 'Annual Leave',
          duration: '2 days',
          status: 'approved',
          month: 'January',
          day: '1',
        },
        eventProps: {
          start: date,
          end: date,
          duration: 2,
        },
      };

      spyOn(component, 'getEvent').and.returnValue(event1);

      const result = component.getMobileEvent(date);

      expect(result).toEqual(event1);
    });
    it('should return the holiday event with the longest duration if no actual event exists', () => {
      const date = new Date('2022-01-01');
      const formatedDate = date.toLocaleDateString();
      const event1: EventHolidayData = {
        title: 'Holiday',
        start: formatedDate,
        end: formatedDate,
        extendedProps: {
          name: 'Holiday',
          duration: '2 days',
          month: 'January',
          day: '1',
        },
        eventProps: {
          start: date,
          end: date,
          duration: 2,
        },
      };

      spyOn(component, 'getEvent').and.returnValue({} as EventHolidayData);
      spyOn(component.dateEventMap, 'get').and.returnValue([event1]);

      const result = component.getMobileEvent(date);

      expect(result).toEqual(event1);
    });

    it('should return the leave event with the longest duration if no actual event exists and no holiday event is present', () => {
      const date = new Date('2022-01-01');
      const formatedDate = date.toLocaleDateString();
      const event1: EventHolidayData = {
        title: 'My Leave',
        start: formatedDate,
        end: formatedDate,
        extendedProps: {
          name: 'Annual Leave',
          duration: '2 days',
          status: 'approved',
          month: 'January',
          day: '1',
        },
        eventProps: {
          start: date,
          end: date,
          duration: 2,
        },
      };

      spyOn(component, 'getEvent').and.returnValue({} as EventHolidayData);
      spyOn(component.dateEventMap, 'get').and.returnValue([event1]);

      const result = component.getMobileEvent(date);

      expect(result).toEqual(event1);
    });

    it('should return an empty object when no event exists for the date', () => {
      const date = new Date('2024-01-03');
      spyOn(component, 'getEvent').and.returnValue({} as EventHolidayData);
      spyOn(component.dateEventMap, 'get').and.returnValue([]);

      const result = component.getMobileEvent(date);

      expect(result).toEqual({} as EventHolidayData);
    });
  });

  describe('getEvents', () => {
    it('should return an empty object when no event exists for the date', () => {
      const date = new Date('2024-01-03');

      spyOn(component, 'getEvent').and.returnValue({} as EventHolidayData);
      spyOn(component.dateEventMap, 'get').and.returnValue([]);

      const result = component.getMobileEvent(date);

      expect(result).toEqual({} as EventHolidayData);
    });
  });

  describe('renderMonthName', () => {
    it('should return true if the date is the first of the month and not mobile or not today', () => {
      spyOn(component.date, 'getDate').and.returnValue(1);
      spyOn(component, 'isMobile').and.returnValue(false);
      spyOn(component, 'isToday').and.returnValue(false);

      component.deviceType = DeviceType.DESKTOP;

      expect(component.renderMonthName()).toBeTrue();
    });
  });

  describe('renderDesktopEvent', () => {
    it('should return true if not on mobile and there are events on the date', () => {
      spyOn(component, 'isMobile').and.returnValue(false);
      spyOn(component, 'getEventCount').and.returnValue(1);
      expect(component.renderDesktopEvent()).toBeTrue();
    });
  });

  describe('renderMobileEvent', () => {
    it('should return true if on mobile and there are events on the date', () => {
      spyOn(component, 'isMobile').and.returnValue(true);
      spyOn(component, 'getEventsCount').and.returnValue(1);
      expect(component.renderMobileEvent()).toBeFalse();
    });
  });
});
