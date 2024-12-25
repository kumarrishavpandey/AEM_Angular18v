import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LOGGEDIN_EMP } from '../../../../../app/app.api';
import { NPSFeedbackConstant } from '../../../../app.label.constant';
import { DebugService } from '../../../shared/services/debug.service';
import { getAemDamFullPath } from '../../../../../utils/utils';
import { CommonService } from '../../services/common.service';
import { StorageEncryptionService } from '../../services/storage-encryption.service';

@Component({
  selector: 'app-nps-feedback',
  templateUrl: './nps-feedback.component.html',
  styleUrls: ['./nps-feedback.component.scss'],
})
export class NpsFeedbackComponent implements OnInit {
  // Constant
  constantData: any = NPSFeedbackConstant;

  // Form
  feedbackForm: FormGroup;

  // Rating
  selectedRating: number = 0;

  ratingMessage: string = '';

  ratings: any = [
    {
      ratingNumber: 1,
      color: '#D93449',
      checked: false,
    },
    {
      ratingNumber: 2,
      color: '#F15F31',
      checked: false,
    },
    {
      ratingNumber: 3,
      color: '#FF8C00',
      checked: false,
    },
    {
      ratingNumber: 4,
      color: '#FFAD49',
      checked: false,
    },
    {
      ratingNumber: 5,
      color: '#FFDD83',
      checked: false,
    },
    {
      ratingNumber: 6,
      color: '#E5F56C',
      checked: false,
    },
    {
      ratingNumber: 7,
      color: '#A1F778',
      checked: false,
    },
    {
      ratingNumber: 8,
      color: '#91F2A7',
      checked: false,
    },
    {
      ratingNumber: 9,
      color: '#70D587',
      checked: false,
    },
    {
      ratingNumber: 10,
      color: '#47CC66',
      checked: false,
    },
  ];

  successScreenToggle = false;

  thumbsUpImage: string;

  constructor(
    public dialogRef: MatDialogRef<NpsFeedbackComponent>,
    private builder: FormBuilder,
    public dialog: MatDialog,
    private storageEncryptionService: StorageEncryptionService,
    private commonService: CommonService,
    private debugService: DebugService
  ) {}

  // On initilization
  ngOnInit() {
    this.feedbackForm = this.builder.group({
      feedback: ['', Validators.maxLength(4000)],
    });

    this.getThumbsUpImage();
  }

  getThumbsUpImage() {
    const endPoint = '/content/dam/my-ai/icon/thumb-up.gif';
    const fullUrl = getAemDamFullPath(endPoint);
    this.thumbsUpImage = fullUrl;
  }

  /**
   * Attempt to click on rating
   * @param rating selected rating number
   */
  onClickRating(rating: number) {
    this.selectedRating = rating;
    /* eslint-disable no-plusplus */
    for (let i = 1; i <= this.selectedRating; i++) {
      this.ratings[i - 1].checked = true;
    }
    /* eslint-disable no-plusplus */
    for (let i = 9; i > this.selectedRating - 1; i--) {
      this.ratings[i].checked = false;
    }

    // Set feedback message
    this.setFeedbackMessage();
  }

  // Attempt to set message on selection of rating
  setFeedbackMessage() {
    if (this.selectedRating >= 1 && this.selectedRating <= 6) {
      this.ratingMessage = this.constantData.label.ratingOneToSixLabel;
    } else if (this.selectedRating >= 7 && this.selectedRating <= 8) {
      this.ratingMessage = this.constantData.label.ratingSevenToEightLabel;
    } else if (this.selectedRating >= 9 && this.selectedRating <= 10) {
      this.ratingMessage = this.constantData.label.ratingNineToTenLabel;
    } else {
      this.ratingMessage = '';
    }
  }

  // Attempt to close dialog
  closeDialog(type: string): void {
    this.dialogRef.close({ event: type });
  }

  // Attempt to submit feedback form
  onSubmit(): void {
    if (this.selectedRating !== 0) {
      const data = {
        userId: this.storageEncryptionService.getvalue(LOGGEDIN_EMP),
        rating: this.selectedRating,
        comments: this.feedbackForm?.value?.feedback,
      };

      // Submit request
      this.commonService.submitNPSFeedback(data).subscribe(
        (res) => {
          if (res?.status?.code === 200) {
            // Display success screen
            this.successScreenToggle = true;
            this.waitForLoggedInEmployeeData().then(() => {
              this.commonService.loggedInEmployeeData.feedbackRequired = 'NO';
            });
            // Dismiss dialog
            setTimeout(() => {
              this.closeDialog('refresh');
            }, 5000);
          }
          this.resetForm();
        },
        (error) => {
          this.debugService.log('error', error?.message);
        }
      );
    }
  }

  // Reset feedback form
  resetForm() {
    this.selectedRating = 0;
    /* eslint-disable no-plusplus */
    for (let i = 9; i >= this.selectedRating; i--) {
      this.ratings[i].checked = false;
    }
    this.feedbackForm.reset();
  }

  private waitForLoggedInEmployeeData(): Promise<void> {
    return new Promise<void>((resolve) => {
      const checkForValue = () => {
        if (
          this.commonService?.loggedInEmployeeData !== undefined &&
          Object.keys(this.commonService?.loggedInEmployeeData).length > 0
        ) {
          resolve();
        } else {
          setTimeout(checkForValue, 100);
        }
      };

      checkForValue();
    });
  }
}
