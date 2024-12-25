import { AirIndiaDL } from './airindia';

export interface FormErrorAIDL extends AirIndiaDL {
  errorInfo: {
    errorName: string;
  };
  form: {
    formName: string;
  };
}
