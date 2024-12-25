import { DatePipe } from '@angular/common';
import { FormGroup, ValidatorFn } from '@angular/forms';
import CountryList from 'country-list-with-dial-code-and-flag';
import {
  restrictedUrlsForPilotsAndCabinCrew,
  restrictedUrlsForUS,
} from '../app/app.constant';
import { environment } from '../environments/environment';
import { AnchorTagTarget } from '../app/modules/shared/components/anchor-tag/anchor-tag.enum';
// import { SuccessModalComponent } from 'src/app/modules/service-now/components/success-modal/success-modal.component';
// import { AnchorTagTarget } from 'src/app/shared/components/anchor-tag/anchor-tag.enum';
// import { CommonWarningDialogWithButtonsComponent } from 'src/app/shared/components/common-warning-dialog-with-buttons/common-warning-dialog-with-buttons.component';
// import { environment } from 'src/environments/environment';

export const showSuccessModal = (object, message) => {
  // object.dialog.open(SuccessModalComponent, {
  //   data: {
  //     label: {
  //       success: 'Success!',
  //       msg: message,
  //     },
  //     showHeaderCloseButton: false,
  //     showActionButton: false,
  //   },
  //   autoFocus: false,
  //   disableClose: true,
  // });
};

export const showDeleteModal = (object, deleteHandler: Function) => {
  // const dialogRef = object.dialog.open(
  //   CommonWarningDialogWithButtonsComponent,
  //   {
  //     data: {
  //       warningInfo: {
  //         title: 'Delete Bid',
  //         message: 'Are you sure you want to delete your bid?',
  //         buttonText: 'Yes, delete this bid',
  //       },
  //     },
  //     autoFocus: false,
  //     disableClose: true,
  //   },
  // );

  // dialogRef.afterClosed().subscribe((result) => {
  //   const { flag } = result.data;

  //   if (flag === true) {
  //     deleteHandler();
  //   }
  // });
};

export const closeDialog = (object) => {
  object.dialog.closeAll();
};

export const closeDialogWithDelay = (object) => {
  setTimeout(() => {
    closeDialog(object);
  }, 3000);
};

export const getInitials = (firstName: string, lastName: string) => {
  // Get the first character of each name and concatenate them
  const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : '';
  const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : '';

  return `${firstInitial}${lastInitial}`;
};

/* Function which help us to find on which device or browser client opened the application. */
export const checkDevice = () => {
  const { userAgent } = navigator;
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(
      userAgent,
    )
  ) {
    return 'Mobile';
  }
  if (/Chrome/i.test(userAgent)) {
    return 'Chrome';
  }
  return 'Desktop';
};

export const isIpadDevice = (): boolean => /iPad/i.test(navigator.userAgent);

export const isMobileDevice = (): boolean => window.innerWidth < 768
  && /iPhone|IEMobile|Mobile|mobile/i.test(navigator.userAgent);

export const isDesktopDevice = (): boolean => !(isIpadDevice() || isMobileDevice());

/* Function to get location co-ordinates of user */
export const getUserLocationCoordintes = () => {
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(pos) {
    const crd = pos.coords;
    const lat = crd.latitude.toString();
    const lng = crd.longitude.toString();
    const coordinates = [lat, lng];
    return coordinates;
  }

  function error(err) {
    return err;
  }

  navigator.geolocation.getCurrentPosition(success, error, options);
};
// Function which help us to find number of days, months, and years between two different dates
export const daysMonthsAndYearsBetweenTwoDates = (startDate, endDate) => {
  const oneDayMs = 1000 * 60 * 60 * 24;
  const diffMs = endDate.getTime() - startDate.getTime();
  const diffDays = Math.floor(diffMs / oneDayMs);
  const years = Math.floor(diffDays / 365);
  const months = Math.floor(diffDays / 30.44) % 12;
  const days = diffDays - years * 365 - Math.floor(months * 30.44);
  return { years, months, days };
};

export const calculateDuration = (startDate, endDate) => {
  const fromDate = new Date(startDate);
  const toDate = new Date(endDate);
  const obj = daysMonthsAndYearsBetweenTwoDates(fromDate, toDate);
  if (obj.years === 1 && obj.months < 1) {
    return '1 year';
  }
  if (obj.years > 0 && obj.months > 0) {
    return `${obj.years}.${obj.months} years`;
  }
  if (obj.months === 1 && obj.years < 1) {
    return '1 month';
  }
  if (obj.months > 1 && obj.years < 1) {
    return `${obj.months} months`;
  }
  return '';
};

/* function to convert base64 to blob - (Help base64 to use as pdf file) */
export const base64ToBlob = (base64: string, mimeType: string): Blob => {
  const binaryString = window.atob(base64);
  const binaryLen = binaryString.length;
  const bytes = new Uint8Array(binaryLen);
  for (let i = 0; i < binaryLen; i += 1) {
    const ascii = binaryString.charCodeAt(i);
    bytes[i] = ascii;
  }
  const blob = new Blob([bytes], { type: mimeType });
  return blob;
};

