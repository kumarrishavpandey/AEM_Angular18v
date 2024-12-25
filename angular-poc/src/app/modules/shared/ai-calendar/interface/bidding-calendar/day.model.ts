import { CrewActivity } from './crew-activity.interface';

export interface Day {
  date: Date;
  isSelected: boolean; // Added for selection functionality
  isCurrentMonth: boolean; // Added to disable past month dates
  isWindowFrame: boolean;
  isPeriodFrame: boolean;
  events?: CrewActivity[]; // Optional array for events
}
