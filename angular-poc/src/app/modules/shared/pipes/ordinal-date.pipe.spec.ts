import { TestBed } from '@angular/core/testing';
import { OrdinalDatePipe } from './ordinal-date.pipe';

describe('OrdinalDatePipe', () => {
  let ordinalDatePipe: OrdinalDatePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrdinalDatePipe],
    });

    ordinalDatePipe = TestBed.inject(OrdinalDatePipe);
  });

  it('should create an instance', () => {
    expect(ordinalDatePipe).toBeTruthy();
  });

  it('should transform a valid date into the expected format', () => {
    const date = new Date('2022-01-15');
    const result = ordinalDatePipe.transform(date);
    expect(result).toBe('15th Jan 2022');
  });

  it('should handle falsy date input', () => {
    const result = ordinalDatePipe.transform(null);
    expect(result).toBe('');
  });
});
