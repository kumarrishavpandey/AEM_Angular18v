import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { DeviceType } from 'src/app/shared/constants';
import { CalendarEventComponent } from './calendar-event.component';
import { EventHolidayData } from '../../interface/holiday-calendar/event-holiday.interface';

describe('CalendarEventComponent', () => {
  let component: CalendarEventComponent;
  let fixture: ComponentFixture<CalendarEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalendarEventComponent],
      imports: [MatIconModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarEventComponent);
    component = fixture.componentInstance;
    component.deviceType = DeviceType.MOBILE; // or DeviceType.Desktop, depending on what you want to test
    component.date = new Date();
    component.eventHolidayData = {
      extendedProps: {
        name: 'Sample Leave',
        status: 'approved',
      },
      eventProps: {
        duration: 8,
      },
      title: 'Leave',
    } as EventHolidayData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return correct event title', () => {
    const title = component.getEventTitle(component.eventHolidayData);
    expect(title).toBe('Sample Leave');
  });

  it('should return correct event icon type', () => {
    const iconType = component.getEventIconType(component.eventHolidayData);
    expect(iconType).toBe('sample');
  });

  it('should return correct event status', () => {
    const status = component.getEventStatus(component.eventHolidayData);
    expect(status).toBe('Approved');
  });

  it('should return correct leave status', () => {
    const leaveStatus = component.getLeaveStatus(component.eventHolidayData);
    expect(leaveStatus).toBe('approved');
  });

  it('should return correct event duration', () => {
    const duration = component.getEventDuration(component.eventHolidayData);
    expect(duration).toBe(8);
  });

  it('should return correct event tile width', () => {
    const tileWidth = component.getEventTileWidth(component.eventHolidayData);
    expect(tileWidth).toBe('799%');
  });
});
