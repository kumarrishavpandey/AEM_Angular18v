// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { FormBuilder } from '@angular/forms';
// import { MatDialog, MatDialogModule } from '@angular/material/dialog';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { NpsFeedbackComponent } from 'src/app/shared/components/nps-feedback/nps-feedback.component';
// import { CommonServiceMock } from 'src/app/shared/services/__mock__/common.service.mock';
// import { CommonService } from 'src/app/shared/services/common.service';
// import { MsalService } from '@azure/msal-angular';
// import { Router } from '@angular/router';
// import { StorageEncryptionService } from 'src/app/shared/services/storage-encryption.service';
// import { NpsButtonComponent } from './nps-button.component';
// import { btnFeedbackNps, pageTitle } from '../constant';

// describe('NpsButtonComponent', () => {
//   let component: NpsButtonComponent;
//   let fixture: ComponentFixture<NpsButtonComponent>;
//   let dialog: MatDialog;
//   let authServiceStub: { instance: any };
//   let mockRouter: jasmine.SpyObj<Router>;
//   let mockStorageEncryptionService: jasmine.SpyObj<StorageEncryptionService>;

//   beforeEach(async () => {
//     mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);
//     mockStorageEncryptionService = jasmine.createSpyObj(
//       'StorageEncryptionService',
//       ['setvalue'],
//     );
//     authServiceStub = {
//       instance: {
//         getAllAccounts: jasmine
//           .createSpy('getAllAccounts')
//           .and.returnValue([{ username: 'testuser' }]),
//         setActiveAccount: jasmine.createSpy('setActiveAccount'),
//       },
//     };
//     await TestBed.configureTestingModule({
//       declarations: [NpsButtonComponent],
//       providers: [
//         FormBuilder,
//         {
//           provide: CommonService,
//           useValue: new CommonServiceMock().commonServiceSpy,
//         },
//         { provide: MsalService, useValue: authServiceStub },
//         { provide: Router, useValue: mockRouter },
//         {
//           provide: StorageEncryptionService,
//           useValue: mockStorageEncryptionService,
//         },
//       ],
//       imports: [
//         BrowserAnimationsModule,
//         MatDialogModule,
//       ],
//     }).compileComponents();

//     fixture = TestBed.createComponent(NpsButtonComponent);

//     component = fixture.componentInstance;
//     component.siteSection = pageTitle;
//     component.btnFeedbackNps = btnFeedbackNps;

//     dialog = TestBed.inject(MatDialog);
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should open feedback dialog and handle the result', () => {
//     const dialogSpy = spyOn(dialog, 'open').and.callThrough();
//     component.openFeedbackDialog();
//     expect(dialogSpy).toHaveBeenCalledWith(NpsFeedbackComponent, {
//       panelClass: 'feedback-dialog',
//     });

//     // Simulating the afterClosed subscription
//     dialog
//       .open(NpsFeedbackComponent, { panelClass: 'feedback-dialog' })
//       .afterClosed()
//       .subscribe((res) => {
//         expect(res.event).toBe('refresh');
//         // Additional logic if needed
//       });
//   });
// });
