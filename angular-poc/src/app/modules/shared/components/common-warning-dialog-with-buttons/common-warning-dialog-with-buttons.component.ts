import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { AdobeAnalyticsService } from '../../services/adobe-analytics.service';

interface DialogData {
  warningInfo: {
    title: string;
    message: string;
    description: string;
    buttonText: string;
  };

  childInfo: {
    title: string;
    message: string;
    buttonText: string;
  };
}

@Component({
  selector: 'app-common-warning-dialog-with-buttons',
  templateUrl: './common-warning-dialog-with-buttons.component.html',
  styleUrls: ['./common-warning-dialog-with-buttons.component.scss'],
})
export class CommonWarningDialogWithButtonsComponent {
  closeDeleteWarning = false;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<CommonWarningDialogWithButtonsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  cancel() {
    // closing itself and sending data to parent component
    this.dialogRef.close({ data: { flag: false } });
  }

  confirm() {
    // closing itself and sending data to parent component
    this.dialogRef.close({ data: { flag: true } });
  }
}
