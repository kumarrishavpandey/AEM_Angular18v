// import { Injectable } from '@angular/core';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { EnumSnackBarHorizontalPosition, EnumSnackBarType, EnumSnackBarVerticalPosition } from '../components/common-snackbar/common-snackbar.enum';

// interface SnackBarConfig {
//   siteSection: string;
//   siteSubSection: string;
//   componentName: string;
//   message: string;
//   snackBarType: EnumSnackBarType;
//   horizontalPosition?: EnumSnackBarHorizontalPosition;
//   verticalPosition?: EnumSnackBarVerticalPosition;
//   duration?: number;
//   showIcon?: boolean;
//   showMsgType?: boolean;
//   action?: string;
//   handleActionClick?: Function;
// }

// @Injectable({
//   providedIn: 'root',
// })
// export class NotificationService {
//   duration = 5000;

//   constructor(private snackBar: MatSnackBar) {}

//   showInfo(message: string, duration: number = 3000) {
//     this.snackBar.openFromComponent(SnackBarComponent, {
//       horizontalPosition: 'right',
//       verticalPosition: 'top',
//       data: { message, type: 'info' },
//       duration,
//       panelClass: 'snackbar-info',
//     });
//   }

//   showSuccess(message: string, duration: number = 3000) {
//     this.snackBar.openFromComponent(SnackBarComponent, {
//       horizontalPosition: 'right',
//       verticalPosition: 'top',
//       data: { message, type: 'success' },
//       duration,
//       panelClass: 'snackbar-success',
//     });
//   }

//   showError(message: string, duration: number = 3000) {
//     this.snackBar.openFromComponent(SnackBarComponent, {
//       horizontalPosition: 'right',
//       verticalPosition: 'top',
//       data: { message, type: 'error' },
//       duration,
//       panelClass: 'snackbar-error',
//     });
//   }

//   showInfoBottom(message: string, duration: number = 3000) {
//     this.snackBar.openFromComponent(SnackBarComponent, {
//       data: { message, type: 'info' },
//       duration,
//       panelClass: 'snackbar-info-bottom',
//     });
//   }

//   showSuccessBottom(message: string, duration: number = 3000) {
//     this.snackBar.openFromComponent(SnackBarComponent, {
//       data: { message, type: 'success' },
//       duration,
//       panelClass: 'snackbar-success-bottom',
//     });
//   }

//   showErrorBottom(message: string, duration: number = 3000) {
//     this.snackBar.openFromComponent(SnackBarComponent, {
//       data: { message, type: 'error' },
//       duration,
//       panelClass: 'snackbar-error-bottom',
//     });
//   }

//   showSnackBar(data: SnackBarConfig) {
//     this.snackBar.openFromComponent(CommonSnackbarComponent, {
//       horizontalPosition: data.horizontalPosition || EnumSnackBarHorizontalPosition.RIGHT,
//       verticalPosition: data.verticalPosition || EnumSnackBarVerticalPosition.TOP,
//       data: {
//         type: data.snackBarType || EnumSnackBarType.INFO,
//         message: data.message,
//         showIcon: typeof data.showIcon === 'boolean' ? data.showIcon : true,
//         showMsgType: typeof data.showMsgType === 'boolean' ? data.showMsgType : true,
//         action: data.action || null,
//         handleActionClick: data.handleActionClick,
//       },
//       duration: data.duration || this.duration,
//       panelClass: `snackbar-${data.snackBarType || EnumSnackBarType.INFO}-${data.verticalPosition || EnumSnackBarVerticalPosition.TOP}`,
//     });
//   }
// }
