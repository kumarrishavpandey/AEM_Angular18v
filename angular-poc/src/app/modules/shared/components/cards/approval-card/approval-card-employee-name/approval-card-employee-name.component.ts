import { Component, Input } from '@angular/core';
import { getEmployeeFullName } from 'utils/utils';
import { IApprovalCardEmployeeData } from './approval-card-employee-name.model';

@Component({
  selector: 'app-approval-card-employee-name',
  templateUrl: './approval-card-employee-name.component.html',
  styleUrls: ['./approval-card-employee-name.component.scss'],
})
export class ApprovalCardEmployeeNameComponent {
  @Input()
  employee: IApprovalCardEmployeeData;

  getEmployeeFullName = getEmployeeFullName;
}
