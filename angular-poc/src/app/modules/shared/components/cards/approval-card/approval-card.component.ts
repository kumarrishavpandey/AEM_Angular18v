import {
  Component, EventEmitter, Input, OnDestroy, OnInit, Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { EnumAnchorTagLabelColor } from 'src/app/shared/components/anchor-tag/anchor-tag.enum';
import { EnumAvatarSize, EnumAvatarTheme } from 'src/app/shared/components/cards/employee-card/employee-card.enum';
import { DeviceBreakpoint } from 'src/app/shared/constants';
import { WindowService } from 'src/app/shared/services/window.service';
import { environment } from 'src/environments/environment';
import { IDataApprovalCard, ILabelsApprovalCard } from './approval-card.model';

@Component({
  selector: 'app-approval-card',
  templateUrl: './approval-card.component.html',
  styleUrls: ['./approval-card.component.scss'],
})
export class ApprovalCardComponent implements OnInit, OnDestroy {
  @Input()
  siteSection: string;

  @Input()
  siteSubSection: string;

  @Input()
  labelsApprovalCard: ILabelsApprovalCard;

  @Input() index: number;

  @Input() showBadge: boolean = false;

  @Input()
  showTagData: boolean = true;

  @Input()
  showRequestStatus: boolean = false;

  @Input()
  showPendingFor: boolean = true;

  @Input() showActionButtons: boolean = true;

  @Input() showDetailLink: boolean = true;

  @Input()
  cardData: IDataApprovalCard;

  @Input() extendedView: boolean = false;

  @Output()
  handleCancelClick = new EventEmitter<IDataApprovalCard>();

  @Output()
  handleSubmitClick = new EventEmitter<IDataApprovalCard>();

  enumAnchorTagLabelColor = EnumAnchorTagLabelColor;

  className: string = '';

  classNameArr: string[] = ['card-one', 'card-two', 'card-three'];

  cancelClicked: boolean = false;

  submitClicked: boolean = false;

  tagDataTimeout = null;

  deviceWidth: number;

  resizeSubscription$: Subscription;

  constructor(private windowService: WindowService) {
    this.deviceWidth = window.innerWidth;
  }

  ngOnInit(): void {
    this.resizeSubscription$ = this.windowService
      .onResizeDeviceWidth()
      .subscribe((width) => {
        this.deviceWidth = width;
      });

    if (!this.cardData.tagData) {
      this.tagDataTimeout = setTimeout(() => {
        this.showTagData = false;
      }, environment.API_TIMEOUT);
    }

    this.className = this.classNameArr[this.index];
  }

  getBadgeLabel(): string {
    return this.labelsApprovalCard.labelCardTitle.replace(/s(?=[^s]*$)/, '');
  }

  getEmpAvatarTheme(): EnumAvatarTheme {
    return EnumAvatarTheme.SECONDARY;
  }

  getEmpAvatarSize(): EnumAvatarSize {
    return this.deviceWidth <= DeviceBreakpoint.MD ? EnumAvatarSize.XS : EnumAvatarSize.M;
  }

  formatCTC(ctc: number): string {
    const lakh = 100000;
    const formattedCTC = `${(ctc / lakh).toFixed(2)}LPA`;
    return formattedCTC;
  }

  formatTagData(tagData: string){
    const num = parseInt(tagData, 10);
    if (!Number.isNaN(num)) {
      return num.toString().padStart(2, '0');
    }
    return tagData;
  }

  isButtonClicked(): boolean {
    return this.cancelClicked || this.submitClicked;
  }

  onCancelClick() {
    this.cancelClicked = true;

    setTimeout(() => { this.cancelClicked = false; }, 2000);

    this.handleCancelClick.emit(this.cardData);
  }

  onSubmitClick() {
    this.submitClicked = true;

    setTimeout(() => { this.submitClicked = false; }, 2000);

    this.handleSubmitClick.emit(this.cardData);
  }

  ngOnDestroy(): void {
    clearTimeout(this.tagDataTimeout);
    this.resizeSubscription$.unsubscribe();
  }
}
