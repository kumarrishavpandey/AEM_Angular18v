import { TestBed } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { DateFormatPipe } from './date-format.pipe';

describe('DateFormatPipe', () => {
  let pipe: DateFormatPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatePipe, DateFormatPipe],
    });
    pipe = TestBed.inject(DateFormatPipe);
  });

  it('transforms date to the specified format', () => {
    const inputDate = '2023-01-01T12:34:56.789Z';
    const expectedOutput = '01-Jan-2023';

    const result = pipe.transform(inputDate);

    expect(result).toEqual(expectedOutput);
  });
});
