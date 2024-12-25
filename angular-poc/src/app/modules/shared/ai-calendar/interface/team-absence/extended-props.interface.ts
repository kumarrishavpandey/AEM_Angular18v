import { ExtendedTrips } from './extended-trips.interface';

export interface ExtendedProps {
  name: string;
  duration: string;
  status?: string;
  fromName?: string;
  toName?: string;
  tripType?: string;
  trips?: ExtendedTrips[];
}
