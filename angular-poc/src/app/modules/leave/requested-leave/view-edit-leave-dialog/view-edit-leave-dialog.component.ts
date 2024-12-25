import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import {
  LeaveRequestComponent,
  newLeaveRequestJson,
} from '../../leave-constant';
import { RequestedLeaveService } from '../../services/requested-leave.service';

import {
  checkMandatoryDocumentsInApplyLeaveValidation,
  checkMandatoryFieldsInApplyLeaveValidation,
} from '../../leave-common-functions';
import { NewRequestService } from '../../services/new-request.service';
import { CommonService } from '../../../shared/services/common.service';
import { StorageEncryptionService } from '../../../shared/services/storage-encryption.service';
import { AdobeAnalyticsService } from '../../../shared/services/adobe-analytics.service';
import { DebugService } from '../../../shared/services/debug.service';
import { ApprovalStatusTexts } from '../../../shared/enum/enum';
import { LOGGEDIN_EMP } from '../../../../app.api';
import { apiErrorsFormatHandling, base64ToBlob, dateInYyyyMmDd, dateInYyyyMmDdHhMmSs, downloadBlobFile, getAemDamFullPath } from '../../../../../utils/utils';
import { AnalyticsComponent, mimeTypesJson } from '../../../shared/constants';
import { CommonWarningDialogWithButtonsComponent } from '../../../shared/components/common-warning-dialog-with-buttons/common-warning-dialog-with-buttons.component';
import { CommonSuccessDialogWithoutButtonsComponent } from '../../../shared/components/common-success-dialog-without-buttons/common-success-dialog-without-buttons.component';

interface Options {
  value: string;
  label: string;
}
interface LeaveTypeWithBalanceOptions {
  value: string;
  label: string;
  balance: string;
}
@Component({
  selector: 'app-view-edit-leave-dialog',
  templateUrl: './view-edit-leave-dialog.component.html',
  styleUrls: ['./view-edit-leave-dialog.component.scss'],
})
export class ViewEditLeaveDialogComponent implements OnInit {
  newRequestLabels: any;

  dialogViewEditLabels: any;

  dialogDeleteLeaveLabels: any;

  uploadDocumentLabels: any;

  isWithinFinancialYear: boolean;

