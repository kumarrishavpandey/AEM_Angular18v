
export const DAY_TO_MILLISECONDS = 1000 * 60 * 60 * 24;

export const monthFullName = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const monthShortName = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const weekShortName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export enum DeviceBreakpoint {
  SM = 575,
  MD = 768,
  LG = 992,
  XL = 1200,
  XXL = 1400,
}

export enum DeviceType {
  MOBILE = 'mobile',
  TABLET = 'tablet',
  DESKTOP = 'desktop',
}

export enum AnalyticsEvent {
  PAGE_LOAD = 'pageLoaded',
  CLICK = 'click',
  FORM_START = 'formStart',
  FORM_COMPLETE = 'formComplete',
  FORM_ERROR = 'formError',
  API_ERROR = 'apiError',
  ERROR = 'error',
}

export enum UserPersona {
  GENERAL = 'General',
  PILOT = 'Pilot',
  CABIN_CREW = 'Cabin Crew',
}

export const mimeTypesJson = {
  pdf: 'application/pdf',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  png: 'image/png',
  gif: 'image/gif',
  txt: 'text/plain',
  html: 'text/html',
  css: 'text/css',
  js: 'application/javascript',
  json: 'application/json',
  xml: 'application/xml',
  // Add more mappings as needed
};

export enum HeaderSize {
  H1 = 1,
  H2 = 2,
  H3 = 3,
  H4 = 4,
  H5 = 5,
  H6 = 6,
  SM = 7,
  XS = 8,
}

export enum TripStatus {
  labelAvailability = 'labelAvailability',
  labelWaitlisted = 'labelWaitlisted',
  labelPartiallyStandby = 'labelPartiallyStandby',
  labelStandby = 'labelStandby',
  labelPartiallyAccepted = 'labelPartiallyAccepted',
  labelAccepted = 'labelAccepted',
  labelNotAccepted = 'labelNotAccepted',
  labelPartiallyConfirmed = 'labelPartiallyConfirmed',
  labelConfirmed = 'labelConfirmed',
  labelNotTravelled = 'labelNotTravelled',
}

export enum TripStaffTravel {
  labelSOL = 'labelSOL',
  labelSOD = 'labelSOD',
}

export enum TripType {
  labelTripTypeRound = 'labelTripTypeRound',
  labelTripTypeOneway = 'labelTripTypeOneway',
}

export enum TripSeatClass {
  labelFirstClass = 'labelFirstClass',
  labelBusinessClass = 'labelBusinessClass',
  labelPremiumEconomyClass = 'labelPremiumEconomyClass',
  labelEconomyClass = 'labelEconomyClass',
}

export const AnalyticsInfoData = {
  countryCode: 'in',
  countryName: 'India',
  language: 'en',
  pageName: 'myAI | Page Name',
  pageType: 'AEM',
  server: 'airindia.com',
  siteName: 'myAI',
};

export enum AnalyticsComponent {
  BANNER = 'Banner',
  BUTTON = 'Button',
  CARD = 'Card',
  LINK = 'Link',
  TAB = 'Tab',
  CHECKBOX = 'Checkbox',
}

export const UniformDistributionData = {
  pageTitle: 'Request Uniform',
  labelHome: 'Home',
  linkHome: '/content/my-ai/in/en/home.html',
};

export enum EmploymentType {
  AI = 'AI',
  VISTARA = 'Vistara',
}
