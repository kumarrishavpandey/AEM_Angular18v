export const timezoneData = {
  Version: '2019a',
  ReferenceUtcTimestamp: '2019-06-17T22:16:59.0765556Z',
  TimeZones: [
    {
      Id: 'America/Los_Angeles',
      Aliases: [
        'US/Pacific',
        'US/Pacific-New',
      ],
      Countries: [
        {
          Name: 'United States',
          Code: 'US',
        },
      ],
      Names: {
        ISO6391LanguageCode: 'en',
        Generic: 'Pacific Time',
        Standard: 'Pacific Standard Time',
        Daylight: 'Pacific Daylight Time',
      },
      ReferenceTime: {
        Tag: 'PDT',
        StandardOffset: '-08:00:00',
        DaylightSavings: '01:00:00',
        WallTime: '2019-06-17T15:16:59.0765556-07:00',
        PosixTzValidYear: 2019,
        PosixTz: 'PST+8PDT,M3.2.0,M11.1.0',
        Sunrise: '2019-06-17T05:12:21.267-07:00',
        Sunset: '2019-06-17T21:05:18.017-07:00',
      },
      RepresentativePoint: {
        Latitude: 34.05222222222222,
        Longitude: -118.24277777777777,
      },
      TimeTransitions: [
        {
          Tag: 'PDT',
          StandardOffset: '-08:00:00',
          DaylightSavings: '01:00:00',
          UtcStart: '2019-03-10T10:00:00Z',
          UtcEnd: '2019-11-03T09:00:00Z',
        },
        {
          Tag: 'PST',
          StandardOffset: '-08:00:00',
          DaylightSavings: '00:00:00',
          UtcStart: '2019-11-03T09:00:00Z',
          UtcEnd: '2020-03-08T10:00:00Z',
        },
        {
          Tag: 'PDT',
          StandardOffset: '-08:00:00',
          DaylightSavings: '01:00:00',
          UtcStart: '2020-03-08T10:00:00Z',
          UtcEnd: '2020-11-01T09:00:00Z',
        },
      ],
    },
  ],
};
