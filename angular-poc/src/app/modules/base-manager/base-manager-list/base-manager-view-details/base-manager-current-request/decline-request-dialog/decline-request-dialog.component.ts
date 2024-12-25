import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { BaseManagerService } from 'src/app/modules/base-manager/base-manager.service';
import { CommonSuccessDialogWithoutButtonsComponent } from 'src/app/shared/components/common-success-dialog-without-buttons/common-success-dialog-without-buttons.component';
import { AnalyticsComponent } from 'src/app/shared/constants';
import { AdobeAnalyticsService } from 'src/app/shared/services/adobe-analytics.service';
import { DebugService } from 'src/app/shared/services/debug.service';
import { getAemDamFullPath } from 'utils/utils';

@Component({
  selector: 'app-decline-request-dialog',
  templateUrl: './decline-request-dialog.component.html',
  styleUrls: ['./decline-request-dialog.component.scss'],
})
export class DeclineRequestDialogComponent implements OnInit {
  rejectForm: FormGroup;

  declinedIconPath: string;

  dialogRejectAcm: any;

  commentMaxLength: number;

  formHasFirstValue = false;

  siteSection: string;

  siteSubSection: string;

  fieldChanges: { [key: string]: boolean } = {};

  allowedPattern: RegExp = /^[a-zA-Z0-9&( )?/,.\-_@:;]*$/;

  constructor(
    public dialog: MatDialog,
    private baseManagerService: BaseManagerService,
    private analyticsService: AdobeAnalyticsService,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<DeclineRequestDialogComponent>,
    private debugService: DebugService,
  ) {}

  ngOnInit(): void {
    this.commentMaxLength = parseInt(
      this.data?.dialogDeclinedAcm?.commentMaxLength,
      10,
    );
    this.dialogRejectAcm = this.data?.dialogRejectAcm;
    this.rejectForm = new FormGroup({
      comment: new FormControl({ value: '', disabled: false }, [
        Validators.required,
      ]),
    });

    this.declinedIconPath = getAemDamFullPath(
      this.data?.dialogDeclinedAcm?.iconDialogDeclinedAcm,
    );

    if (this.rejectForm) {
      this.rejectForm.valueChanges.subscribe(() => {
        Object.keys(this.rejectForm.controls).forEach((key) => {
          if (
            !this.fieldChanges[key]
            && this.rejectForm.controls[key].dirty
            && this.formHasFirstValue === false
          ) {
            this.fieldChanges[key] = true;
            this.formHasFirstValue = true;

            this.adobeAnalyticsOnFirstFormClick(key, 'Reject request');
          }
        });
      });
    }
  }

  // Attempt to close dialog
  closeDialog(type: string): void {
    this.adobeAnalyticsOnButtonClick(this.dialogRejectAcm.labelBtnCancel);
    this.adobeAnalyticsOnClickOfFormSubmit(
      this.rejectForm,
      this.dialogRejectAcm.labelBtnCancel,
      this.dialogRejectAcm.labelDialogRejectAcm,
    );
    this.dialogRef.close({ event: type });
  }

  // Attempt to submit
  onSubmit() {
    // post data.
    const data = {
      requestNo: this.data?.requestNo,
      approve: false,
      comment: this.rejectForm.value.comment,
    };

    if (this.rejectForm.valid) {
      this.baseManagerService.submitDeclineRequest(data).subscribe(
        (res) => {
          if (res?.status?.code === 200) {
            // Dismiss dialog
            this.closeDialog('refresh');

            // Open Dialog
            this.dialog.open(CommonSuccessDialogWithoutButtonsComponent, {
              autoFocus: false,
              data: {
                title: this.data?.dialogDeclinedAcm?.labelDialogDeclinedAcm,
                message: this.data?.dialogDeclinedAcm?.labelDialogDeclinedMsg,
                iconPath: this.declinedIconPath,
                iconColor: 'success',
              },
            });
            this.adobeAnalyticsOnClickOfFormSubmit(
              this.rejectForm,
              this.dialogRejectAcm.btnReject,
              this.dialogRejectAcm.labelDialogRejectAcm,
            );
          }
          this.rejectForm.reset();
        },
        (error) => {
          this.debugService.error('error', error);
        },
      );
    }
  }

  adobeAnalyticsOnButtonClick(clickName: string) {
    this.analyticsService.trackClickEvent({
      siteSection: this.siteSection,
      siteSubSection: this.siteSubSection,
      clickName,
      clickComponentType: AnalyticsComponent.BUTTON,
      componentName: clickName,
    });
  }

  adobeAnalyticsOnFirstFormClick(key: string, formName: string) {
    const payloadData = {
      isErrorPage: false,
      siteSection: this.siteSection,
      siteSubSection: this.siteSubSection,
      form: {
        clickName: key,
        formName,
      },
    };

    this.analyticsService.formStartDatalayer(payloadData);
  }

  adobeAnalyticsOnClickOfFormSubmit(
    formData,
    clickName: string,
    formName: string,
  ) {
    this.analyticsService.formCompleteDatalayer({
      isErrorPage: false,
      siteSection: this.siteSection,
      siteSubSection: this.siteSubSection,
      form: {
        clickName,
        ...formData,
        formName,
      },
    });
  }

  onKeydown(e: KeyboardEvent): void {
    if (!this.allowedPattern.test(e.key)) {
      e.preventDefault();
    }
  }

  onPaste(event: ClipboardEvent): void {
    event.preventDefault();

    const clipboardText = event.clipboardData.getData('text');

    const filteredText = clipboardText
      .split('')
      .filter((char) => this.allowedPattern.test(char))
      .join('');

    const target = event.target as HTMLTextAreaElement;
    const cursorPos = target.selectionStart || 0;
    const selectionEnd = target.selectionEnd || cursorPos;

    target.value = target.value.slice(0, cursorPos)
      + filteredText
      + target.value.slice(selectionEnd);

    target.setSelectionRange(
      cursorPos + filteredText.length,
      cursorPos + filteredText.length,
    );
  }
}
