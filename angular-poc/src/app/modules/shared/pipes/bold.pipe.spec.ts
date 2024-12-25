import { TestBed } from '@angular/core/testing';
import { BoldPipe } from './bold.pipe';

describe('BoldPipe', () => {
  let boldPipe: BoldPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BoldPipe],
    });

    boldPipe = TestBed.inject(BoldPipe);
  });

  it('should create an instance', () => {
    expect(boldPipe).toBeTruthy();
  });

  it('should transform the input string with bold tags around the search term', () => {
    const searchTerm = 'John';
    const firstName = 'John';
    const lastName = 'Doe';
    const email = 'john.doe@example.com';

    const result = boldPipe.transform(searchTerm, firstName, '', lastName, email);

    expect(result).toContain('<b>John</b>');
  });

  it('should return an empty string if the searchTerm is falsy', () => {
    const result = boldPipe.transform(
      '',
      'John',
      '',
      'Doe',
      'john.doe@example.com',
    );
    expect(result).toEqual('');
  });

  it('should return an empty string if all parameters are falsy', () => {
    const result = boldPipe.transform('', '', '', '', '');
    expect(result).toEqual('');
  });
});