/* Convert a file to base64 - This is an async call so either use async await or .then to resolve this where ever you call */
export const fileToBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = reject;
});

export const padTwoDigits = (num: number): string => num.toString().padStart(2, '0');

/* Function to convert new Date()  format to the format used in API */
/* While sending to API */
export const dateInYyyyMmDdHhMmSs = (date) => {
  if (date) {
    const dateObj = new Date(date);

    return `${[
      dateObj.getFullYear(),
      padTwoDigits(dateObj.getMonth() + 1),
      padTwoDigits(dateObj.getDate()),
    ].join('-')} ${[
      padTwoDigits(dateObj.getHours()),
      padTwoDigits(dateObj.getMinutes()),
      padTwoDigits(dateObj.getSeconds()),
    ].join(':')}`;
  }
  return null;
};

export const dateInYyyyMmDd = (date) => {
  if (date) {
    const dateObj = new Date(date);

    return [
      dateObj?.getFullYear(),
      padTwoDigits(dateObj.getMonth() + 1),
      padTwoDigits(dateObj.getDate()),
    ].join('-');
  }
  return null;
};

/**
 * Replaces characters in the input text with asterisks if isChecked is true.
 * If isChecked is false, returns the original input text unchanged.
 */

export const maskInformation = (isChecked: boolean, text: string | number) => {
  if (isChecked && text !== null) {
    return String(text).replace(/./g, '*');
  }

  return isChecked ? '' : text;
};

export const calculateMonthDifference = (
  startDate: string,
  endDate: string,
) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const yearDiff = end.getFullYear() - start.getFullYear();
  const monthDiff = end.getMonth() - start.getMonth();
  const totalMonth = yearDiff * 12 + monthDiff;
  if (totalMonth > 12) {
    return `${yearDiff} years`;
  }
  return `${yearDiff * 12 + monthDiff} months`;
};

