import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  apiErrorsFormatHandling,
  base64ToBlob,
  dateInYyyyMmDd,
  dateInYyyyMmDdHhMmSs,
  downloadBlobFile,
  getAemDamFullPath,
  startDateBeforeEndDateValidator,
} from '../../../../utils/utils';
import {
  checkMandatoryDocumentsInApplyLeaveValidation,
  checkMandatoryFieldsInApplyLeaveValidation,
} from '../leave-common-functions';
import { newLeaveRequestJson } from '../leave-constant';
import { NewRequestService } from '../services/new-request.service';
import { CommonService } from '../../shared/services/common.service';
import { AdobeAnalyticsService } from '../../shared/services/adobe-analytics.service';
import { StorageEncryptionService } from '../../shared/services/storage-encryption.service';
import { DebugService } from '../../shared/services/debug.service';
import { AnalyticsComponent } from '../../shared/constants';
import { CommonSuccessDialogWithoutButtonsComponent } from '../../shared/components/common-success-dialog-without-buttons/common-success-dialog-without-buttons.component';

interface Options {
  value: string;
  label: string;
}
interface LeaveTypeWithBalanceOptions {
  value: string;
  label: string;
  balance: string;
}

interface AboutLeaveObjectInterface {
  title: string;
  shortDescription: {
    plaintext: string;
  };
  pdfPath: {
    _path: string;
  };
  pdfUrl: string;
  iconPath: string;
  iconName: string;
  buttonIconName: string;
  buttonLabel: string;
}

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.scss'],
})
export class NewRequestComponent implements OnInit {
  @Output() openRequestLeaveTabEvent = new EventEmitter<void>();

  @Input()
  siteSection: string;

  @Input() newRequestLabels: any;

  @Input() uploadDocumentLabels: any;

  constructor(
    public dialog: MatDialog,
    private newRequestService: NewRequestService,
    private commonService: CommonService,
    private analyticsService: AdobeAnalyticsService,
    private storageEncryptionService: StorageEncryptionService,
    private debugService: DebugService
  ) {}

  selectedUploadDocument = null;

  leaveTypesCode = newLeaveRequestJson.leaveTypeCode;

  leaveTypesInfo = newLeaveRequestJson.leaveTypeInfo;

  leaveInputFieldsTitle = newLeaveRequestJson.leaveInputFieldsTitle;

  leaveBalanceDynamicTitle = '';

  userLocale: string;

  applyLeaveFieldsConstant = newLeaveRequestJson.fields;

  documentMandatoryError = false;

  fieldMandatoryError = false;

  showLeaveBalanceField = false;

  errorFileUploadingMultipleTimesError = false;

  employeeChildAgeOptionsArray = [
    { value: '1', label: 'Age greater than 2' },
    { value: '2', label: 'Age less than 2' },
  ];

  applyLeaveForm: FormGroup;

  fractionQuantityOptions: Options[] =
    newLeaveRequestJson.fractionQuantityOptions;

  leaveTypesOptionArray: LeaveTypeWithBalanceOptions[];

  isAttachmentFileUploaded: boolean = false;

  /* Size or type error variable */
  documentSizeOrTypeError = false;

  /* Double file extension error */
  doubleFileExtensionError = false;

  /* Store array of errors we get on API error */
  apiErrors = [];

  /* About leave object,which holds the details about the selected leave type */
  aboutLeavesList = [];

  /* About selected leave */
  aboutSelectedLeave: AboutLeaveObjectInterface;

  /* Show or hide file uploader on the file change */
  showFileUploader = true;

  /* Flag to show page only if created form */
  formIsCreated = false;

  /* loading on submit application */
  isLoadingOnLeaveSubmit = false;

  formHasFirstValue = false;

  fieldChanges: { [key: string]: boolean } = {};

