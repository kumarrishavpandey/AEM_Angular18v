import { AirIndiaDL } from './airindia';

export interface ApiErrorAIDL extends AirIndiaDL {
  errorInfo: {
    errorName: string;
    errorCode: number;
  };
}