export const dateConversion = (date) => {
  const originalDate = new Date(date);
  const year = originalDate.getFullYear();
  const month = (originalDate.getMonth() + 1).toString().padStart(2, '0');
  const day = originalDate.getDate().toString().padStart(2, '0');
  const hours = originalDate.getHours().toString().padStart(2, '0');
  const minutes = originalDate.getMinutes().toString().padStart(2, '0');
  const seconds = originalDate.getSeconds().toString().padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const getDateRangeInString = (dateFrom, dateTo) => {
  const startDate = new Date(dateFrom);
  const endDate = new Date(dateTo);
  return `${startDate.toLocaleString('default', {
    month: 'short',
  })} ${startDate.getFullYear()} - ${endDate.toLocaleString('default', {
    month: 'short',
  })} ${endDate.getFullYear()}`;
};

export const objectLength = (obj: any) => (obj ? Object.keys(obj).length : 0);

export const apiErrorsFormatHandling = (input) => {
  let errorsInArray = [];
  let apiErrors = [];
  errorsInArray = input.split(';');

  /* RegEx to replace api error codes which are surrounded by [] */
  apiErrors = errorsInArray.map((err) => err.replace(/\[.*?\]s*/g, ''));

  /* eslint-disable no-restricted-globals */
  if (apiErrors.length > 0) {
    scroll(0, 0);
  }
  return apiErrors;
};

export const convertString = (input: string): string => {
  // Replace brackets with commas and ampersand
  const output = input.replace(/\[|\]/g, '').replace(/, /g, ' & ');
  return output;
};

export const getUTCTime = (date) => {
  const utcTime = new Date(
    new Date(date).toLocaleString('en', { timeZone: 'Europe/London' }),
  ).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return `${utcTime}(UTC)`;
};

export const getUTCDate = (date) => {
  const utcDate = new Date(
    new Date(date).toLocaleString('en', { timeZone: 'Europe/London' }),
  ).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  return utcDate;
};

export const abbreviateLocalTZ = (time) => {
  const index = time.indexOf('M ');
  const time12HrFormat = time.substring(0, index + 2);
  const timeZoneFullName = time.substring(index + 2);
  const timeZoneAbbr = timeZoneFullName.match(/\b([A-Z])/g).join('');
  const formatedTimeZone = `${time12HrFormat}${timeZoneAbbr}`;

  return formatedTimeZone;
};

export const dateFormat = (date: any, airport, timezone) => {
  const tz = timezone[airport];
  let dateStr;
  if (tz === undefined) {
    dateStr = getUTCDate(date);
  } else {
    dateStr = new Date(
      new Date(date).toLocaleString('en', { timeZone: tz }),
    ).toLocaleDateString('EN-IN', {
      month: 'short',
      day: 'numeric',
    });
  }
  return dateStr;
};

export const localTineWithTimezone = (date, timeZone) => {
  const time = new Intl.DateTimeFormat(['en'], {
    hour: '2-digit',
    minute: 'numeric',
    timeZone,
    timeZoneName: 'long',
  }).format(new Date(date));

  const timeFormat = abbreviateLocalTZ(time);
  return timeFormat;
};

export const timeFormat = (date: any, airport, timezone) => {
  const tz = timezone[airport];
  let timeStr;
  if (tz === undefined) {
    timeStr = getUTCTime(date);
  } else {
    // timeStr = new Date(new Date(date).toLocaleString('en', {timeZone: tz})).toLocaleTimeString([],{hour: '2-digit',minute: '2-digit'})
    timeStr = localTineWithTimezone(date, tz);
  }
  return timeStr;
};

export const calcDuration = (arrTime: any, depTime: any) => {
  const diff = new Date(arrTime).getTime() - new Date(depTime).getTime(); // this is a time in milliseconds
  const hrs = Math.floor(diff / 3600000);
  const min = Math.floor((diff - hrs * 3600000) / 60000);
  return `${hrs}h ${min}m`;
};

export const calculateDaysDifference = (startDate, endDate) => {
  if (startDate && endDate) {
    const date1 = new Date(startDate);
    const date2 = new Date(endDate);
    const timeDifference = date2.getTime() - date1.getTime();
    return timeDifference / (1000 * 60 * 60 * 24);
  }
  return null;
};

export const groupByKey = (array, key) => array.reduce((hash, obj) => {
  if (obj[key] === undefined) return hash;
  return Object.assign(hash, {
    [obj[key]]: (hash[obj[key]] || []).concat(obj),
  });
}, {});

export const getAemDamFullPath = (url: string) => environment.AEM_BASE_URL + url;

export const getNavBarDynamicImagePath = (name:string, extension:string):string => {
  let dynamicMediaURl = `${environment.DYNAMIC_MEDIA}${name}?fmt=${extension}`;
  dynamicMediaURl += '&wid=64&hei=64';
  return dynamicMediaURl;
};

export const getDynamicMediaPath = (url: string): string => {
  let dynamicMediaUrl = environment.DYNAMIC_MEDIA + url;

  if (!dynamicMediaUrl.includes('?')) {
    dynamicMediaUrl += '?';
  } else if (!dynamicMediaUrl.endsWith('&')) {
    dynamicMediaUrl += '&';
  }

  dynamicMediaUrl += 'fmt=webp&resMode=sharp2&qlt=85';

  return dynamicMediaUrl;
};

export const getEmployeeProfileEndpoint = (empId): string => getDynamicMediaPath(empId);

export const checkForUnauthorizedPage = (
  router,
  loggedInCountryCode,
  userPersona,
) => {
  if (
    (loggedInCountryCode === 'us'
      && restrictedUrlsForUS.some((url) => router.url.includes(url)))
    || ((userPersona === 'Pilots'
      || userPersona === 'Cabin Crew'
      || userPersona !== 'General')
      && restrictedUrlsForPilotsAndCabinCrew.some((url) => router.url.includes(url)))
  ) {
    router.navigate([
      `/content/my-ai/${loggedInCountryCode}/en/unauthorized.html`,
    ]);
  }
};

// Custom Validation check if startDate is less than endDate
export function startDateBeforeEndDateValidator(): ValidatorFn {
  return (formGroup: FormGroup): { [key: string]: any } | null => {
    const startDate = formGroup.get('startDate');
    const endDate = formGroup.get('endDate');
    if (startDate && endDate && startDate.value && endDate.value) {
      const start = new Date(startDate.value);
      const end = new Date(endDate.value);
      // Check if start date is greater than end date
      if (start > end) {
        // Return error if startDate is after endDate
        return { startDateAfterEndDate: true };
      }
    }
    return null; // Return null if no errors
  };
}

/**
 * Determines if the current device matches any of the specified device types based on the user agent.
 * @param deviceTypes Array of device type keywords to match against the user agent.
 * @returns True if the device matches any of the specified types, false otherwise.
 */

export function isIpad(devicetype: string | null | undefined): boolean {
  const lowerUserAgent = navigator.userAgent.toLowerCase();
  if (lowerUserAgent.includes(devicetype) && navigator.maxTouchPoints > 0) {
    return true;
  }
  return false;
}

export const isDeviceTypeMatch = (
  deviceType: string[] | null | undefined,
): boolean => {
  if (!deviceType) {
    return true; // Return trur if deviceType is null or undefined
  }
  return deviceType.some(
    (keyword) => isIpad(keyword.toLowerCase()), // Return true if deviceType and
  );
};

export function getFullCountryName(code) {
  if (code) {
    const countryCodeList: any = CountryList.getAll();
    const country = countryCodeList?.filter(
      (count) => count?.data?.code === code.toUpperCase(),
    )[0];
    const getFullNameContent = country?.data?.name;
    return getFullNameContent;
  }
  return '';
}

export const isWithin48Hrs = (depTime: any, curTime: any) => {
  const diff = new Date(depTime).getTime() - new Date(curTime).getTime(); // this is a time in milliseconds
  const hrs = diff / 3600000;
  if (hrs <= 48) {
    return true;
  }
  return false;
};

export const replaceSpaceWithHyphen = (value: string) => value.replace(/\s+/g, '-');

export const downloadBlobFile = (blob: Blob, data?: {
  target?: AnchorTagTarget;
  documentName?: string;
}) => {
  const link = document.createElement('a');
  const url = window.URL.createObjectURL(blob);
  link.href = url;

  if (data && data.target) {
    link.target = data.target;
  } else {
    link.target = AnchorTagTarget.BLANK;
  }

  if (data && data.documentName) {
    link.download = data.documentName;
  }

  document.body.appendChild(link);
  link.click();

  setTimeout(() => {
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }, 1000);
};

export const serializePayload = (payload) => {
  const params = [];

  for (const key in payload) {
    if (key in payload) {
      params.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(payload[key])}`,
      );
    }
  }

  return params.join('&');
};

export const toTitleCase = (str: string): string => str.replace(
  /\w\S*/g,
  (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
);

export const replaceSpacesWithHyphens = (label: string): string => label.replace(/ /g, '-');

export const convertToFixedTimeFormat = (dateString: string) => {
  let timePart;
  if (dateString?.split('T')[1]?.includes('-')) {
    timePart = dateString?.split('T')[1]?.split('-')[0];
  } else {
    timePart = dateString?.split('T')[1]?.split('+')[0];
  }
  return timePart?.replace('.', ':')?.replace(':00:000', '');
};

/* Function to check if device is iphone */
export const isIphone = () => {
  const { userAgent } = navigator;
  if (/iPhone/i.test(userAgent)) {
    return true;
  }
  return false;
};

export const getEmployeeFullName = (data: {
  firstName: string;
  middleName: string;
  lastName: string;
}): string => {
  const employeeName = [];

  if (data) {
    if (data.firstName) {
      employeeName.push(data.firstName);
    }

    if (data.middleName) {
      employeeName.push(data.middleName);
    }

    if (data.lastName) {
      employeeName.push(data.lastName);
    }
  }

  return employeeName.join(' ');
};

/**
 * Finds the exact or nearest matching date from a list of courses
 * @param courseList - List of courses with date properties
 * @param selectedDate - The date selected by the user
 * @param datePipe - An Angular DatePipe instance
 * @returns - The exact matching date or the closest date in the format 'dd MMM yyyy'
 */
export const findNearestDate = (
  courseList: any[],
  selectedDate: Date,
  datePipe: DatePipe,
): string | null => {
  const selectedDateStr = datePipe.transform(selectedDate, 'dd MMM yyyy');

  const exactMatch = courseList.find(
    (course) => datePipe.transform(course.date, 'dd MMM yyyy') === selectedDateStr,
  );

  if (exactMatch) {
    return selectedDateStr;
  }

  let nearestDateObject: Date | null = null;
  let minDiff = Number.MAX_SAFE_INTEGER;

  courseList.forEach((course) => {
    const courseDateObject = new Date(course.date);
    const diff = Math.abs(courseDateObject.getTime() - selectedDate.getTime());

    if (diff < minDiff) {
      minDiff = diff;
      nearestDateObject = courseDateObject;
    }
  });

  if (nearestDateObject) {
    return datePipe.transform(nearestDateObject, 'dd MMM yyyy');
  }

  return null;
};

/**
 * Scroll to a particular element with a given offset
 * @param element - The HTML element to scroll to
 * @param yOffset - Vertical offset to apply (default is -100)
 */
export const scrollToElement = (
  element: HTMLElement,
  yOffset: number = -100,
): void => {
  const rect = element.getBoundingClientRect();
  const y = rect.top + window.scrollY + yOffset;

  window.scrollTo({
    top: y,
    behavior: 'smooth',
  });
};

export const isValidDate = (date: string): boolean => !Number.isNaN(Date.parse(date));

export const formatFullName = (nameData : any) : string => {
  if (nameData.middleName && nameData.middleName.lenght) {
    return `${nameData.firstName} ${nameData.middleName} ${nameData.lastName}`;
  }

  return `${nameData.firstName} ${nameData.lastName}`;
};

export const deepMerge = (target: any, source: any): any => {
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object && key in target) {
      Object.assign(source[key], deepMerge(target[key], source[key]));
    }
  }

  Object.assign(target || {}, source);
  return target;
};
