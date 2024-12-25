// import {
//   ComponentFixture,
//   TestBed,
//   fakeAsync,
//   tick,
// } from '@angular/core/testing';

// import { HttpClientModule } from '@angular/common/http';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import {
//   FormControl, FormGroup, FormsModule, ReactiveFormsModule,
// } from '@angular/forms';
// import {
//   MatDialog,
//   MatDialogModule,
//   MatDialogRef,
// } from '@angular/material/dialog';
// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { BrowserTestingModule } from '@angular/platform-browser/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { of, throwError } from 'rxjs';
// import { AngularMaterialModule } from 'src/app/angular-material.module';
// import { DebugServiceMock } from 'src/app/shared/services/debug.service.mock';
// import { CommonServiceMock } from '../../services/__mock__/common.service.mock';
// import { StorageEncryptionServiceMock } from '../../services/__mock__/storage-encryption.service.mock';
// import { CommonService } from '../../services/common.service';
// import { DebugService } from '../../services/debug.service';
// import { StorageEncryptionService } from '../../services/storage-encryption.service';
// import { NpsFeedbackComponent } from './nps-feedback.component';

// describe('NpsFeedbackComponent', () => {
//   let component: NpsFeedbackComponent;
//   let fixture: ComponentFixture<NpsFeedbackComponent>;
//   let commonServiceSpy: jasmine.SpyObj<CommonService>;
//   let storageEncryptionServiceSpy: jasmine.SpyObj<StorageEncryptionService>;
//   let debugServiceSpy: jasmine.SpyObj<DebugService>;

//   const mockDialogRef = {
//     close: jasmine.createSpy('close'),
//   };

//   beforeEach(async () => {
//     commonServiceSpy = new CommonServiceMock().commonServiceSpy;

//     storageEncryptionServiceSpy = new StorageEncryptionServiceMock().storageEncryptionServiceSpy;

//     debugServiceSpy = new DebugServiceMock().debugServiceSpy;

//     await TestBed.configureTestingModule({
//       declarations: [NpsFeedbackComponent],
//       imports: [
//         FormsModule,
//         ReactiveFormsModule,
//         MatDialogModule,
//         HttpClientModule,
//         HttpClientTestingModule,
//         BrowserTestingModule,
//         BrowserModule,
//         AngularMaterialModule,
//         BrowserAnimationsModule,
//         RouterTestingModule,
//       ],
//       providers: [
//         { provide: MatDialogRef, useValue: mockDialogRef },
//         { provide: MatDialog, useValue: { open: () => {} } },
//         {
//           provide: StorageEncryptionService,
//           useValue: storageEncryptionServiceSpy,
//         },
//         { provide: CommonService, useValue: commonServiceSpy },
//         {
//           provide: DebugService,
//           useValue: debugServiceSpy,
//         },
//       ],
//     }).compileComponents();
//     fixture = TestBed.createComponent(NpsFeedbackComponent);
//     component = fixture.componentInstance;
//     jasmine.clock().install();
//   });

//   afterEach(() => {
//     jasmine.clock().uninstall();
//   });

//   // Check comoponent
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   describe('shoul initilize on ngOnInit', () => {
//     it('should initialize form on ngOnInit', () => {
//       component.ngOnInit();
//       expect(component.feedbackForm).toBeTruthy();
//     });

//     it('should set feedback control with maximum length of 4000', () => {
//       component.ngOnInit(); // Initialize the component

//       const feedbackControl = component.feedbackForm.get('feedback');
//       expect(feedbackControl.validator).toBeTruthy();

//       feedbackControl.setValue('a'.repeat(4000)); // This should be valid
//       expect(feedbackControl.errors).toBeFalsy();

//       feedbackControl.setValue('a'.repeat(4001));
//       expect(feedbackControl.errors).toBeTruthy();
//       expect(feedbackControl.errors.maxlength).toBeTruthy();
//     });
//   });

//   it('should initialize the feedback form', () => {
//     component.feedbackForm = new FormGroup({
//       feedback: new FormControl(null),
//     });
//     expect(component.feedbackForm).toBeDefined();
//     expect(component.feedbackForm.get('feedback')).toBeTruthy();
//   });

//   describe('When Selecting rating', () => {
//     it('should set feedback message for rating = 5', () => {
//       component.onClickRating(5);
//       expect(component.ratingMessage).toBe(
//         component.constantData.label.ratingOneToSixLabel,
//       );
//     });

//     it('should set feedback message for rating = 8', () => {
//       component.onClickRating(8);
//       expect(component.ratingMessage).toBe(
//         component.constantData.label.ratingSevenToEightLabel,
//       );
//     });

//     it('should set feedback message for rating = 10', () => {
//       component.onClickRating(10);
//       expect(component.ratingMessage).toBe(
//         component.constantData.label.ratingNineToTenLabel,
//       );
//     });

//     it('should set feedback message for rating = null', () => {
//       component.onClickRating(null);
//       expect(component.ratingMessage).toBe('');
//     });
//   });

//   // Close the dialog.
//   it('should cancel the dialog', () => {
//     const dialogRefSpyObj = jasmine.createSpyObj({
//       afterClosed: jasmine.createSpy('afterClosed'),
//       close: jasmine.createSpy('close'),
//     });

//     component.dialogRef = dialogRefSpyObj;
//     component.closeDialog('cancel');

//     expect(dialogRefSpyObj.close).toHaveBeenCalled();
//   });

//   it('should reset form when calling resetForm method', () => {
//     component.feedbackForm = new FormGroup({
//       feedback: new FormControl(null),
//     });
//     component.selectedRating = 5;
//     component.ratings[4].checked = true;
//     component.feedbackForm.setValue({ feedback: 'test feedback' });

//     component.resetForm();

//     expect(component.selectedRating).toBe(0);
//     expect(component.ratings.every((rating) => !rating.checked)).toBeTruthy();
//     expect(component.feedbackForm.value.feedback).toBe(null);
//   });

//   it('should submit NPS feedback successfully', fakeAsync(() => {
//     try {
//       const response = { status: { code: 200 } };
//       commonServiceSpy.submitNPSFeedback.and.returnValue(of(response));
//       component.selectedRating = 5;
//       component.feedbackForm.setValue({ feedback: 'test feedback' });
//       // Spy on commonService.loggedInEmployeeData
//       spyOnProperty(commonServiceSpy, 'loggedInEmployeeData').and.returnValue({
//         feedbackRequired: 'NO',
//       });
//       component.onSubmit();
//       tick();

//       expect(commonServiceSpy.submitNPSFeedback).toHaveBeenCalled();
//       expect(component.successScreenToggle).toBeTrue();
//       expect(setTimeout).toHaveBeenCalledTimes(1);
//       expect(component.resetForm).toHaveBeenCalledTimes(1);
//     } catch (error) {
//       debugServiceSpy.error('Error in the test case:', error?.message);
//     }
//   }));

//   it('should handle submission error', fakeAsync(() => {
//     try {
//       commonServiceSpy.submitNPSFeedback.and.returnValue(
//         throwError({ message: 'Error' }),
//       );
//       component.selectedRating = 5;
//       component.feedbackForm.setValue({ feedback: 'test feedback' });

//       component.onSubmit();
//       tick();
//       expect(commonServiceSpy.submitNPSFeedback).toHaveBeenCalled();
//       expect(debugServiceSpy).toHaveBeenCalledWith(
//         jasmine.any(String),
//         jasmine.any(String),
//       );
//     } catch (error) {
//       debugServiceSpy.error('Error in the test case:', error?.message);
//     }
//   }));
// });
