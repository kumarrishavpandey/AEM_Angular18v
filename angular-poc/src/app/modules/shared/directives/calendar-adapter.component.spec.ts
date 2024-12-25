import { TestBed } from '@angular/core/testing';
import {
  MAT_DATE_LOCALE,
  MAT_NATIVE_DATE_FORMATS,
  MatNativeDateModule,
  NativeDateModule,
} from '@angular/material/core';

import { DateFormatAdapter } from './calendar-adapter.component';

describe('DateFormatAdapter', () => {
  let dateAdapter: DateFormatAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NativeDateModule, MatNativeDateModule],
      providers: [
        DateFormatAdapter,
        { provide: MAT_DATE_LOCALE, useValue: 'en-US' },
        { provide: MAT_NATIVE_DATE_FORMATS, useValue: 'dd/MM/yyyy' },
      ],
    });

    dateAdapter = TestBed.inject(DateFormatAdapter);
  });

  it('should format date in "input" display format', () => {
    const testDate = new Date(2023, 0, 1); // January 1, 2023
    const formattedDate = dateAdapter.format(testDate, 'input');
    expect(formattedDate).toEqual('1/1/2023');
  });

  it('should format date in default display format', () => {
    const testDate = new Date(2023, 0, 1); // January 1, 2023
    const formattedDate = dateAdapter.format(testDate, {});
    expect(formattedDate).toEqual('Sun Jan 01 2023');
  });
});

describe('en-IN locale', () => {
  let dateAdapter: DateFormatAdapter;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NativeDateModule, MatNativeDateModule],
      providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-IN' },
        { provide: MAT_NATIVE_DATE_FORMATS, useValue: 'dd/MM/yyyy' }, DateFormatAdapter,
      ],
    });
    dateAdapter = TestBed.inject(DateFormatAdapter);
  });

  it('should format date in "input" display format for en-IN locale', () => {
    const testDate = new Date(2023, 0, 1); // January 1, 2023
    const formattedDate = dateAdapter.format(testDate, 'input');
    expect(formattedDate).toEqual('1/1/2023');
  });
});

describe('other locales', () => {
  let dateAdapter: DateFormatAdapter;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NativeDateModule, MatNativeDateModule],
      providers: [{ provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
        { provide: MAT_NATIVE_DATE_FORMATS, useValue: 'MM/dd/yyyy' }, DateFormatAdapter,
      ],
    });
    dateAdapter = TestBed.inject(DateFormatAdapter);
  });

  it('should format date in "input" display format for other locales (default to en-US)', () => {
    const testDate = new Date(2023, 0, 1); // January 1, 2023
    const formattedDate = dateAdapter.format(testDate, 'input');
    expect(formattedDate).toEqual('1/1/2023');
  });
});
