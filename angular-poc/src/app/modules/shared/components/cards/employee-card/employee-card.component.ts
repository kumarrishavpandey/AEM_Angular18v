import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
// import { HeaderSize } from 'src/app/shared/constants';
// import { CommonService } from 'src/app/shared/services/common.service';
// import { getEmployeeProfileEndpoint, getInitials } from 'utils/utils';
import { EnumAvatarSize, EnumAvatarTheme } from './employee-card.enum';
import { HeaderSize } from '../../../constants';
import { getEmployeeProfileEndpoint, getInitials } from '../../../../../../utils/utils';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.scss'],
})
export class EmployeeCardComponent implements OnInit, OnChanges {
  @Input()
  empData: {
    employeeId: string;
    firstName: string;
    lastName: string;
  };

  @Input()
  componentClass: string;

  @Input()
  imgContainerClass: string;

  @Input()
  imgClass: string;

  @Input()
  size: EnumAvatarSize;

  @Input()
  initialsContainerClass: string;

  @Input()
  initialsClass: string;

  @Input()
  initialsSize: HeaderSize = HeaderSize.H6;

  @Input()
  addIntitals: boolean = true;

  @Input()
  initialsTheme: EnumAvatarTheme = EnumAvatarTheme.PRIMARY;

  getInitials = getInitials;

  isUserImageValid: boolean;

  userProfileImageUrl: string;

  headerSize = HeaderSize;

  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    if (this.empData.employeeId) {
      const fullUrl = getEmployeeProfileEndpoint(this.empData.employeeId);
      this.isImagePathValid(fullUrl);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["empData"]) {
      const fullUrl = getEmployeeProfileEndpoint(
        changes["empData"].currentValue.employeeId,
      );
      this.isImagePathValid(fullUrl);
    }
  }

  /* Check if img path is valid */
  async isImagePathValid(url: string) {
    this.userProfileImageUrl = url;
    const check = await this.commonService.isImageValid(url);
    this.isUserImageValid = check;
  }
}
