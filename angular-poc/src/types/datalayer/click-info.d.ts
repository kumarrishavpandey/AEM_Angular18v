import { AirIndiaDL } from './airindia';

export interface ClickInfoDL {
  bannerName?: string;
  bannerDescription?: string;
  clickName: string;
  clickComponentType: string;
  componentName: string;
  componentID?: string;
}

export interface ClickInfoAIDL extends AirIndiaDL {
  'clickInfo': ClickInfoDL
}
