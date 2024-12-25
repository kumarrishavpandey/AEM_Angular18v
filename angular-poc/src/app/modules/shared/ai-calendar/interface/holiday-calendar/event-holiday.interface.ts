import { EventProps } from '../event-props.interface';
import { LeaveHolidayData } from './leave-holiday.interface';

export interface EventHolidayData extends LeaveHolidayData {
  eventProps: EventProps;
}
