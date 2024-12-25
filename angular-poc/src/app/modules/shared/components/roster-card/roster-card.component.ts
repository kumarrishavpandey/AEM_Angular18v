import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { getAemDamFullPath } from '../../../../../utils/utils';

@Component({
  selector: 'app-roster-card',
  templateUrl: './roster-card.component.html',
  styleUrls: ['./roster-card.component.scss'],
})
export class RosterCardComponent implements OnChanges, OnInit {
  @Input() recentCards: any[] = [];

  @Input() numberOfCards: number;

  planeAndPathImage: string;

  // to do - configaration from AEM
  aemResponse = {
    title: 'Scheduled Flight',
    durationText: 'total travel time',
    flightNoTxt: 'Flight No.',
  };

  ngOnInit(): void {
    this.getPlaneAndPathIcon();
  }

  ngOnChanges(): void {
    this.recentCards = this.recentCards.slice(0, this.numberOfCards);
  }

  getPlaneAndPathIcon() {
    const endPoint = '/content/dam/my-ai/icon/plane_and_path.svg';
    const fullUrl = getAemDamFullPath(endPoint);
    this.planeAndPathImage = fullUrl;
  }
}
