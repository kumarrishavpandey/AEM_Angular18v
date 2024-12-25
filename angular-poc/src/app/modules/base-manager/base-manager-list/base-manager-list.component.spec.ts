import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { Router } from '@angular/router';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import {
  MSAL_GUARD_CONFIG,
  MSAL_INSTANCE,
  MsalBroadcastService,
  MsalGuardConfiguration,
  MsalService,
} from '@azure/msal-angular';
import {
  InteractionStatus,
  InteractionType,
  PopupRequest,
} from '@azure/msal-browser';
import { of } from 'rxjs';
import { StorageEncryptionService } from 'src/app/shared/services/storage-encryption.service';
import { DynamicScriptLoaderService } from 'src/app/shared/services/dynamic-script-loader.service';
import {
  EnumAvatarSize,
  EnumAvatarTheme,
} from 'src/app/shared/components/cards/employee-card/employee-card.enum';
import { BaseManagerService } from '../base-manager.service';
import {
  BaseManagerDetailsURL,
  BaseManagerRequestsListEnum,
  labelsBaseManagerAcmList,
  RequestStatusEnum,
} from '../base-manager.constant';
import { BaseManagerListComponent } from './base-manager-list.component';

describe('BaseManagerListComponent', () => {
  let component: BaseManagerListComponent;
  let fixture: ComponentFixture<BaseManagerListComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockStorageEncryptionService: jasmine.SpyObj<StorageEncryptionService>;
  let mockBaseManagerService: jasmine.SpyObj<BaseManagerService>;
  const button = 'button1';
  let authServiceStub: { instance: any };
  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockStorageEncryptionService = jasmine.createSpyObj(
      'StorageEncryptionService',
      ['setvalue'],
    );
    mockBaseManagerService = jasmine.createSpyObj('BaseManagerService', [
      'getBaseManagerListFromAEM',
      'getBaseManagerRequestCountApi',
      'getBaseManagerData',
      'getUploadedAttachment',
      'submitDeclineRequest',
      'submitApproveRequest',
      'getAcmBaseManagerRequestsListApi',
      'getAcmHistoryList',
    ]);

    authServiceStub = {
      instance: {
        getAllAccounts: jasmine
          .createSpy('getAllAccounts')
          .and.returnValue([{ username: 'testuser' }]),
        setActiveAccount: jasmine.createSpy('setActiveAccount'),
      },
    };

    const msalInstanceMock = {
      addEventCallback: () => {},
    };
    const mockMsalBroadcastService = {
      inProgress$: of(InteractionStatus.None),
    };

    const msalGuardConfigStub: MsalGuardConfiguration = {
      authRequest: {} as PopupRequest,
      interactionType: InteractionType.Popup,
    };
    TestBed.configureTestingModule({
      declarations: [BaseManagerListComponent],
      imports: [RouterTestingModule],
      providers: [
        HttpClient,
        HttpHandler,
        DynamicScriptLoaderService,
        { provide: Router, useValue: mockRouter },
        {
          provide: StorageEncryptionService,
          useValue: mockStorageEncryptionService,
        },
        { provide: BaseManagerService, useValue: mockBaseManagerService },
        { provide: MsalService, useValue: authServiceStub },
        { provide: MSAL_INSTANCE, useValue: msalInstanceMock },
        { provide: MSAL_GUARD_CONFIG, useValue: msalGuardConfigStub },
        { provide: MsalBroadcastService, useValue: mockMsalBroadcastService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseManagerListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should navigate to view details', fakeAsync(() => {
    const reqNo = '123';
    component.selectedTabIndex = 1;
    component.selectedButton = button;
    component.labelsBaseManagerAcmList = {
      pageTitle: labelsBaseManagerAcmList.pageTitle,
    };
    component.activeTab = labelsBaseManagerAcmList.tabList.btnViewDetails;
    component.labelsBaseManager = {
      btnViewDetails: labelsBaseManagerAcmList.tabList.btnViewDetails,
    };

    component.navigateToViewDetails(reqNo);
    tick();
    expect(mockStorageEncryptionService.setvalue).toHaveBeenCalledWith(
      'baseManagerListData',
      JSON.stringify({
        listingTabIndex: 1,
        listingFilter: button,
      }),
    );
    expect(mockRouter.navigate).toHaveBeenCalledWith([BaseManagerDetailsURL], {
      queryParams: { reqNo },
    });
  }));

  it('should have correct inputs', () => {
    component.baseManagerRequestsList = [];
    component.labelsBaseManager = {};
    component.selectedButton = button;
    component.selectedTabIndex = 1;
    expect(component.baseManagerRequestsList).toEqual([]);
    expect(component.labelsBaseManager).toEqual({});
    expect(component.selectedButton).toBe(button);
    expect(component.selectedTabIndex).toBe(1);
  });

  it('should have correct constants', () => {
    expect(component.avatarTheme).toBe(EnumAvatarTheme);
    expect(component.avatarSize).toBe(EnumAvatarSize);
    expect(component.baseManagerRequestsListEnum).toBe(
      BaseManagerRequestsListEnum,
    );
    expect(component.RequestStatusEnum).toBe(RequestStatusEnum);
  });
});
