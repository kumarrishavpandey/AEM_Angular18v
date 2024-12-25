import { TestBed } from '@angular/core/testing';
import { SanitizedHtmlPipe } from './sanitized-html.pipe';

describe('SanitizedHtmlPipe', () => {
  let pipe: SanitizedHtmlPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SanitizedHtmlPipe],
    });

    pipe = TestBed.inject(SanitizedHtmlPipe);
  });

  it('returns an empty string for null input', () => {
    const result = pipe.transform(null);
    expect(result).toBe('');
  });
});
