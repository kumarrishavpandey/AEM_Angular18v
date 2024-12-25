import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  waitForAsync,
} from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SimpleChanges } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import {
  MSAL_GUARD_CONFIG,
  MsalBroadcastService,
  MsalGuardConfiguration,
  MsalService,
} from '@azure/msal-angular';
import { InteractionType, PopupRequest } from '@azure/msal-browser';
import { HeaderSize } from '../../../constants';
import { CommonService } from '../../../services/common.service';
import { EmployeeCardComponent } from './employee-card.component';
import { EnumAvatarSize, EnumAvatarTheme } from './employee-card.enum';

describe('EmployeeCardComponent', () => {
  let component: EmployeeCardComponent;
  let fixture: ComponentFixture<EmployeeCardComponent>;
  let authServiceStub: jasmine.SpyObj<MsalService>;
  let msalBroadcastService: jasmine.SpyObj<MsalBroadcastService>;
  let commonServiceSpy: jasmine.SpyObj<CommonService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('CommonService', ['isImageValid']);
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
    await TestBed.configureTestingModule({
      declarations: [EmployeeCardComponent],
      providers: [
        { provide: MSAL_GUARD_CONFIG, useValue: msalGuardConfigStub },
        { provide: MsalService, useValue: authServiceStub },
        { provide: MsalBroadcastService, useValue: msalBroadcastService },
        { provide: CommonService, useValue: spy },
      ],
      imports: [HttpClientModule, HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();
    commonServiceSpy = TestBed.inject(
      CommonService,
    ) as jasmine.SpyObj<CommonService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeCardComponent);
    component = fixture.componentInstance;

    component.empData = {
      employeeId: '12345',
      firstName: 'John',
      lastName: 'Doe',
    };
    component.componentClass = 'component-class';
    component.imgContainerClass = 'img-container-class';
    component.imgClass = 'img-class';
    component.size = EnumAvatarSize.M;
    component.initialsContainerClass = 'initials-container-class';
    component.initialsClass = 'initials-class';
    component.initialsSize = HeaderSize.H6;
    component.addIntitals = true;
    component.initialsTheme = EnumAvatarTheme.PRIMARY;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle invalid image path', fakeAsync(() => {
    commonServiceSpy.isImageValid.and.returnValue(Promise.resolve(false));

    fixture.detectChanges();
    tick();

    expect(component.userProfileImageUrl).toBe(
      'https://s7ap1.scene7.com/is/image/myAIstage/12345?fmt=webp&resMode=sharp2&qlt=85',
    );
    expect(component.isUserImageValid).toBeFalse();
  }));

  it('should call isImagePathValid with the correct URL when empData changes', waitForAsync(() => {
    // Spy on isImagePathValid
    spyOn(component, 'isImagePathValid').and.callThrough();

    // Mock getEmployeeProfileEndpoint function
    const mockEmployeeId = '123';
    const mockUrl = `https://s7ap1.scene7.com/is/image/myAIstage/${mockEmployeeId}?fmt=webp&resMode=sharp2&qlt=85`;

    // Mock changes object
    const changes: SimpleChanges = {
      empData: {
        currentValue: { employeeId: mockEmployeeId },
        previousValue: null,
        firstChange: true,
        isFirstChange: () => true,
      },
    };

    // Mock isImageValid method
    commonServiceSpy.isImageValid.and.returnValue(Promise.resolve(true));

    // Call ngOnChanges with the mock changes
    component.ngOnChanges(changes);

    // Verify isImagePathValid was called with the correct URL
    expect(component.isImagePathValid).toHaveBeenCalledWith(mockUrl);

    // Verify userProfileImageUrl and isUserImageValid
    component.isImagePathValid(mockUrl).then(() => {
      expect(component.userProfileImageUrl).toBe(mockUrl);
      expect(component.isUserImageValid).toBe(true);
    });
  }));
});
