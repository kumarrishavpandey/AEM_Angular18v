import { DAY_TO_MILLISECONDS, DeviceType } from '../constants';

export const getDaysBetweenDates = (startDate: Date, endDate: Date): number => {
  if (!startDate || !endDate || !(startDate instanceof Date) || !(endDate instanceof Date)) {
    return null;
  }

  const timeDifference = endDate.getTime() - startDate.getTime();

  const days = Math.floor(timeDifference / DAY_TO_MILLISECONDS);

  return days + 1;
};

export const getDateGMT = (date: Date): Date => {
  const timezoneOffset = date.getTimezoneOffset();
  const minutes = timezoneOffset % 60;
  const hours = (timezoneOffset - minutes) / 60;
  const newTimezoneOffset = ((hours + 5) * 60) + (minutes + 30);
  const dateGMT = new Date(date.getTime() + (newTimezoneOffset * 60000));
  return dateGMT;
};

export const isCurrentMonth = (currentDate: Date, targetDate: Date): boolean => (targetDate.getMonth() === currentDate.getMonth() && targetDate.getFullYear() === currentDate.getFullYear());

export const isExceptionalLeave = (leaveName: string): boolean => {
  const exceptionalLeaves = ['casual leave', 'privilege leave', 'sick leave'];

  return exceptionalLeaves.includes(leaveName.toLowerCase());
};

export const isExceptionalLeaveStatus = (leaveStatus: string): boolean => {
  const exceptionalLeaveStatus = ['pending', 'approved', 'pending_cancellation'];

  return exceptionalLeaveStatus.includes(leaveStatus);
};

export const isMobile = (deviceType: DeviceType): boolean => deviceType === DeviceType.MOBILE;

export const isToday = (date: Date): boolean => {
  const today = getDateGMT(new Date());

  return (
    date.getDate() === today.getDate()
      && date.getMonth() === today.getMonth()
      && date.getFullYear() === today.getFullYear()
  );
};

export const isWeekend = (date: Date): boolean => date.getDay() === 0 || date.getDay() === 6;

export const toTitleCase = (str: string): string => str.replace(
  /\b\w/g,
  (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
);

export const isDateInBetween = (data: {
  startDateString: string;
  endDateString: string;
  targetDateString: string;
}): boolean => {
  const {
    startDateString,
    endDateString,
    targetDateString,
  } = data;

  const startDate = new Date(startDateString);

  const endDate = new Date(endDateString);

  const targetDate = new Date(targetDateString);

  return (
    targetDate.getDate() >= startDate.getDate()
      && targetDate.getMonth() >= startDate.getMonth()
      && targetDate.getFullYear() >= startDate.getFullYear()
      && targetDate.getDate() <= endDate.getDate()
      && targetDate.getMonth() <= endDate.getMonth()
      && targetDate.getFullYear() <= endDate.getFullYear()
  );
};

export const adjustUTCdateTime = (dateString: string): Date => {
  let validDateString = dateString;
  if (!validDateString.includes('T')) {
    const validDateStringParts = validDateString.split(' ');

    if (validDateStringParts.length > 1) {
      validDateString = validDateStringParts.join('T');
    }
  }

  if (!validDateString.endsWith('Z')) {
    validDateString += 'Z';
  }

  return new Date(validDateString);
};

export const formatLocalISO = (date: Date): string => {
  const pad = (num) => (num < 10 ? `0${num}` : num);
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};
