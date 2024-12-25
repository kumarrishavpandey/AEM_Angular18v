import { Injectable } from '@angular/core';
import { isValidDate } from 'utils/utils';

@Injectable({
  providedIn: 'root',
})
export class ApprovalCardService {
  getDaysDifference(targetDate: Date): number {
    if (targetDate && isValidDate(targetDate.toISOString())) {
      const currentDate = new Date();
      const diffTime = Math.abs(currentDate.getTime() - targetDate.getTime());
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }

    return null;
  }
}