  pendingCancellationData: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialog: MatDialog,
    private requestedLeaveService: RequestedLeaveService,
    private newRequestService: NewRequestService,
    private commonService: CommonService,
    private storageEncryptionService: StorageEncryptionService,
    private analyticsService: AdobeAnalyticsService,
    private debugService: DebugService,
  ) {
    this.newRequestLabels = this.data?.newRequestLabels;
    this.dialogViewEditLabels = this.data?.dialogViewEditLabels;

    this.dialogDeleteLeaveLabels = this.data?.dialogDeleteLeaveLabels;
    this.uploadDocumentLabels = this.data?.uploadDocumentLabels;
    this.isWithinFinancialYear = this.data?.isWithinFinancialYear;
    this.pendingCancellationData = this.data?.pendingCancellationData;
  }

  constantData: any = LeaveRequestComponent;

  leaveTypesCode = newLeaveRequestJson.leaveTypeCode;

  leaveTypesInfo = newLeaveRequestJson.leaveTypeInfo;

  approvalStatusConstant: {} = ApprovalStatusTexts;

  leaveInfo = newLeaveRequestJson.viewEditLeaveInfo;

  dialogFields = newLeaveRequestJson.viewEditLeaveRequestFields;

  leaveBalance: any = this.leaveInfo?.leaveBalance;

  documentMandatoryError = false;

  fractionQuantityIsMandatory = false;

  isAttachmentFileUploaded: boolean = false;

  fieldMandatoryError = false;

  isFormChanged = false;

  approvalStatusOptions = newLeaveRequestJson.approvalStatusOptions;

  applyLeaveFieldsConstant = newLeaveRequestJson.fields;

  actionType: string = 'edit';

  managerCommentOnRejectedLeave: string;

  leaveBalanceDynamicTitle = '';

  /* Show or hide file uploader on the file change */
  showFileUploader = true;

  showLeaveBalanceField = false;

  apiErrors = [];

  employeeChildAgeOptionsArray = [];

  editLeaveForm: FormGroup;

  showViewEditDialog = false;

  isRejectedLeaveDialogOpen = false;

  isApprovedLeaveDialogOpen = false;

  employeeId: string;

  /* Size or type error variable */
  documentSizeOrTypeError = false;

  /* double ext error variable */
  doubleFileExtensionError = false;

  /* Approved pending leave cancellation error variable */
  approvedPendingLeaveCancellationError = false;

  /* Close current dialog box */
  closeViewEditLeaveDialogBox = false;

  /* Flag to show page only if created form */
  formIsCreated = false;

  /* loading on submit application */
  isLoadingOnLeaveSubmit = false;

  /* Check Document in JSON */
  selectedUploadDocument = this.leaveInfo?.uploadedDocument
    ? this.leaveInfo?.uploadedDocument
    : null;

  //  Supported Document that
  supportedDocument = null;

  leaveTypesOptionArray: LeaveTypeWithBalanceOptions[] = null;

  fractionQuantityOptionArray: Options[] =
  newLeaveRequestJson.fractionQuantityOptions;

  isFormDisabled = false;

  isStatusApprovedPendingLeave = false;

  isDataLoaded: boolean = false;

  formHasFirstValue = false;

  fieldChanges: { [key: string]: boolean } = {};

  ngOnInit(): void {
    this.employeeId = this.storageEncryptionService.getvalue(LOGGEDIN_EMP);
    /* If getting data from the parent component,that means it's add or edit dialog */
    this.getLeaveInfoForEditForm();
  }

  bindViewEditLeaveFormStartTracking() {
    this.editLeaveForm.valueChanges.subscribe(() => {
      Object.keys(this.editLeaveForm.controls).forEach((key) => {
        if (
          !this.fieldChanges[key]
          && this.editLeaveForm.controls[key].dirty
          && this.formHasFirstValue === false
        ) {
          this.fieldChanges[key] = true;
          this.formHasFirstValue = true;

          this.adobeAnalyticsOnFirstFormStart(key);
        }
      });
    });
  }

  /* For creating edit form */
  createAddOrEditForm(leaveInfo, leaveId) {
    /* Leave form using Reactive forms */
    this.isApprovedLeaveDialogOpen = leaveInfo?.status === this.constantData?.column?.approvedFilter;
    this.isRejectedLeaveDialogOpen = leaveInfo?.status === this.constantData?.column?.rejectedFilter;
    this.managerCommentOnRejectedLeave = leaveInfo?.managerComment;
    this.isFormDisabled = leaveInfo?.status
        === this.constantData?.column?.pendingCancellationFilter
        || this.isRejectedLeaveDialogOpen
      || !this.data?.isWithinFinancialYear;

    this.isStatusApprovedPendingLeave = leaveInfo.custApprovedFlag === 'Y'
      && leaveInfo?.status !== this.approvalStatusOptions.approved;

    this.editLeaveForm = new FormGroup({
      leaveId: new FormControl(leaveId),
      leaveType: new FormControl(leaveInfo?.leaveCode, [Validators.required]),
      startDate: new FormControl(new Date(leaveInfo?.startDate), [
        Validators.required,
      ]),
      endDate: new FormControl(new Date(leaveInfo?.endDate), [
        Validators.required,
      ]),
      returningToWorkDate: new FormControl(
        leaveInfo?.returningToWorkDate
          ? new Date(leaveInfo?.returningToWorkDate)
          : null,
      ),
      createdOn: new FormControl(
        leaveInfo?.submittedDate ? new Date(leaveInfo?.submittedDate) : null,
      ),
      leaveReason: new FormControl(leaveInfo?.leaveReason, [
        Validators.maxLength(500),
      ]),
      managerLeaveRejectedReason: new FormControl(leaveInfo?.managerComment, [
        Validators.maxLength(500),
      ]),
      fractionQuantity: new FormControl(leaveInfo?.fractionQuantity, []),
      leaveDuration: new FormControl(leaveInfo?.duration, []),
      approvalStatus: new FormControl(leaveInfo?.status),

      /* New attachment ID */
      attachmentId: new FormControl(null, []),
      attachmentName: new FormControl(leaveInfo?.supportedDocumentFileName, []),

      /* prev attachment id */
      prevAttachmentId: new FormControl(
        leaveInfo?.supportedDocument ? leaveInfo?.supportedDocument : null,
      ),

      /* Type dependent fields */
      dateOfDelivery: new FormControl(
        (leaveInfo?.leaveCode === this.leaveTypesCode.maternityLeave
          || leaveInfo?.leaveCode === this.leaveTypesCode.paternityLeave)
        && leaveInfo?.dateOfDelivery
          ? new Date(leaveInfo?.dateOfDelivery)
          : null,
        [],
      ),
      employeeChildAge: new FormControl(
        leaveInfo?.leaveCode === this.leaveTypesCode.adoptionLeave
          ? leaveInfo?.employeeChildAge
          : null,
        [],
      ),
      dateOfRelocation: new FormControl(
        (leaveInfo?.leaveCode === this.leaveTypesCode.relocationGma
          || leaveInfo?.leaveCode === this.leaveTypesCode.relocationPdr
          || leaveInfo?.leaveCode === this.leaveTypesCode.relocationTdr
          || leaveInfo?.leaveCode === this.leaveTypesCode.repatriationGma)
        && leaveInfo?.dateOfRelocation
          ? new Date(leaveInfo?.dateOfRelocation)
          : null,
        [],
      ),
      expectedDateOfDelivery: new FormControl(
        (leaveInfo?.leaveCode === this.leaveTypesCode.surrogacyLeave
          && leaveInfo?.expectedDateOfDelivery)
        || (leaveInfo?.leaveCode === this.leaveTypesCode.surrogacyLeaveFather
          && leaveInfo?.expectedDateOfDelivery)
          ? new Date(leaveInfo?.expectedDateOfDelivery)
          : null,
        [],
      ),
      expectedOrActualDateOfChildBirth: new FormControl(
        leaveInfo?.leaveCode === this.leaveTypesCode.adoptionLeaveFather
          ? new Date(leaveInfo?.childDateOfBirth)
          : null,
        [],
      ),
      compoffDate: new FormControl(
        leaveInfo?.leaveCode === this.leaveTypesCode.compensatory
          ? new Date(leaveInfo?.compoffDate)
          : null,
        [],
      ),

      miscarriageMedicalDate: new FormControl(
        leaveInfo?.leaveCode === this.leaveTypesCode.miscarriageLeave
          ? new Date(leaveInfo?.miscarriageMedicalDate)
          : null,
        [],
      ),
    });

    if (this.isFormDisabled) {
      this.editLeaveForm.disable();
    }
    this.editLeaveForm.get('managerLeaveRejectedReason').disable();
    this.bindViewEditLeaveFormStartTracking();
  }

  createAddEditIfNoDataFromApi() {
    this.editLeaveForm = new FormGroup({
      leaveId: new FormControl(null),
      leaveType: new FormControl(null, [Validators.required]),
      startDate: new FormControl(null, [Validators.required]),
      endDate: new FormControl(null, [Validators.required]),
      returningToWorkDate: new FormControl(null),
      createdOn: new FormControl(null),
      leaveReason: new FormControl(null, [Validators.maxLength(500)]),
      managerLeaveRejectedReason: new FormControl(null, [Validators.maxLength(500)]),
      fractionQuantity: new FormControl(null, []),
      leaveDuration: new FormControl(null, []),
      approvalStatus: new FormControl(null),
    });

    this.bindViewEditLeaveFormStartTracking();
  }

  /* Function to get leave duration between start date and enddate with leave code */
  getLeaveDurationAndReturnToWorkFromApi() {
    if (
      this.editLeaveForm.value?.startDate
      && this.editLeaveForm.value?.endDate
      && this.editLeaveForm.value?.leaveType
    ) {
      /* Reset the duration and return to work before getting updated data */
      this.editLeaveForm.controls?.leaveDuration?.setValue(null);
      this.editLeaveForm.controls?.returningToWorkDate?.setValue(null);
      const payload = {
        leaveCode: this.editLeaveForm.value.leaveType,
        startDate: dateInYyyyMmDdHhMmSs(this.editLeaveForm.value.startDate),
        endDate: dateInYyyyMmDdHhMmSs(this.editLeaveForm.value.endDate),
      };

      try {
        this.newRequestService.getDurationAndReturnToWork(payload)?.subscribe(
          (res) => {
            this.editLeaveForm.controls?.leaveDuration?.setValue(
              res.data?.duration,
            );
            this.editLeaveForm.controls?.returningToWorkDate?.setValue(
              res.data?.returningToWorkDate,
            );
          },
          (err) => {
            this.debugService.log(
              'Error while getting leave duration and return to work',
              err,
            );
          },
        );
      } catch (error) {
        this.debugService.log('error', error);
      }
    }
  }

  getLeaveInfoForEditForm() {
    this.getLeaveTypesAndBalance();
  }

  /* Get leave information from API and create form with the same data */
  getLeaveAndCreateForm() {
    this.isDataLoaded = false;
    try {
      this.requestedLeaveService
        ?.getLeaveDataWithId(this.data?.leaveId)
        ?.subscribe(
          (res) => {
            if (res?.data) {
              if (res?.data?.supportedDocumentFileName) {
                this.showFileUploader = false;
                this.supportedDocument = res?.data?.supportedDocument;
              }

              /* Get child age dropdown options if leave if adoption */
              if (res.data.leaveCode === this.leaveTypesCode?.adoptionLeave) {
                this.getChildAgeOptionsListFromPickList();
              }

              this.createAddOrEditForm(res?.data, this.data?.leaveId);
              /* Hit to get leave balance */
              this.selectValueChange('');
              this.selectedUploadDocument.name = res?.data?.supportedDocumentFileName;
              this.showViewEditDialog = true;
              this.formIsCreated = true;
              this.isDataLoaded = true;
            }
          },
          (err) => {
            this.debugService.log('error while getting leave types', err);
            this.createAddEditIfNoDataFromApi();
            if (this.editLeaveForm) {
              this.formIsCreated = true;
              this.editLeaveForm.disable();
              this.isDataLoaded = true;
            }
          },
        );
    } catch (error) {
      this.debugService.log('error while getting leave details', error);
    }
  }

  /* Get leave types and balance from API */
  getLeaveTypesAndBalance() {
    this.newRequestService
      .getLeaveTypeAndBalanceApi(
        dateInYyyyMmDd(this.editLeaveForm?.value?.startDate),
      )
      ?.subscribe(
        (response) => {
          /* Check for leave type from the api */
          this.isDataLoaded = true;
          if (response?.status?.code === 200 && response?.data?.leaveTypes) {
            const filteredArr = response?.data?.leaveTypes?.map(
              (leaveItem) => ({
                label: leaveItem?.leaveDescription,
                value: leaveItem?.leaveCode,
                balance: leaveItem?.leaveBalance,
              }),
            );
            this.leaveTypesOptionArray = filteredArr;

            if (
              this.actionType === 'edit'
              && !this.editLeaveForm?.value?.startDate
              && !this.editLeaveForm?.value?.endDate
            ) {
              this.getLeaveAndCreateForm();
            } else {
              this.getLeaveBalance();
            }
          } else {
            this.leaveTypesOptionArray = [];
          }
        },
        (error) => {
          this.debugService.log('error', error);
        },
      );
  }

  /* Get child ages dropdown options required for adoption leave type */
  getChildAgeOptionsListFromPickList() {
    const requestBody = {
      picklistId: ['childage'],
    };
    this.commonService.getPickList(requestBody)?.subscribe(
      (res) => {
        const newArr = [];
        res[0]?.Picklist?.forEach((element) => {
          newArr.push({ value: element.externalCode, label: element.label });
        });
        this.employeeChildAgeOptionsArray = newArr;
      },
      (err) => {
        this.employeeChildAgeOptionsArray = [];
        this.debugService.log('error while getting  picklist', err);
      },
    );
  }

  /* Function perform on the submit of leave application */
  onEditLeaveFormSubmit() {
    this.apiErrors = [];

    if (
      checkMandatoryFieldsInApplyLeaveValidation(
        this.editLeaveForm?.value,
        this.leaveTypesCode,
      )
    ) {
      this.debugService.log('Fill the mandatory fields');
    } else if (
      checkMandatoryDocumentsInApplyLeaveValidation(
        this.editLeaveForm?.value,
        this.leaveTypesCode,
        this.selectedUploadDocument,
      )
    ) {
      this.debugService.log('UI error', 'Document is madatory');
    } else {
      const formValues = this.editLeaveForm?.value;

      let updatedFractionalQuantity: Number | null;
      if (formValues?.leaveType === this.leaveTypesCode.casualLeave) {
        if (formValues?.leaveDuration < 2) {
          updatedFractionalQuantity = formValues?.fractionQuantity;
        } else if (formValues?.leaveDuration > 1) {
          updatedFractionalQuantity = formValues?.leaveDuration;
        } else {
          updatedFractionalQuantity = null;
        }
      } else {
        updatedFractionalQuantity = null;
      }
      const payload: any = {
        employeeId: this.employeeId,
        leaveId: formValues?.leaveId,
        updatedLeaveDetails: {
          leaveCode: formValues?.leaveType,
          startDate: dateInYyyyMmDdHhMmSs(formValues?.startDate),
          endDate: dateInYyyyMmDdHhMmSs(formValues?.endDate),
          duration: formValues?.leaveDuration,
          leaveReason: formValues?.leaveReason,
          prevAttachmentId: formValues?.prevAttachmentId,
          newAttachmentId: formValues?.attachmentId,
          fractionQuantity: updatedFractionalQuantity,
          returningToWorkDate: dateInYyyyMmDdHhMmSs(
            formValues?.returningToWorkDate,
          ),

          dateOfDelivery: dateInYyyyMmDdHhMmSs(formValues?.dateOfDelivery),
          employeeChildAge: formValues?.employeeChildAge,
          dateOfRelocation: dateInYyyyMmDdHhMmSs(formValues?.dateOfRelocation),
          expectedDateOfDelivery: dateInYyyyMmDdHhMmSs(
            formValues?.expectedDateOfDelivery,
          ),
          childDateOfBirth: dateInYyyyMmDdHhMmSs(
            formValues?.expectedOrActualDateOfChildBirth,
          ),
          compoffDate: dateInYyyyMmDdHhMmSs(formValues?.compoffDate),
          miscarriageMedicalDate: dateInYyyyMmDdHhMmSs(
            formValues?.miscarriageMedicalDate,
          ),
        },
      };

      this.updateLeaveRequest(payload, formValues);
    }
  }

  getLeaveTypeLabel(value: string): string {
    const foundOption = this.leaveTypesOptionArray.find(
      (option) => option.value === value,
    );

    return foundOption ? foundOption.label : '';
  }

  /* Update leave request with api */
  updateLeaveRequest(payload, formValues) {
    this.requestedLeaveService.updateLeaveRequestApi(payload)?.subscribe(
      () => {
        this.dialog.open(CommonSuccessDialogWithoutButtonsComponent, {
          data: {
            ...newLeaveRequestJson.dialogInfo.updateLeaveSuccess,
            iconPath: getAemDamFullPath(
              newLeaveRequestJson?.dialogInfo?.updateLeaveSuccess?.iconPath,
            ),
          },
          autoFocus: false,
        });

        this.isLoadingOnLeaveSubmit = false;
        this.resetLeaveApplicationForm();
        this.getLeaveTypesAndBalance();

        this.adobeAnalyticsOnClickOfFormSubmit(
          {
            ...payload,
            leaveType: this.getLeaveTypeLabel(formValues.leaveType),
          },
          this.dialogViewEditLabels.btnSave,
        );
      },
      (error) => {
        this.isLoadingOnLeaveSubmit = false;
        const errorMessage = error?.error?.status?.message;
        const errorCode = error?.error?.status?.code;

        this.adobeAnalyticsOnApiError(
          errorMessage,
          errorCode,
          this.dialogViewEditLabels.btnSave,
        );

        this.showApiErrorMessages(errorMessage);
      },
    );
  }

  scrollToTopForErrorView() {
    document.getElementById('viewEditDialog').scrollTop = 0;
  }

  showApiErrorMessages(error) {
    this.apiErrors = apiErrorsFormatHandling(error);
    /* Was not working with scroll(0,0) so need to select an dialog first and scroll to top in that dialog */
    this.scrollToTopForErrorView();
  }

  /* On the change of fractional quantity */
  onFractionalQuantityChange() {
    this.checkValidation();
  }

  /* Function which check the validation */
  checkValidation() {
    this.editLeaveForm.valueChanges?.subscribe(() => {
      this.isFormChanged = true;
    });
    this.documentMandatoryError = false;
    this.fieldMandatoryError = false;
    const isDocumentMandatoryError = checkMandatoryDocumentsInApplyLeaveValidation(
      this.editLeaveForm?.value,
      this.leaveTypesCode,
      this.selectedUploadDocument,
    );
    const isFieldMandatoryError = checkMandatoryFieldsInApplyLeaveValidation(
      this.editLeaveForm?.value,
      this.leaveTypesCode,
    );
    if (isDocumentMandatoryError) {
      this.documentMandatoryError = true;
      return true;
    }
    if (isFieldMandatoryError) {
      this.fieldMandatoryError = false;
      return true;
    }
    if (!this.editLeaveForm.value.leaveDuration) {
      return true;
    }
    if (
      this.editLeaveForm.value?.leaveType
        === this.leaveTypesCode?.casualLeave
      && this.editLeaveForm.value?.leaveDuration === 1
      && !this.editLeaveForm.value.fractionQuantity
    ) {
      return true;
    }

    return false;
  }

  /* Get leave balance */
  getLeaveBalance() {
    const leave = this.leaveTypesOptionArray?.find(
      (ele) => ele.value === this.editLeaveForm.value?.leaveType,
    );
    if (leave?.balance) {
      this.leaveBalance = Number(leave?.balance);
    } else {
      this.leaveBalance = 0;
    }
  }

  selectValueChange(event) {
    if (event.label) {
      this.leaveBalanceDynamicTitle = event.label;
    } else {
      this.leaveBalanceDynamicTitle = '';
    }
    this.getLeaveBalance();
    this.checkValidation();

    /* Showing leave balance field or not */
    this.showLeaveBalance();

    /* Check for leave duration change */
    if (
      this.editLeaveForm.value.startDate
      && this.editLeaveForm.value.endDate
    ) {
      this.getLeaveDurationAndReturnToWorkFromApi();
    }
  }

  /* Show or hide leave balance field */
  showLeaveBalance() {
    if (
      this.editLeaveForm.value.leaveType === this.leaveTypesCode.casualLeave
      || this.editLeaveForm.value.leaveType === this.leaveTypesCode.sickLeave
      || this.editLeaveForm.value.leaveType === this.leaveTypesCode.privilegeLeave
    ) {
      this.showLeaveBalanceField = true;
    } else {
      this.showLeaveBalanceField = false;
    }
  }

  /* When ever there will be a change in startdate and endDate */
  dateValueChange() {
    /* Check for leave duration change */
    if (this.editLeaveForm.value.leaveType) {
      this.getLeaveDurationAndReturnToWorkFromApi();

      /* Check for leave balance and types again */
      this.getLeaveTypesAndBalance();
    }
  }

  /* Upload file document */
  selectedDocument(value) {
    if (value?.progress !== 100) {
      this.requestedLeaveService.uploadAttachmentWithApi(value)?.subscribe(
        (res) => {
          this.editLeaveForm.controls.attachmentId.setValue(
            res.data.attachmentId,
          );

          this.supportedDocument = res.data.attachmentId;

          this.adobeAnalyticsOnClickOfButtons(
            this.newRequestLabels.labelUploadDocument,
          );

          this.onFileSuccessfullyUpload(value);
        },
        (err) => this.debugService.log(
          'Error while upload attachment in leave edit',
          err,
        ),
      );
    }
  }

  /* On File Successfully Upload */
  onFileSuccessfullyUpload(file) {
    this.isAttachmentFileUploaded = true;
    this.selectedUploadDocument = file;
    this.editLeaveForm?.controls?.attachmentName?.setValue(file.name);

    setTimeout(() => {
      this.showFileUploader = false;
    }, 1000);
  }

  onClickOfRemoveDocument() {
    this.adobeAnalyticsOnClickOfButtons(this.newRequestLabels.labelDelete);

    this.removeDocument();
  }

  /* Remove selected document */
  removeDocument() {
    this.selectedUploadDocument = null;
    this.supportedDocument = null;
    this.editLeaveForm.controls?.attachmentId?.setValue(null);
    this.editLeaveForm.controls?.prevAttachmentId?.setValue(null);
    this.editLeaveForm.controls?.attachmentName?.setValue(null);
    this.showFileUploader = true;
    this.isAttachmentFileUploaded = false;
    this.checkValidation();
  }

  /* View selected document */
  viewDocument() {
    const extension = this.selectedUploadDocument.name
      .split('.')
      .pop()
      .toLowerCase();

    const mimeType = mimeTypesJson[extension] || 'application/octet-stream';

    this.newRequestService
      .getUploadedAttachment(this.supportedDocument)
      .subscribe(
        (res) => {
          if (res?.data?.fileContent) {
            const blob = base64ToBlob(res.data.fileContent, mimeType);

            this.adobeAnalyticsOnClickOfButtons(
              this.newRequestLabels.labelView,
            );

            downloadBlobFile(blob);
          } else {
            this.debugService.error('Invalid response or missing URL');
          }
        },
        (error) => {
          this.debugService.error('Error fetching PDF URL:', error);
        },
      );
  }

  /* eslint-disable-next-line class-methods-use-this */
  getReturningDateInFormat(date) {
    const dateString = new Date(date);
    if (date) {
      return `${dateString.getDate()}/${
        dateString.getMonth() + 1
      }/${dateString.getFullYear()}`;
    }
    return '-';
  }

  onCancelEditButtonClick() {
    const btnLabel = this.pendingCancellationData || !this.isWithinFinancialYear
      ? this.dialogDeleteLeaveLabels.btnCancel
      : this.dialogViewEditLabels.btnCancelEdit;

    this.adobeAnalyticsOnClickOfButtons(btnLabel);

    this.resetLeaveApplicationForm();
  }

  /* For resetting leave application form */
  resetLeaveApplicationForm() {
    this.editLeaveForm.reset();
    this.documentSizeOrTypeError = false;
    this.doubleFileExtensionError = false;
    this.approvedPendingLeaveCancellationError = false;
    this.formHasFirstValue = false;
  }

  /* For deleting leave request */
  deleteLeaveRequest() {
    this.adobeAnalyticsOnClickOfButtons(
      this.dialogViewEditLabels.btnDeleteLeave,
    );

    const leaveId = this.data?.leaveId;
    const dialogRef = this.dialog.open(
      CommonWarningDialogWithButtonsComponent,
      {
        autoFocus: false,
        data: {
          warningInfo: newLeaveRequestJson?.dialogInfo?.deleteLeaveWarning,
          childInfo: {
            ...newLeaveRequestJson?.dialogInfo?.deleteLeaveSuccess,
            iconPath: getAemDamFullPath(
              newLeaveRequestJson?.dialogInfo?.deleteLeaveSuccess?.iconPath,
            ),
          },
          apiConfig: { payload: leaveId },
        },
      },
    );

    dialogRef.afterClosed()?.subscribe((result) => {
      const { flag } = result.data;
      if (flag === true) {
        this.confirmDeleteRequest();
        /* Set action to default after deleting */
        this.actionType = 'edit';
      }
    });
  }

  confirmDeleteRequest() {
    /* Instead of delete cancel the leave if leave is approved already */

    if (this.isStatusApprovedPendingLeave === true) {
      /* User should not be able to cancel approved leave if any update is pending to be approved */
      this.onApprovedPendingLeaveError(true);
    } else if (
      /* If leave is approved then cancel that leave */
      this.editLeaveForm.value.approvalStatus
      === this.approvalStatusOptions.approved
    ) {
      this.requestedLeaveService
        .cancelLeaveRequestApi(this.employeeId, this.data?.leaveId)
        ?.subscribe(
          () => {
            this.dialog.open(CommonSuccessDialogWithoutButtonsComponent, {
              autoFocus: false,
              data: {
                ...newLeaveRequestJson?.dialogInfo?.deleteLeaveSuccess,
                iconPath: getAemDamFullPath(
                  newLeaveRequestJson?.dialogInfo?.deleteLeaveSuccess?.iconPath,
                ),
              },
            });

            this.actionType = 'delete';
            this.getLeaveTypesAndBalance();
          },
          (error) => {
            const errorMessage = error?.error?.message;
            this.showApiErrorMessages(errorMessage);

            const errorCode = error?.error?.status?.code;
            this.adobeAnalyticsOnApiError(
              errorMessage,
              errorCode,
              newLeaveRequestJson.dialogInfo.deleteLeaveWarning.title,
            );
          },
        );
    } else {
      /* If leave is pedning then delete that leave */
      this.requestedLeaveService
        .deleteLeaveRequestApi(this.data?.leaveId)
        ?.subscribe(
          () => {
            this.dialog.open(CommonSuccessDialogWithoutButtonsComponent, {
              autoFocus: false,
              data: {
                ...newLeaveRequestJson?.dialogInfo?.deleteLeaveSuccess,
                iconPath: getAemDamFullPath(
                  newLeaveRequestJson?.dialogInfo?.deleteLeaveSuccess?.iconPath,
                ),
              },
            });

            this.actionType = 'delete';
            this.getLeaveTypesAndBalance();
          },
          (error) => {
            const errorMessage = error?.error?.message;
            this.showApiErrorMessages(errorMessage);

            const errorCode = error?.error?.status?.code;

            this.adobeAnalyticsOnApiError(
              errorMessage,
              errorCode,
              newLeaveRequestJson.dialogInfo.deleteLeaveWarning.title,
            );
          },
        );
    }
  }

  /* Comparissions */
  showDateOfRelocation() {
    if (
      this.editLeaveForm?.value?.leaveType
        === this.leaveTypesCode?.relocationGma
      || this.editLeaveForm?.value?.leaveType
        === this.leaveTypesCode?.relocationPdr
      || this.editLeaveForm?.value?.leaveType
        === this.leaveTypesCode?.relocationTdr
      || this.editLeaveForm?.value?.leaveType
        === this.leaveTypesCode?.repatriationGma
    ) {
      return true;
    }
    return false;
  }

  showDateOfDelivery() {
    if (
      this.editLeaveForm?.value?.leaveType
        === this.leaveTypesCode?.maternityLeave
      || this.editLeaveForm?.value?.leaveType
        === this.leaveTypesCode?.paternityLeave
    ) {
      return true;
    }
    return false;
  }

  isLeaveAdoption() {
    if (
      this.editLeaveForm?.value?.leaveType
      === this.leaveTypesCode?.adoptionLeave
    ) {
      return true;
    }
    return false;
  }

  showExpectedDateOfChild() {
    if (
      this.editLeaveForm.value?.leaveType
        === this.leaveTypesCode?.surrogacyLeave
      || this.editLeaveForm.value?.leaveType
        === this.leaveTypesCode?.surrogacyLeaveFather
    ) {
      return true;
    }
    return false;
  }

  showActualOrExpectedDateOfChild() {
    if (
      this.editLeaveForm.value?.leaveType
      === this.leaveTypesCode?.adoptionLeaveFather
    ) {
      return true;
    }
    return false;
  }

  showDateOfCompoff() {
    if (
      this.editLeaveForm.value?.leaveType === this.leaveTypesCode?.compensatory
    ) {
      return true;
    }
    return false;
  }

  showDateOfMiscarriage() {
    if (
      this.editLeaveForm.value?.leaveType
      === this.leaveTypesCode?.miscarriageLeave
    ) {
      return true;
    }
    return false;
  }

  /* How error if type or size issue in the attachment */
  onSizeOrTypeErrorInSelectDocument(event: Event) {
    const isError = (event as unknown) as boolean;
    this.documentSizeOrTypeError = isError;
    this.scrollToTopForErrorView();
  }

  /* Give error if double file extension issue in the attachment */
  onDoubleFileExtensionErrorInSelectDocument(event: Event) {
    const isError = (event as unknown) as boolean;
    this.doubleFileExtensionError = isError;
    this.scrollToTopForErrorView();
  }

  /* If approved pending leave errror */
  onApprovedPendingLeaveError(isError: boolean) {
    this.approvedPendingLeaveCancellationError = isError;
    this.scrollToTopForErrorView();
  }

  /* Function which hit when click on the buttons in request component */
  adobeAnalyticsOnClickOfButtons(clickName: string) {
    const formTitleLabel = this.isFormDisabled
      ? this.dialogViewEditLabels.labelDialogView
      : this.dialogViewEditLabels.labelDialogViewEdit;

    this.analyticsService.clickEventDatalayer({
      isErrorPage: false,
      siteSection: this.data.siteSection,
      siteSubSection: formTitleLabel,
      clickInfo: {
        clickName,
        clickComponentType: AnalyticsComponent.BUTTON,
        componentName: formTitleLabel,
        componentID: `${this.data.siteSection}_${formTitleLabel}_${clickName}`,
      },
    });
  }

  adobeAnalyticsOnFirstFormStart(clickName: string) {
    const formTitleLabel = this.isFormDisabled
      ? this.dialogViewEditLabels.labelDialogView
      : this.dialogViewEditLabels.labelDialogViewEdit;

    const payloadData = {
      isErrorPage: false,
      siteSection: this.data.siteSection,
      siteSubSection: formTitleLabel,
      form: {
        clickName,
        formName: formTitleLabel,
      },
    };

    this.analyticsService.formStartDatalayer(payloadData);
  }

  /* Function which hits when we submit the form and need to store in adobe analytics */
  adobeAnalyticsOnClickOfFormSubmit(formData, clickName: string) {
    const formTitleLabel = this.isFormDisabled
      ? this.dialogViewEditLabels.labelDialogView
      : this.dialogViewEditLabels.labelDialogViewEdit;

    this.analyticsService.formCompleteDatalayer({
      isErrorPage: false,
      siteSection: this.data.siteSection,
      siteSubSection: formTitleLabel,
      form: {
        clickName,
        formName: formTitleLabel,
        ...formData.updatedLeaveDetails,
        employeeId: formData.employeeId,
        leaveId: formData.leaveId,
      },
    });
  }

  adobeAnalyticsOnApiError(message: string, code: number, clickName: string) {
    const formTitleLabel = this.isFormDisabled
      ? this.dialogViewEditLabels.labelDialogView
      : this.dialogViewEditLabels.labelDialogViewEdit;

    this.analyticsService.apiErrorDatalayer(
      {
        isErrorPage: false,
        siteSection: this.data.siteSection,
        siteSubSection: formTitleLabel,
        errorInfo: {
          errorCode: code,
          errorName: message,
        },
      },
      clickName,
    );
  }
}
