import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { DeviceType } from '../../constants';
import { WindowService } from '../../services/window.service';
import { SharedModule } from '../../shared.module';
import { LeaveHolidayData } from '../interface/holiday-calendar/leave-holiday.interface';
import { CalendarGridComponent } from './calendar-grid/calendar-grid.component';
import { HolidayCalendarComponent } from './holiday-calendar.component';
import { HeaderToolbarComponent } from './header-toolbar/header-toolbar.component';

describe('HolidayCalendarComponent', () => {
  let component: HolidayCalendarComponent;
  let fixture: ComponentFixture<HolidayCalendarComponent>;
  let windowService: jasmine.SpyObj<WindowService>;

  const mockLeaveHoliday: LeaveHolidayData[] = [
    {
      start: '2024-06-01T00:00:00Z',
      end: '2024-06-02T00:00:00Z',
      extendedProps: {
        name: 'Mock Holiday',
        duration: '',
        month: '',
        day: '',
      },
      title: 'Holiday',
    },
  ];

  beforeEach(async () => {
    const windowServiceSpy = jasmine.createSpyObj('WindowService', [
      'getDeviceTypeByWindowWidth',
      'onResizeDeviceTypeByWindowWidth',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AngularMaterialModule,
        SharedModule,
        HttpClientModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        BrowserModule,
      ],
      declarations: [
        HolidayCalendarComponent,
        CalendarGridComponent,
        HeaderToolbarComponent,
      ],
      providers: [{ provide: WindowService, useValue: windowServiceSpy }],
    }).compileComponents();
    windowService = TestBed.inject(
      WindowService,
    ) as jasmine.SpyObj<WindowService>;
    windowService.getDeviceTypeByWindowWidth.and.returnValue(
      DeviceType.DESKTOP,
    );
    windowService.onResizeDeviceTypeByWindowWidth.and.returnValue(
      of(DeviceType.DESKTOP),
    );
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidayCalendarComponent);
    component = fixture.componentInstance;

    component.leaveHoliday = mockLeaveHoliday;
    component.currentDate = new Date('2024-06-01T00:00:00Z');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize correctly', () => {
    expect(component.deviceType).toEqual(DeviceType.DESKTOP);
    expect(component.eventHolidayData.length).toBeGreaterThan(0);
    expect(component.days.length).toBeGreaterThan(0);
  });

  it('should unsubscribe on destroy', () => {
    spyOn(component.resizeSubscription$, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.resizeSubscription$.unsubscribe).toHaveBeenCalled();
  });

  it('should generate calendar correctly', () => {
    const date = new Date('2024-06-01T00:00:00Z');
    component.generateCalendar(date);
    expect(component.days.length).toBe(42);
  });

  it('should populate events correctly', () => {
    component.populateEvents();
    expect(component.dateEventMap.size).toBeGreaterThan(0);
  });

  it('should navigate to previous month', () => {
    const previousMonthDate = new Date(component.currentDate);
    previousMonthDate.setMonth(previousMonthDate.getMonth() - 1);
    component.previousMonth();
    expect(component.currentDate.getMonth()).toBe(previousMonthDate.getMonth());
  });

  it('should navigate to next month', () => {
    const nextMonthDate = new Date(component.currentDate);
    nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
    component.nextMonth();
    expect(component.currentDate.getMonth()).toBe(nextMonthDate.getMonth());
  });

  it('should emit selected date on month navigation', () => {
    spyOn(component.getSelectedDate, 'emit');
    component.previousMonth();
    expect(component.getSelectedDate.emit).toHaveBeenCalled();
    component.nextMonth();
    expect(component.getSelectedDate.emit).toHaveBeenCalled();
  });
});
