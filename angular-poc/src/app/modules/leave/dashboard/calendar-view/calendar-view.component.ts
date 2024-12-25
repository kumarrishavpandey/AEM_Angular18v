import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.scss'],
})
export class CalendarViewComponent {
  @Input()
  selectedCalendarDate: Date;

  @Input()
  upcomingHolidayLeavesList: any[];

  @Output()
  getSelectedDate = new EventEmitter<Date|any>();

  @Input() dashboardLabels: any;
}
