import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { EventEmitter } from '@angular/core';
import { DialogBoxComponent } from './dialog-box.component';
import { EventHolidayData } from '../../interface/holiday-calendar/event-holiday.interface';
import { ExtendedProps } from '../../interface/holiday-calendar/extended-props.interface';

describe('DialogBoxComponent', () => {
  let component: DialogBoxComponent;
  let fixture: ComponentFixture<DialogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogBoxComponent],
      imports: [MatIconModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBoxComponent);
    component = fixture.componentInstance;
    component.date = new Date();
    component.eventHolidayData = [];
    component.isDialogVisible = true;
    component.isDialogVisibleChange = new EventEmitter<boolean>();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit false when closeDialog is called', () => {
    spyOn(component.isDialogVisibleChange, 'emit');
    const event = new MouseEvent('click');
    component.closeDialog(event);
    expect(component.isDialogVisibleChange.emit).toHaveBeenCalledWith(false);
  });

  it('should stop propagation and prevent default when handleDialogClick is called', () => {
    const event = new MouseEvent('click');
    spyOn(event, 'stopPropagation');
    spyOn(event, 'preventDefault');
    component.handleDialogClick(event);
    expect(event.stopPropagation).toHaveBeenCalled();
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should return formatted date string from getDateString', () => {
    const dateStr = '2023-12-25T00:00:00Z';
    const formattedDate = component.getDateString(dateStr);
    expect(formattedDate).toBe(new Date(dateStr).toDateString());
  });

  it('should return event title from getEventTitle', () => {
    const event: EventHolidayData = {
      extendedProps: {
        name: 'Christmas Leave',
        status: 'approved',
      } as ExtendedProps,
      title: 'leave',
      eventProps: undefined,
      start: '',
      end: '',
    };
    spyOn(component, 'getEventTitle').and.callThrough();
    const title = component.getEventTitle(event);
    expect(title).toBe('Christmas Leave');
  });

  it('should return status from getStatus', () => {
    const extendedProps: ExtendedProps = {
      status: 'approved',
      name: '',
      duration: '',
      month: '',
      day: '',
    };
    const status = component.getStatus(extendedProps);
    expect(status).toBe('approved');
  });

  it('should return formatted event status from getEventStatus', () => {
    const event: EventHolidayData = {
      extendedProps: { status: 'approved' } as ExtendedProps,
      title: '',
      eventProps: undefined,
      start: '',
      end: '',
    };
    const eventStatus = component.getEventStatus(event);
    expect(eventStatus).toBe('Approved');
  });

  it('should return formatted leave status from getLeaveStatus', () => {
    const event: EventHolidayData = {
      extendedProps: { status: 'approved' } as ExtendedProps,
      title: '',
      eventProps: undefined,
      start: '',
      end: '',
    };
    const leaveStatus = component.getLeaveStatus(event);
    expect(leaveStatus).toBe('approved');
  });

  it('should return event content from getEventContent', () => {
    const event: EventHolidayData = {
      extendedProps: { status: 'approved' } as ExtendedProps,
      title: '',
      eventProps: undefined,
      start: '',
      end: '',
    };
    const eventContent = component.getEventContent(event);
    expect(eventContent).toBe('Approved');
  });

  it('should return event duration from getEventDuration', () => {
    const event: EventHolidayData = {
      extendedProps: { duration: '2' } as ExtendedProps,
      title: '',
      eventProps: undefined,
      start: '',
      end: '',
    };
    const eventDuration = component.getEventDuration(event);
    expect(eventDuration).toBe('(2 days)');
  });

  it('should return empty string if duration is not valid in getEventDuration', () => {
    const event: EventHolidayData = {
      extendedProps: { duration: 'invalid' } as ExtendedProps,
      title: '',
      eventProps: undefined,
      start: '',
      end: '',
    };
    const eventDuration = component.getEventDuration(event);
    expect(eventDuration).toBe('');
  });
});
