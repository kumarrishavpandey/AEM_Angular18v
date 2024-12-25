import { ExtendedProps } from './extended-props.interface';

export interface TeamLeaveHolidayData {
  resourceIds: string[];
  title: string;
  start: string;
  end: string;
  extendedProps: ExtendedProps;
}
