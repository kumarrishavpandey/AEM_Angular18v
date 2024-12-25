import { AnalyticsEvent } from 'src/app/shared/constants';
import { WebInteractionsDL } from './web-interaction';
import { ApiErrorAIDL } from './api-error-info';

export interface ApiErrorDL {
  event: AnalyticsEvent;
  _airindia: ApiErrorAIDL;
  web: {
    webInteractions: WebInteractionsDL;
  };
}
