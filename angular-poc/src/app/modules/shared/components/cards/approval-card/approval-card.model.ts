import { IQueryParams } from 'src/app/shared/components/anchor-tag/anchor-tag.model';
import { IApprovalCardEmployeeData } from './approval-card-employee-name/approval-card-employee-name.model';

export interface ILabelsApprovalCardSnackbar {
  labelSuccessMsg: string;
  labelUndo: string;
  labelErrorMsg: string;
}

export interface ILabelsApprovalCardRejectDialog {
  labelDialogReject: string;
  labelRejectDescription: string;
  labelCommentPlaceHolder: string;
  commentMaxLength: number;
  labelCommentErrorMessage: string;
  labelReject: string;
  btnReject: string;
  labelCancel: string;
  btnCancel: string;
  iconClose: string;
}

export interface ILabelsApprovalCardRejectSuccessDialog {
  iconDialogSuccess: string;
  labelRejectSuccess: string;
  labelRejectSuccessMsg: string;
  labelErrorMsg: string;
}

export interface ILabelsApprovalCard {
  labelCardTitle: string;
  iconTimer: string;
  labelPendingFor: string;
  labelPendingCancellationFor: string;
  labelDay: string;
  labelDays: string;
  labelTagTitle: string;
  labelSubmittedOn: string;
  labelLastUpdatedOn: string;
  labelRejectedOn: string;
  labelApprovedOn: string;
  labelGoTo: string;
  linkGoTo: string;
  labelRequestType: string;
  labelCancelBtn: string;
  labelSubmitBtn: string;
  labelsApprovalCardRejectDialog: ILabelsApprovalCardRejectDialog;
  labelsApprovalCardRejectSuccessDialog: ILabelsApprovalCardRejectSuccessDialog;
  labelsAprovalCardSnackbar: ILabelsApprovalCardSnackbar;
}

export interface IDataApprovalCard {
  employee: IApprovalCardEmployeeData;
  pendingFor: string;
  queryParamsGoTo: IQueryParams;
  requestId: string;
  status: string;
  submittedOn: Date;
  lastModifiedDateTime: Date;
  tagData?: string;
}