  ngOnInit(): void {
    this.filterLeaveInSelectOptions();

    /* Get employee child age options for dropdown */
    this.getChildAgeOptionsListFromPickList();
    /* Get about leave data according to the selected leave type */
    this.commonService.getEmpDataStatus().subscribe((loaded) => {
      if (loaded) {
        this.userLocale = this.commonService.getLocale();
        this.getLeaveDescriptionList();
      }
    });
    this.createApplyLeaveForm();

    /* On the first change of form send and hit to adobe analytics */
    this.applyLeaveForm.valueChanges.subscribe(() => {
      Object.keys(this.applyLeaveForm.controls).forEach((key) => {
        if (
          !this.fieldChanges[key] &&
          this.applyLeaveForm.controls[key].dirty &&
          this.formHasFirstValue === false
        ) {
          this.fieldChanges[key] = true;
          this.formHasFirstValue = true;

          this.adobeAnalyticsOnFirstFormClick(key);
        }
      });
    });
  }

  redirectToRequestPage() {
    this.openRequestLeaveTabEvent.emit();
  }

  /* Function to filter Leave Types and leave balance */
  filterLeaveInSelectOptions() {
    this.newRequestService
      .getLeaveTypeAndBalanceApi(
        dateInYyyyMmDd(this.applyLeaveForm?.value?.startDate)
      )
      ?.subscribe(
        (res) => {
          if (res?.data?.leaveTypes) {
            const filteredArr = res?.data?.leaveTypes?.map((leaveItem) => ({
              label: leaveItem?.leaveDescription,
              value: leaveItem?.leaveCode,
              balance: leaveItem?.leaveBalance,
            }));
            this.leaveTypesOptionArray = filteredArr;

            this.getLeaveBalance();
          }
        },
        (err) => this.debugService.log('error while getting leave details', err)
      );
  }

  /* Function to get leave duration between start date and enddate with leave code */
  getLeaveDurationAndReturnToWorkFromApi() {
    if (
      this.applyLeaveForm?.value?.startDate &&
      this.applyLeaveForm?.value?.endDate &&
      this.applyLeaveForm?.value?.leaveType
    ) {
      /* Reset the duration and return to work before getting updated data */
      this.applyLeaveForm.controls.leaveDuration.setValue(null);
      this.applyLeaveForm.controls.returningToWorkDate.setValue(null);
      const payload = {
        leaveCode: this.applyLeaveForm?.value?.leaveType,
        startDate: dateInYyyyMmDdHhMmSs(this.applyLeaveForm?.value?.startDate),
        endDate: dateInYyyyMmDdHhMmSs(this.applyLeaveForm?.value?.endDate),
      };

      this.newRequestService.getDurationAndReturnToWork(payload)?.subscribe(
        (res) => {
          if (res && 'data' in res) {
            if ('duration' in res.data) {
              this.applyLeaveForm.controls.leaveDuration.setValue(
                res.data.duration
              );
            }

            if ('returningToWorkDate' in res.data) {
              this.applyLeaveForm.controls.returningToWorkDate.setValue(
                res.data.returningToWorkDate
              );
            }
          }
        },
        (err) => {
          this.debugService.log(
            'Error while getting leave duration and return to work',
            err
          );
        }
      );
    }
  }

  /* Creating apply leave form */
  createApplyLeaveForm() {
    /* Leave form using Reactive forms */
    this.applyLeaveForm = new FormGroup(
      {
        leaveType: new FormControl(null, [Validators.required]),
        startDate: new FormControl(null, [Validators.required]),
        endDate: new FormControl(null, [Validators.required]),
        leaveReason: new FormControl(null, [Validators.maxLength(500)]),
        leaveDuration: new FormControl(null, []),
        fractionQuantity: new FormControl(null, []),
        leaveBalance: new FormControl(null, []),

        dateOfDelivery: new FormControl(null, []),
        employeeChildAge: new FormControl(null, []),
        dateOfRelocation: new FormControl(null, []),
        expectedDateOfDelivery: new FormControl(null, []),
        expectedOrActualDateOfChildBirth: new FormControl(null, []),
        compoffDate: new FormControl(null, []),
        miscarriageMedicalDate: new FormControl(null, []),

        returningToWorkDate: new FormControl(null, []),
        attachmentId: new FormControl(null, []),
        attachmentName: new FormControl(null, []),
      },
      { validators: startDateBeforeEndDateValidator() }
    );

    /* If form is created show screen */
    if (this.applyLeaveForm) {
      this.formIsCreated = true;
    }
  }

