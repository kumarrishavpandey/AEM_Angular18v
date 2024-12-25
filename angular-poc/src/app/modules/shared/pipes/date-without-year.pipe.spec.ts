import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { SharedModule } from '../shared.module';
import { DateWithoutYearPipe } from './date-without-year.pipe';

describe('DateWithoutYearPipe', () => {
  let pipe: DateWithoutYearPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AngularMaterialModule,
        SharedModule,
        HttpClientModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        BrowserModule,
      ],
      providers: [DateWithoutYearPipe],
    });
    pipe = TestBed.inject(DateWithoutYearPipe);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty string if input is falsy', () => {
    expect(pipe.transform(null)).toBe('');
    expect(pipe.transform(undefined)).toBe('');
    expect(pipe.transform('')).toBe('');
    expect(pipe.transform(0 as any)).toBe('');
  });

  it('should return formatted date without year for date string with time', () => {
    expect(pipe.transform('2024-03-28T12:00:00')).toBe('28th Mar');
  });

  it('should return empty string for invalid input', () => {
    expect(pipe.transform(null)).toEqual('');
    expect(pipe.transform(undefined)).toEqual('');
    expect(pipe.transform('')).toEqual('');
    expect(pipe.transform('123')).toEqual('');
  });

  it('should return formatted date without year', () => {
    expect(pipe.transform('2024-04-09T12:00:00')).toEqual('9th Apr');
    expect(pipe.transform('04-09')).toEqual('9th Apr');
  });

  it('should return an empty string if day is out of range', () => {
    const result = pipe.transform('01-32'); // Invalid day
    expect(result).toBe('');
  });

  it('should return an empty string if month is out of range', () => {
    const result = pipe.transform('13-15'); // Invalid month
    expect(result).toBe('');
  });

  it('should handle edge case dates correctly', () => {
    const result = pipe.transform('01-01'); // January 1st
    expect(result).toBe('1st Jan');
  });

  it('should return formatted date "Jul 17th" for "07-17" with "MMM DD" format', () => {
    const result = pipe.transform('07-17', 'MMM DD');
    expect(result).toBe('Jul 17th');
  });

  it('should return default formatted date if format is neither "DD MMM" nor "MMM DD"', () => {
    const result = pipe.transform('07-17', 'MM-DD');
    expect(result).toBe('Jul 17');
  });

  it('should handle different day suffixes', () => {
    expect(pipe.transform('2024-04-01T12:00:00')).toEqual('1st Apr');
    expect(pipe.transform('2024-04-02T12:00:00')).toEqual('2nd Apr');
    expect(pipe.transform('2024-04-03T12:00:00')).toEqual('3rd Apr');
    expect(pipe.transform('2024-04-04T12:00:00')).toEqual('4th Apr');
    expect(pipe.transform('2024-04-11T12:00:00')).toEqual('11th Apr');
    expect(pipe.transform('2024-04-12T12:00:00')).toEqual('12th Apr');
    expect(pipe.transform('2024-04-13T12:00:00')).toEqual('13th Apr');
    expect(pipe.transform('2024-04-21T12:00:00')).toEqual('21st Apr');
    expect(pipe.transform('2024-04-22T12:00:00')).toEqual('22nd Apr');
    expect(pipe.transform('2024-04-23T12:00:00')).toEqual('23rd Apr');
    expect(pipe.transform('2024-04-24T12:00:00')).toEqual('24th Apr');
    expect(pipe.transform('2024-04-25T12:00:00')).toEqual('25th Apr');
  });
});
