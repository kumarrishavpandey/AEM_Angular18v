import { Component } from '@angular/core';
import { HomePageConstant } from '../home-constant';

@Component({
  selector: 'app-explore-myai',
  templateUrl: './explore-myai.component.html',
  styleUrls: ['./explore-myai.component.scss'],
})
export class ExploreMyaiComponent {
  fieldsConstant = HomePageConstant.exploreMyAi.fields;
}
