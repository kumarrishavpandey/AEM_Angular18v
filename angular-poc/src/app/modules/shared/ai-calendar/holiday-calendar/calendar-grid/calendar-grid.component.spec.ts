import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarCellComponent } from '../calendar-cell/calendar-cell.component';
import { CalendarGridComponent } from './calendar-grid.component';

describe('CalendarGridComponent', () => {
  let component: CalendarGridComponent;
  let fixture: ComponentFixture<CalendarGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CalendarGridComponent,
        CalendarCellComponent,
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
