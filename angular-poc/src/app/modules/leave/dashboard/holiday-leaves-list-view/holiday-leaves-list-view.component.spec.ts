import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';
import { getDateGMT } from 'src/app/shared/ai-calendar/utility';
import { CommonService } from 'src/app/shared/services/common.service';
import { HolidayLeavesListViewComponent } from './holiday-leaves-list-view.component';

describe('HolidayLeavesListViewComponent', () => {
  let component: HolidayLeavesListViewComponent;
  let fixture: ComponentFixture<HolidayLeavesListViewComponent>;
  let commonService: jasmine.SpyObj<CommonService>;

  beforeEach(async () => {
    const commonServiceSpy = jasmine.createSpyObj('CommonService', [
      'getDateFormat',
    ]);

    await TestBed.configureTestingModule({
      declarations: [HolidayLeavesListViewComponent],
      imports: [MatIconModule],
      providers: [{ provide: CommonService, useValue: commonServiceSpy }],
      schemas: [NO_ERRORS_SCHEMA], // Ignore Angular Material errors
    }).compileComponents();

    fixture = TestBed.createComponent(HolidayLeavesListViewComponent);
    component = fixture.componentInstance;
    commonService = TestBed.inject(
      CommonService,
    ) as jasmine.SpyObj<CommonService>;

    commonService.getDateFormat.and.returnValue(
      of({ holidayCalendar: 'dd/MM/yyyy' }),
    );

    component.currentDate = getDateGMT(new Date('2023-07-04'));
    component.upcomingHolidayLeavesList = [
      {
        start: '2023-07-04',
        end: '2023-07-05',
        extendedProps: {
          name: 'test Leave',
          duration: 'string',
          status: 'string',
          month: 'string',
          day: 'string',
        },
        title: 'Holiday',
      },
      {
        start: '2023-08-01',
        end: '2023-08-02',
        extendedProps: {
          name: 'test Leave',
          duration: 'string',
          status: 'string',
          month: 'string',
          day: 'string',
        },
        title: 'Holiday',
      },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct date format', () => {
    component.ngOnInit();
    expect(component.holidayCalendarDateFormat).toBe('dd/MM/yyyy');
  });

  it('should update currentMonth and numericMonth correctly', () => {
    component.updateSelectionData();
    expect(component.currentMonth).toBe('July 2023');
    expect(component.numericMonth).toBe('07');
  });

  it('should get next month correctly', () => {
    spyOn(component.getSelectedDate, 'emit');
    component.getNextMonth();
    expect(component.currentDate.getMonth()).toBe(7); // August
    expect(component.getSelectedDate.emit).toHaveBeenCalledWith(
      component.currentDate,
    );
  });

  it('should get previous month correctly', () => {
    spyOn(component.getSelectedDate, 'emit');
    component.getPreviousMonth();
    expect(component.currentDate.getMonth()).toBe(5); // June
    expect(component.getSelectedDate.emit).toHaveBeenCalledWith(
      component.currentDate,
    );
  });

  it('should filter holiday leaves by month correctly', () => {
    component.getHolidayLeavesByMonth();
    expect(component.holidayLeaveList.length).toBe(1);
    expect(component.holidayLeaveList[0].start).toBe('2023-07-04');
  });

  it('should return correct leave status', () => {
    const event = { extendedProps: { status: 'Sick Leave' } };
    const status = component.getLeaveStatus(event);
    expect(status).toBe('sick-leave');
  });

  it('should return correct event icon type', () => {
    const event = {
      title: 'Leave',
      extendedProps: { name: 'Sick Leave' },
    };
    const iconType = component.getEventIconType(event);
    expect(iconType).toBe('all day');
  });
});
