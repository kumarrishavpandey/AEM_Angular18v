import {
  Component, EventEmitter, Input, Output,
} from '@angular/core';
import { formatFullName } from 'utils/utils';

@Component({
  selector: 'app-recent-engineer-card',
  templateUrl: './recent-engineer-card.component.html',
  styleUrls: ['./recent-engineer-card.component.scss'],
})
export class RecentEngineerCardComponent {
  @Input() labelRecentEngineerCard;

  @Input() cardData;

  @Input() avatarSize;

  @Input() avatarTheme;

  @Input() imgFlight ;

  @Output() selectEngineer = new EventEmitter<any>();

  @Output() recentTrip = new EventEmitter<any>();

  formatFullName = formatFullName;

  recentTripClick(empId: any){
    this.recentTrip.emit(empId);
  }

  selectEng(engData: any){
    this.selectEngineer.emit(engData);
  }
}
