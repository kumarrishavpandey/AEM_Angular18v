// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { CommonModule } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import {
//   MAT_DIALOG_DATA,
//   MatDialog,
//   MatDialogModule,
// } from '@angular/material/dialog';
// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { RouterTestingModule } from '@angular/router/testing';
// import { AngularMaterialModule } from 'src/app/angular-material.module';
// import { SharedModule } from 'src/app/shared/shared.module';
// import { Router } from '@angular/router';
// import {
//   Directive, Input, TemplateRef, ViewContainerRef,
// } from '@angular/core';
// import { UpcomingAlertModalComponent } from './upcoming-alert-modal.component';

// /* eslint-disable @angular-eslint/directive-selector */
// @Directive({
//   selector: '[ngIf][ngIfElse]',
// })
// export class NgIfElseStubDirective {
//   private hasView = false;

//   @Input() set ngIf(condition: any) {
//     if (condition && !this.hasView) {
//       this.viewContainer.createEmbeddedView(this.templateRef);
//       this.hasView = true;
//     } else if (!condition && this.hasView) {
//       this.viewContainer.clear();
//       this.hasView = false;
//     }
//   }

//   @Input() set ngIfElse(condition: any) {
//     if (!condition && !this.hasView) {
//       this.viewContainer.createEmbeddedView(this.templateRef);
//       this.hasView = true;
//     } else if (condition && this.hasView) {
//       this.viewContainer.clear();
//       this.hasView = false;
//     }
//   }

//   constructor(
//     private templateRef: TemplateRef<any>,
//     private viewContainer: ViewContainerRef,
//   ) {}
// }

// describe('UpcomingAlertModalComponent', () => {
//   let component: UpcomingAlertModalComponent;
//   let fixture: ComponentFixture<UpcomingAlertModalComponent>;
//   let mockDialog: jasmine.SpyObj<MatDialog>;
//   let mockRouter: jasmine.SpyObj<Router>;
//   let router: Router;

//   const mockDialogData = {
//     userPersona: 'General',
//     employeeAlertInfo: [
//       {
//         name: 'Goal Setting',
//         summary: 'Join us & let’s celebrate the festival of colours together',
//         date: '2024-03-02T10:10:00.000+05:30',
//         icon: 'lightbulb',
//         iconColor: '#531251',
//         iconBgColor: '#f0f1f7',
//         type: 'goal-setting',
//         cutOffDate: '2024-03-12T10:11:00.000+05:30',
//         eventLocation: 'Gurgaon',
//         isExternal: true,
//         externalLink: 'https://1to1help.net/',
//         criticality: 'High',
//         summaryAlert: null,
//         designation: null,
//       },
//     ],
//   };

//   beforeEach(() => {
//     mockDialog = jasmine.createSpyObj('MatDialog', ['closeAll']);
//     mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);
//     TestBed.configureTestingModule({
//       imports: [
//         HttpClientTestingModule,
//         RouterTestingModule,
//         CommonModule,
//         BrowserAnimationsModule,
//         BrowserModule,
//         AngularMaterialModule,
//         HttpClientModule,
//         SharedModule,
//         MatDialogModule,
//       ],
//       declarations: [NgIfElseStubDirective, UpcomingAlertModalComponent],
//       providers: [
//         { provide: MatDialog, useValue: mockDialog },
//         { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
//         { provide: Router, useValue: mockRouter },
//       ],
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(UpcomingAlertModalComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//     router = TestBed.inject(Router);
//     mockDialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should close all dialogs when closeDialog is called', () => {
//     component.closeDialog();

//     expect(mockDialog.closeAll).toHaveBeenCalledTimes(1);
//   });

//   it('should navigate to external link if isExternal is true and link starts with "http://"', () => {
//     const data = {
//       isExternal: true,
//       externalLink: 'http://example.com',
//     };

//     spyOn(window, 'open');

//     component.navigateToURL(data);

//     expect(window.open).toHaveBeenCalledWith(data.externalLink, '_blank');
//     expect(mockDialog.closeAll).not.toHaveBeenCalled();
//     expect(router.navigateByUrl).not.toHaveBeenCalled();
//   });

//   it('should navigate to external link if isExternal is true and link starts with "https://"', () => {
//     const data = {
//       isExternal: true,
//       externalLink: 'https://example.com',
//     };

//     spyOn(window, 'open');

//     component.navigateToURL(data);

//     expect(window.open).toHaveBeenCalledWith(data.externalLink, '_blank');
//     expect(mockDialog.closeAll).not.toHaveBeenCalled();
//     expect(router.navigateByUrl).not.toHaveBeenCalled();
//   });

//   it('should navigate internally if isExternal is true and link is internal', () => {
//     const data = {
//       isExternal: true,
//       externalLink: '/internal-link',
//     };

//     spyOn(window, 'open');

//     component.navigateToURL(data);

//     expect(window.open).not.toHaveBeenCalled();
//     expect(mockDialog.closeAll).toHaveBeenCalledTimes(1);
//     expect(router.navigateByUrl).toHaveBeenCalledWith(data.externalLink);
//   });

//   it('should not navigate if isExternal is false', () => {
//     const data = {
//       isExternal: false,
//       externalLink: '/internal-link',
//     };

//     spyOn(window, 'open');

//     component.navigateToURL(data);

//     expect(window.open).not.toHaveBeenCalled();
//     expect(mockDialog.closeAll).not.toHaveBeenCalled();
//     expect(router.navigateByUrl).not.toHaveBeenCalled();
//   });

//   it('should not navigate if isExternal is undefined', () => {
//     const data = {
//       externalLink: '/internal-link',
//     };

//     spyOn(window, 'open');

//     component.navigateToURL(data);

//     expect(window.open).not.toHaveBeenCalled();
//     expect(mockDialog.closeAll).not.toHaveBeenCalled();
//     expect(router.navigateByUrl).not.toHaveBeenCalled();
//   });

//   it('should set alertList to pilotCrewAlertInfo if user persona is Pilot', () => {
//     component.userPersona = 'Pilot';
//     component.data = {
//       pilotCrewAlertInfo: [{ message: 'Alert 1' }, { message: 'Alert 2' }],
//     };

//     component.ngOnInit();

//     expect(component.alertList).toEqual(component.data.pilotCrewAlertInfo);
//   });

//   it('should set alertList to pilotCrewAlertInfo if user persona is Cabin Crew', () => {
//     component.userPersona = 'Cabin Crew';
//     component.data = {
//       pilotCrewAlertInfo: [{ message: 'Alert 1' }, { message: 'Alert 2' }],
//     };

//     component.ngOnInit();

//     expect(component.alertList).toEqual(component.data.pilotCrewAlertInfo);
//   });

//   it('should set alertList to employeeAlertInfo if user persona is neither Pilot nor Cabin Crew', () => {
//     component.userPersona = 'Other';
//     component.data = {
//       employeeAlertInfo: [
//         { message: 'Employee Alert 1' },
//         { message: 'Employee Alert 2' },
//       ],
//     };

//     component.ngOnInit();

//     expect(component.alertList).toEqual(component.data.employeeAlertInfo);
//   });
// });
