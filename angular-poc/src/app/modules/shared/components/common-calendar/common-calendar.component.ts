import {
  Component, EventEmitter, Input, OnInit, Output,
} from '@angular/core';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { FormGroup } from '@angular/forms';
import { Platform } from '@angular/cdk/platform';
import { DateFormatAdapter } from '../../directives/calendar-adapter.component';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-common-calendar',
  templateUrl: './common-calendar.component.html',
  styleUrls: ['./common-calendar.component.scss'],
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      useFactory: provideDateLocale,
      deps: [CommonService],
    },
    {
      provide: DateAdapter,
      useClass: DateFormatAdapter,
      deps: [MAT_DATE_LOCALE, Platform],
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: { display: { dateInput: 'input' } },
    },
  ],
})
export class CommonCalendarComponent implements OnInit {
  constructor(private commonService: CommonService) {}

  @Output() dateValueChanged = new EventEmitter<any>();

  @Input() applyLeaveForm!: FormGroup;

  @Input() calenderTitle!: string;

  @Input() locale!: string;

  @Input() isrequired!: boolean;

  @Input() customFormControlName!: string;

  @Input() minimumDate: Date | null = null;

  datePlaceholder: string;

  ngOnInit(): void {
    if (this.commonService.isLoggedInEmpFromIndia()) {
      this.datePlaceholder = 'dd/mm/yyyy';
    } else {
      /* Default for other countries */
      this.datePlaceholder = 'mm/dd/yyyy';
    }
  }

  onDateValueChange(event: any) {
    setTimeout(() => {
      this.dateValueChanged.emit(event);
    });
  }
}

/* Function to provide dynamic locale which we need in the adapter file */
export function provideDateLocale(commonService: CommonService) {
  return commonService.isLoggedInEmpFromIndia() ? 'en-IN' : 'en-US';
}
