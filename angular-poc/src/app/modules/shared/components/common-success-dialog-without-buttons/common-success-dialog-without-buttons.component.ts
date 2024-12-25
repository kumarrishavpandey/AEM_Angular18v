import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';

interface DialogData {
  iconPath: string;
  title: string;
  message: string;
  iconColor: string;
}

@Component({
  selector: 'app-common-success-dialog-without-buttons',
  templateUrl: './common-success-dialog-without-buttons.component.html',
  styleUrls: ['./common-success-dialog-without-buttons.component.scss'],
})
export class CommonSuccessDialogWithoutButtonsComponent implements OnInit {
  updatedIconPath: string;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<CommonSuccessDialogWithoutButtonsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  /* Close dialog after 1 seconds of opening when get success */
  ngOnInit(): void {
    /* Get icons from AEM */

    this.updatedIconPath = this.data.iconPath;
    if (this.data) {
      setTimeout(() => {
        this.dialog.closeAll();
      }, 5000);
    }
  }
}
