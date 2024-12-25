import { TestBed } from '@angular/core/testing';
import { OrdinalDateForUsPipe } from './ordinal-date-for-us.pipe';

describe('OrdinalDateForUsPipe', () => {
  let pipe: OrdinalDateForUsPipe;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrdinalDateForUsPipe],
    });
    pipe = TestBed.inject(OrdinalDateForUsPipe);
  });
  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return formatted date string', () => {
    const date = new Date('2024-03-28');
    expect(pipe.transform(date)).toBe('Mar 28th 2024');
  });
});
