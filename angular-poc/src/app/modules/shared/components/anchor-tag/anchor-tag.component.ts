import { Component, Input } from '@angular/core';
import { AnalyticsComponent } from '../../constants';
import { AnchorTagTarget, EnumAnchorTagLabelColor } from './anchor-tag.enum';
import { IQueryParams } from './anchor-tag.model';

@Component({
  selector: 'app-anchor-tag',
  standalone:false,
  templateUrl: './anchor-tag.component.html',
  styleUrls: ['./anchor-tag.component.scss'],

})
export class AnchorTagComponent {
  @Input()
  siteSection: string;

  @Input()
  siteSubSection: string;

  @Input()
  componentName: string;

  @Input()
  link: string;

  @Input()
  queryParams: IQueryParams = {};

  @Input()
  label: string;

  @Input()
  anchorIcon: string;

  @Input()
  labelColor: string = EnumAnchorTagLabelColor.SKY_BLUE;

  @Input()
  target: AnchorTagTarget = AnchorTagTarget.SELF;

  @Input()
  isExternal: boolean = false;

  @Input()
  padding: string = '';

  @Input()
  fontSize: string = '';

  @Input()
  fontWeight: string = '';

  constructor() { }

  trackClickEvent() {
    // this.analyticsService.trackClickEvent({
    //   siteSection: this.siteSection,
    //   siteSubSection: this.siteSubSection,
    //   clickName: this.label,
    //   clickComponentType: AnalyticsComponent.LINK,
    //   componentName: this.componentName,
    //   linkURL: this.link,
    // });
  }
}
