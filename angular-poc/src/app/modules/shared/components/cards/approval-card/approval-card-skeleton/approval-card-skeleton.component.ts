import {
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { EnumAvatarSize } from 'src/app/shared/components/cards/employee-card/employee-card.enum';
import { EnumSkeletonUnit } from 'src/app/shared/components/skeleton/skeleton.enum';
import { DeviceBreakpoint } from 'src/app/shared/constants';
import { WindowService } from 'src/app/shared/services/window.service';

@Component({
  selector: 'app-approval-card-skeleton',
  templateUrl: './approval-card-skeleton.component.html',
  styleUrls: ['./approval-card-skeleton.component.scss'],
})
export class ApprovalCardSkeletonComponent implements OnInit, OnDestroy {
  @Input() index: number;

  @Input() showBadge: boolean = false;

  @Input()
  showTagData: boolean = true;

  @Input()
  showRequestStatus: boolean = false;

  @Input()
  showPendingFor: boolean = true;

  @Input()
  showActionButtons: boolean = true;

  @Input()
  showDetailLink: boolean = true;

  @Input()
  approvalCardCount: number = 1;

  @Input()
  detailFieldCount: number;

  className: string = '';

  classNameArr: string[] = ['card-one', 'card-two', 'card-three'];

  enumSkeletonUnit = EnumSkeletonUnit;

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

    this.className = this.classNameArr[this.index];
  }

  getBadgePosition(): number {
    return this.deviceWidth <= DeviceBreakpoint.MD ? -16 : -24;
  }

  getEmpAvatarSize(): EnumAvatarSize {
    return this.deviceWidth <= DeviceBreakpoint.MD ? EnumAvatarSize.XS : EnumAvatarSize.M;
  }

  ngOnDestroy(): void {
    this.resizeSubscription$.unsubscribe();
  }
}
