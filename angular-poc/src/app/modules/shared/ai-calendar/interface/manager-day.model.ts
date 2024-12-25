import { Event } from './event.model';

export interface ManagerDay {
  date: Date;
  isSelected: boolean; // Added for selection functionality
  isCurrentMonth: boolean; // Added to disable past month dates
  events?: Event[]; // Optional array for events
  isOverlap?: boolean; // Added to show overlap for dates
}
