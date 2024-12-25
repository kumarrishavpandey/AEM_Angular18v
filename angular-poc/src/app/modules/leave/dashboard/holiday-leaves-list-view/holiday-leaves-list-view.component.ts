import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

import { HolidayLeaveCommonComponent } from '../../leave-constant';
import { CommonService } from '../../../shared/services/common.service';
import { LeaveHolidayData } from '../../../shared/ai-calendar/interface/holiday-calendar/leave-holiday.interface';
import { getDateGMT } from '../../../shared/ai-calendar/utility';

@Component({
  selector: 'app-holiday-leaves-list-view',
  templateUrl: './holiday-leaves-list-view.component.html',
  styleUrls: ['./holiday-leaves-list-view.component.scss'],
})
export class HolidayLeavesListViewComponent implements OnInit, OnChanges {
  @Input()
  currentDate: Date;

  @Input()
  upcomingHolidayLeavesList: LeaveHolidayData[];

  @Output()
  getSelectedDate = new EventEmitter<Date>();

  currentMonth: string;

  constantData = HolidayLeaveCommonComponent;

  numericMonth: string;

  holidayLeaveList = [];

  holidayCalendarDateFormat: string;

  @Input() dashboardLabels: any;

  constructor(private commonService: CommonService) {
    this.currentDate = getDateGMT(this.currentDate || new Date());
  }

  ngOnInit() {
    this.commonService.getDateFormat().subscribe((data) => {
      this.holidayCalendarDateFormat = data?.holidayCalendar;
    });

    this.updateSelectionData();

    this.getHolidayLeavesByMonth();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.upcomingHolidayLeavesList) {
      this.getHolidayLeavesByMonth();
    }
  }

  updateSelectionData() {
    this.currentMonth = this.currentDate.toLocaleString('default', {
      month: 'long',
      year: 'numeric',
    });

    this.numericMonth = (this.currentDate.getMonth() + 1)
      .toString()
      .padStart(2, '0');
  }

  // Get next month leaves and holdia
  getNextMonth() {
    this.currentDate.setDate(1);

    this.currentDate.setMonth(this.currentDate.getMonth() + 1);

    this.updateSelectionData();

    this.getHolidayLeavesByMonth();

    this.getSelectedDate.emit(this.currentDate);
  }

  getPreviousMonth() {
    this.currentDate.setDate(1);

    this.currentDate.setMonth(this.currentDate.getMonth() - 1);

    this.updateSelectionData();

    this.getHolidayLeavesByMonth();

    this.getSelectedDate.emit(this.currentDate);
  }

  // Filter leaves and holiday list by month
  getHolidayLeavesByMonth() {
    this.holidayLeaveList = [];

    this.holidayLeaveList = this.upcomingHolidayLeavesList.filter((event) => {
      const startDate = getDateGMT(new Date(event.start));

      const endDate = getDateGMT(new Date(event.end));

      startDate.setUTCHours(0, 0, 0, 0);
      endDate.setUTCHours(23, 59, 59, 999);

      if (
        startDate.getUTCFullYear() <= this.currentDate.getUTCFullYear()
        && endDate.getUTCFullYear() >= this.currentDate.getUTCFullYear()
        && startDate.getUTCMonth() <= this.currentDate.getUTCMonth()
        && endDate.getUTCMonth() >= this.currentDate.getUTCMonth()
      ) {
        return event;
      }
      return false;
    });

    this.holidayLeaveList.sort((a, b) => {
      const startDateA = getDateGMT(new Date(a.start)).getTime();
      const startDateB = getDateGMT(new Date(b.start)).getTime();
      return startDateA - startDateB;
    });
  }

  getLeaveStatus(event) {
    const status = event.extendedProps?.status || 'holiday';
    return status.replace(' ', '-').toLowerCase();
  }

  getEventIconType(event): string {
    if ('status' in event.extendedProps) {
      const leaveType = event.title;
      let leaveName = event.extendedProps.name;

      if (leaveType.toLowerCase() === 'leave') {
        leaveName = leaveName.toLowerCase().replace(' leave', '');
      }

      return leaveName.toLowerCase();
    }

    return 'all day';
  }
}
