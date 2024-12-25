import { EventProps } from '../event-props.interface';
import { TeamLeaveHolidayData } from './team-leave-holiday.interface';

export interface EventHolidayData extends TeamLeaveHolidayData {
  eventProps: EventProps;
}
