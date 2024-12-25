import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarGridComponent } from 'src/app/shared/ai-calendar/holiday-calendar/calendar-grid/calendar-grid.component';
import { HeaderToolbarComponent } from 'src/app/shared/ai-calendar/holiday-calendar/header-toolbar/header-toolbar.component';
import { HolidayCalendarComponent } from 'src/app/shared/ai-calendar/holiday-calendar/holiday-calendar.component';
import { CalendarViewComponent } from './calendar-view.component';

describe('CalendarViewComponent', () => {
  let component: CalendarViewComponent;
  let fixture: ComponentFixture<CalendarViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CalendarViewComponent,
        HolidayCalendarComponent,
        HeaderToolbarComponent,
        CalendarGridComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarViewComponent);
    component = fixture.componentInstance;
    component.selectedCalendarDate = new Date();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
