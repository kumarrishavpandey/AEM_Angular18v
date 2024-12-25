import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserTestingModule } from '@angular/platform-browser/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  MSAL_GUARD_CONFIG,
  MsalBroadcastService,
  MsalGuardConfiguration,
  MsalService,
} from '@azure/msal-angular';
import { InteractionType, PopupRequest } from '@azure/msal-browser';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { SharedModule } from '../../shared.module';
import { CommonWarningDialogWithButtonsComponent } from './common-warning-dialog-with-buttons.component';

describe('CommonWarningDialogWithButtonsComponent', () => {
  let component: CommonWarningDialogWithButtonsComponent;
  let fixture: ComponentFixture<CommonWarningDialogWithButtonsComponent>;
  let dialogRefMock: jasmine.SpyObj<
  MatDialogRef<CommonWarningDialogWithButtonsComponent>
  >;
  let authServiceStub: jasmine.SpyObj<MsalService>;
  let msalBroadcastService: jasmine.SpyObj<MsalBroadcastService>;

  beforeEach(() => {
    authServiceStub = jasmine.createSpyObj('MsalService', [
      'loginPopup',
      'loginRedirect',
      'instance',
    ]);

    msalBroadcastService = jasmine.createSpyObj('MsalBroadcastService', [
      'inProgress$',
      'msalInstance',
    ]);

    const msalGuardConfigStub: MsalGuardConfiguration = {
      authRequest: {} as PopupRequest,
      interactionType: InteractionType.Popup,
    };

    dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AngularMaterialModule,
        SharedModule,
        HttpClientModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        BrowserModule,
        BrowserTestingModule,
      ],
      declarations: [CommonWarningDialogWithButtonsComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MsalService, useValue: authServiceStub },
        { provide: MsalBroadcastService, useValue: msalBroadcastService },
        { provide: MSAL_GUARD_CONFIG, useValue: msalGuardConfigStub },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonWarningDialogWithButtonsComponent);
    component = fixture.componentInstance;
    component.data = {
      warningInfo: {
        title: 'string',
        message: 'string',
        buttonText: 'string',
        description: 'string',
      },
      childInfo: {
        title: 'string',
        message: 'string',
        buttonText: 'string',
      },
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call close method with the correct data', () => {
    component.cancel();
    expect(dialogRefMock.close).toHaveBeenCalledWith({ data: { flag: false } });
  });

  it('should call close method with the correct data', () => {
    component.confirm();
    expect(dialogRefMock.close).toHaveBeenCalledWith({ data: { flag: true } });
  });
  it('should close dialog with flag false on cancel', () => {
    component.cancel();
    expect(dialogRefMock.close).toHaveBeenCalledWith({ data: { flag: false } });
  });

  it('should close dialog with flag true on confirm', () => {
    component.confirm();
    expect(dialogRefMock.close).toHaveBeenCalledWith({ data: { flag: true } });
  });
});
