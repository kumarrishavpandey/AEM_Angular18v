import { AirIndiaDL } from './airindia';

export interface FormStartAIDL extends AirIndiaDL {
  form: {
    clickName?: string;
    formName: string;
  }
}