  /* Get employee's child dropdown options from picklist */
  getChildAgeOptionsListFromPickList() {
    const requestBody = {
      picklistId: ['childage'],
    };
    this.commonService?.getPickList(requestBody)?.subscribe(
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
      }
    );
  }

  /* Function perform on the submit of leave application */
  onApplyLeaveFormSubmit() {
    /* Before submitting apply leave request removing all errors */
    this.apiErrors = [];
    const formValues = this.applyLeaveForm?.value;

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

    const duration =
      updatedFractionalQuantity !== null
        ? parseFloat(updatedFractionalQuantity.toString())
        : formValues?.leaveDuration;
    const payload = {
      leaveCode: formValues?.leaveType,
      startDate: dateInYyyyMmDdHhMmSs(formValues?.startDate),
      endDate: dateInYyyyMmDdHhMmSs(formValues?.endDate),
      leaveReason: formValues?.leaveReason,
      attachmentId: formValues?.attachmentId,
      leaveDuration: duration,
      returningToWorkDate: dateInYyyyMmDdHhMmSs(
        formValues?.returningToWorkDate
      ),
      fractionQuantity: updatedFractionalQuantity,
      dateOfDelivery: dateInYyyyMmDdHhMmSs(formValues?.dateOfDelivery),
      employeeChildAge: formValues?.employeeChildAge,
      dateOfRelocation: dateInYyyyMmDdHhMmSs(formValues?.dateOfRelocation),
      expectedDateOfDelivery: dateInYyyyMmDdHhMmSs(
        formValues?.expectedDateOfDelivery
      ),
      childDateOfBirth: dateInYyyyMmDdHhMmSs(
        formValues?.expectedOrActualDateOfChildBirth
      ),
      compoffDate: dateInYyyyMmDdHhMmSs(formValues?.compoffDate),
      miscarriageMedicalDate: dateInYyyyMmDdHhMmSs(
        formValues?.miscarriageMedicalDate
      ),
    };

    if (
      checkMandatoryFieldsInApplyLeaveValidation(
        this.applyLeaveForm.value,
        this.leaveTypesCode
      )
    ) {
      this.debugService.log('Fill the mandatory fields');
    } else if (
      checkMandatoryDocumentsInApplyLeaveValidation(
        this.applyLeaveForm,
        this.leaveTypesCode,
        this.selectedUploadDocument
      )
    ) {
      this.debugService.log('UI error', 'Document is madatory');
    } else {
      this.isLoadingOnLeaveSubmit = true;
      this.newRequestService.createNewLeaveRequestApi(payload)?.subscribe(
        () => {
          this.dialog.open(CommonSuccessDialogWithoutButtonsComponent, {
            data: {
              ...newLeaveRequestJson?.dialogInfo?.applyLeaveSuccess,
              iconPath: getAemDamFullPath(
                newLeaveRequestJson?.dialogInfo?.applyLeaveSuccess?.iconPath
              ),
            },
            autoFocus: false,
          });
          this.isLoadingOnLeaveSubmit = false;
          this.resetLeaveApplicationForm();
          this.filterLeaveInSelectOptions();
          /* After 5 seconds of application submittion redirect the user to request leaves page  */
          setTimeout(() => {
            this.redirectToRequestPage();
          }, 5000);
          /* Hit the adobe analytics function which help to store the form data we are trying to submit */
          this.adobeAnalyticsOnClickOfFormSubmit(
            {
              ...payload,
              leaveType: this.getLeaveTypeLabel(formValues.leaveType),
            },
            this.newRequestLabels.btnSubmit
          );
        },
        (error) => {
          this.isLoadingOnLeaveSubmit = false;
          const errorMessage = error?.error?.status?.message;
          const errorCode = error?.error?.status?.code;

          this.showApiErrorMessages(errorMessage);
          /* Adobe analytics hits once get API error */

          this.adobeAnalyticsOnApiError(
            errorMessage,
            errorCode,
            this.newRequestLabels.btnSubmit
          );
        }
      );
    }
  }

  getLeaveTypeLabel(value: string): string {
    const foundOption = this.leaveTypesOptionArray.find(
      (option) => option.value === value
    );

    return foundOption ? foundOption.label : '';
  }

  showApiErrorMessages(error) {
    this.apiErrors = apiErrorsFormatHandling(error);
  }

  /* Function to check the form validation */
  checkValidation() {
    this.documentMandatoryError = false;
    this.fieldMandatoryError = false;
    const isDocumentMandatoryError =
      checkMandatoryDocumentsInApplyLeaveValidation(
        this.applyLeaveForm.value,
        this.leaveTypesCode,
        this.selectedUploadDocument
      );

    const isFieldMandatoryError = checkMandatoryFieldsInApplyLeaveValidation(
      this.applyLeaveForm.value,
      this.leaveTypesCode
    );

    if (isDocumentMandatoryError) {
      this.documentMandatoryError = true;
      return true;
    }

    if (isFieldMandatoryError) {
      this.fieldMandatoryError = false;
      return true;
    }

    if (!this.applyLeaveForm.value.leaveDuration) {
      return true;
    }

    if (
      this.applyLeaveForm.value?.leaveType ===
        this.leaveTypesCode?.casualLeave &&
      this.applyLeaveForm?.value?.leaveDuration === 1 &&
      !this.applyLeaveForm.value.fractionQuantity
    ) {
      return true;
    }

    return false;
  }

  /* Get leave balance */
  getLeaveBalance() {
    const leave = this.leaveTypesOptionArray?.find(
      (ele) => ele?.value === this.applyLeaveForm?.value?.leaveType
    );
    if (leave?.balance) {
      this.applyLeaveForm?.controls.leaveBalance.setValue(leave?.balance);
    } else {
      this.applyLeaveForm?.controls.leaveBalance.setValue(0);
    }
  }

  /* On leave type change */
  selectValueChange(event) {
    /* If leave type selected and it have label then set as leave title */
    if (event.label) {
      this.leaveBalanceDynamicTitle = event.label;
    } else {
      this.leaveBalanceDynamicTitle = '';
    }

    this.getLeaveBalance();
    this.checkValidation();

    /* Showing leave balance field or not */
    this.showLeaveBalance();

    /* Update about leave section */
    this.updateAboutLeaveSection();

    // Check for leave duration change
    if (
      this.applyLeaveForm?.value?.startDate &&
      this.applyLeaveForm?.value?.endDate
    ) {
      this.getLeaveDurationAndReturnToWorkFromApi();
    }
  }

  /* Show or hide leave balance field */
  showLeaveBalance() {
    if (
      this.applyLeaveForm?.value?.leaveType ===
        this.leaveTypesCode.casualLeave ||
      this.applyLeaveForm?.value?.leaveType === this.leaveTypesCode.sickLeave ||
      this.applyLeaveForm?.value?.leaveType ===
        this.leaveTypesCode.privilegeLeave
    ) {
      this.showLeaveBalanceField = true;
    } else {
      this.showLeaveBalanceField = false;
    }
  }

  /* On the change of fractional quantity */
  onFractionalQuantityChange() {
    this.checkValidation();
  }

  /* When ever there will be a change in startdate and endDate */
  dateValueChange() {
    this.checkValidation();
    // Check for leave duration change
    if (this.applyLeaveForm?.value?.leaveType) {
      this.getLeaveDurationAndReturnToWorkFromApi();
      /* Check for leave balance and types again */
      this.filterLeaveInSelectOptions();
    }
  }

  /* Update about leave section with change in leave type */
  updateAboutLeaveSection() {
    if (this.applyLeaveForm?.value?.leaveType) {
      const filteredAboutLeave = this.aboutLeavesList.find(
        (item) => item.leaveCode === this.applyLeaveForm?.value?.leaveType
      );
      this.aboutSelectedLeave = filteredAboutLeave;
    }
  }

  /* Function to update the data in about leave section using AEM based api to get the data */
  getLeaveDescriptionList() {
    this.newRequestService.getAboutLeaveDataFromAEM(this.userLocale)?.subscribe(
      (res) => {
        if (res?.data?.leaveDescriptionList?.items) {
          this.aboutLeavesList = res.data.leaveDescriptionList.items;
        }
      },
      (err) => {
        this.debugService.log('error while fetching leaves description', err);
      }
    );
  }

  /* Upload file document */
  selectedDocument(value) {
    if (value?.progress !== 100) {
      this.uploadApplyLeaveDocument(value);
    }
  }

  /* On File Successfully Upload */
  onFileSuccessfullyUpload(file) {
    this.isAttachmentFileUploaded = true;
    this.selectedUploadDocument = file;
    this.applyLeaveForm?.controls.attachmentName.setValue(file.name);
    setTimeout(() => {
      this.showFileUploader = false;
    }, 1000);
  }

  /* API for attachment upload */
  uploadApplyLeaveDocument(file: File) {
    this.newRequestService.uploadAttachmentWithApi(file)?.subscribe(
      (res) => {
        this.applyLeaveForm.controls.attachmentId.setValue(
          res.data.attachmentId
        );

        this.adobeAnalyticsOnClickOfButtons(
          this.newRequestLabels.labelUploadDocument
        );

        this.onFileSuccessfullyUpload(file);
        this.errorFileUploadingMultipleTimesError = false;
      },
      (err) => {
        if (err?.status.code !== 200) {
          this.errorFileUploadingMultipleTimesError = true;
          this.onRemoveDocumentButtonClick();
        }
        this.debugService.log('Error while uploading leave attachment', err);
      }
    );
  }

  /* View selected document */
  viewDocument() {
    this.newRequestService
      .getUploadedAttachment(this.applyLeaveForm?.controls.attachmentId.value)
      ?.subscribe(
        (res) => {
          if (res?.data?.fileContent) {
            const blob = base64ToBlob(
              res.data.fileContent,
              this.selectedUploadDocument?.type
            );

            this.adobeAnalyticsOnClickOfButtons(
              this.newRequestLabels.labelView
            );

            downloadBlobFile(blob);
          } else {
            this.debugService.error('Invalid response or missing URL');
          }
        },
        (error) => {
          this.debugService.error('Error fetching PDF URL:', error);
        }
      );
  }

  onRemoveDocumentButtonClick() {
    this.adobeAnalyticsOnClickOfButtons(this.newRequestLabels.labelDelete);

    this.removeDocument();
  }

  /* Remove selected document */
  removeDocument() {
    this.selectedUploadDocument = null;
    this.applyLeaveForm.controls.attachmentId.setValue(null);
    this.applyLeaveForm.controls.attachmentName.setValue(null);
    this.showFileUploader = true;
    this.isAttachmentFileUploaded = false;
    this.checkValidation();
  }

  getReturningDateInFormat(date) {
    const dateString = new Date(date);
    /* eslint-disable no-unsafe-optional-chaining */
    if (date) {
      return `${dateString?.getDate()}/${
        dateString?.getMonth() + 1
      }/${dateString?.getFullYear()}`;
    }
    return '-';
  }

  onResetButtonClick() {
    this.adobeAnalyticsOnClickOfButtons(this.newRequestLabels.btnReset);

    this.resetLeaveApplicationForm();
  }

  /* For resetting leave application form */
  resetLeaveApplicationForm() {
    this.apiErrors = [];
    this.applyLeaveForm.reset();
    this.removeDocument();
    this.getLeaveBalance();
    this.documentMandatoryError = false;
    this.fieldMandatoryError = false;
    this.documentSizeOrTypeError = false;
    this.doubleFileExtensionError = false;
    this.formHasFirstValue = false;
  }

  /* Comparissions */
  showDateOfRelocation() {
    if (
      this.applyLeaveForm.value?.leaveType ===
        this.leaveTypesCode?.relocationGma ||
      this.applyLeaveForm.value?.leaveType ===
        this.leaveTypesCode?.relocationPdr ||
      this.applyLeaveForm.value?.leaveType ===
        this.leaveTypesCode?.relocationTdr ||
      this.applyLeaveForm.value?.leaveType ===
        this.leaveTypesCode?.repatriationGma
    ) {
      return true;
    }
    return false;
  }

  showDateOfDelivery() {
    if (
      this.applyLeaveForm.value?.leaveType ===
        this.leaveTypesCode?.maternityLeave ||
      this.applyLeaveForm.value?.leaveType ===
        this.leaveTypesCode?.paternityLeave
    ) {
      return true;
    }
    return false;
  }

  showDateOfCompoff() {
    if (
      this.applyLeaveForm.value?.leaveType === this.leaveTypesCode?.compensatory
    ) {
      return true;
    }
    return false;
  }

  showDateOfMiscarriage() {
    if (
      this.applyLeaveForm.value?.leaveType ===
      this.leaveTypesCode?.miscarriageLeave
    ) {
      return true;
    }
    return false;
  }

  isLeaveAdoption() {
    if (
      this.applyLeaveForm.value?.leaveType ===
      this.leaveTypesCode?.adoptionLeave
    ) {
      return true;
    }
    return false;
  }

  showExpectedDateOfChild() {
    if (
      this.applyLeaveForm.value?.leaveType ===
        this.leaveTypesCode?.surrogacyLeave ||
      this.applyLeaveForm.value?.leaveType ===
        this.leaveTypesCode?.surrogacyLeaveFather
    ) {
      return true;
    }
    return false;
  }

  showActualOrExpectedDateOfChild() {
    if (
      this.applyLeaveForm.value?.leaveType ===
      this.leaveTypesCode?.adoptionLeaveFather
    ) {
      return true;
    }
    return false;
  }

  /* for link redirection */
  onNavigateToURL(url: string) {
    window.open(`${url}`, '_blank');
  }

  /* Give error if type or size issue in the attachment */
  onSizeOrTypeErrorInSelectDocument(event: Event) {
    const isError = event as unknown as boolean;
    this.documentSizeOrTypeError = isError;
  }

  /* Give error if double file extension issue in the attachment */
  onDoubleFileExtensionErrorInSelectDocument(event: Event) {
    const isError = event as unknown as boolean;
    this.doubleFileExtensionError = isError;
  }

  onAboutLeaveButtonClick(aboutSelectedLeave) {
    const linkURL = aboutSelectedLeave.pdfUrl
      ? aboutSelectedLeave.pdfUrl
      : aboutSelectedLeave.pdfPath._path;

    this.analyticsService.clickEventDatalayer({
      isErrorPage: false,
      siteSection: this.siteSection,
      siteSubSection: this.newRequestLabels.labelTab,
      linkURL,
      clickInfo: {
        clickName: this.aboutSelectedLeave.buttonLabel,
        clickComponentType: AnalyticsComponent.BUTTON,
        componentName: this.newRequestLabels.labelFormHeading,
        componentID: `${this.siteSection}_${this.newRequestLabels.labelTab}_${this.newRequestLabels.labelFormHeading}`,
      },
    });

    this.onNavigateToURL(linkURL);
  }

  /* Function which hit when click on the buttons in new leave request component */
  adobeAnalyticsOnClickOfButtons(clickName: string) {
    this.analyticsService.clickEventDatalayer({
      isErrorPage: false,
      siteSection: this.siteSection,
      siteSubSection: this.newRequestLabels.labelTab,
      clickInfo: {
        clickName,
        clickComponentType: AnalyticsComponent.BUTTON,
        componentName: this.newRequestLabels.labelFormHeading,
        componentID: `${this.siteSection}_${this.newRequestLabels.labelTab}_${this.newRequestLabels.labelFormHeading}`,
      },
    });
  }

  /* Function which hits when first change in the form */
  adobeAnalyticsOnFirstFormClick(key: string) {
    const payloadData = {
      isErrorPage: false,
      siteSection: this.siteSection,
      siteSubSection: this.newRequestLabels.labelTab,
      form: {
        clickName: key,
        formName: this.newRequestLabels.labelFormHeading,
      },
    };

    this.analyticsService.formStartDatalayer(payloadData);
  }

  /* Function which hits when we submit the form and need to store in adobe analytics */
  adobeAnalyticsOnClickOfFormSubmit(formData, clickName: string) {
    this.analyticsService.formCompleteDatalayer({
      isErrorPage: false,
      siteSection: this.siteSection,
      siteSubSection: this.newRequestLabels.labelTab,
      form: {
        clickName,
        ...formData,
        formName: this.newRequestLabels.labelFormHeading,
      },
    });
  }

  adobeAnalyticsOnApiError(message: string, code: number, clickName: string) {
    this.analyticsService.apiErrorDatalayer(
      {
        isErrorPage: false,
        siteSection: this.siteSection,
        siteSubSection: this.newRequestLabels.labelTab,
        errorInfo: {
          errorCode: code,
          errorName: message,
        },
      },
      clickName
    );
  }
}
