import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { MatTabChangeEvent } from '@angular/material/tabs';
import { of } from 'rxjs';
import { AdobeAnalyticsServiceMock } from 'src/app/shared/services/__mock__/adobe-analytics.service.mock';
import { CommonServiceMock } from 'src/app/shared/services/__mock__/common.service.mock';
import { StorageEncryptionServiceMock } from 'src/app/shared/services/__mock__/storage-encryption.service.mock';
import { AdobeAnalyticsService } from 'src/app/shared/services/adobe-analytics.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { StorageEncryptionService } from 'src/app/shared/services/storage-encryption.service';
import { HomeService } from '../home/home.service';
import { BaseManagerComponent } from './base-manager.component';
import { LabelsBaseManagerAcmList } from './base-manager.interface';
import { BaseManagerService } from './base-manager.service';

describe('BaseManagerComponent', () => {
  let component: BaseManagerComponent;
  let fixture: ComponentFixture<BaseManagerComponent>;
  let adobeAnalyticsServiceSpy: jasmine.SpyObj<AdobeAnalyticsService>;
  let commonServiceSpy: jasmine.SpyObj<CommonService>;
  let storageEncryptionServiceSpy: jasmine.SpyObj<StorageEncryptionService>;
  let homeService: jasmine.SpyObj<HomeService>;
  let baseManagerService: jasmine.SpyObj<BaseManagerService>;

  beforeEach(async () => {
    adobeAnalyticsServiceSpy = new AdobeAnalyticsServiceMock()
      .adobeAnalyticsServiceSpy;

    commonServiceSpy = new CommonServiceMock().commonServiceSpy;

    storageEncryptionServiceSpy = new StorageEncryptionServiceMock()
      .storageEncryptionServiceSpy;

    const homeServiceSpy = jasmine.createSpyObj('HomeService', [
      'getBaseManagerList',
    ]);
    const baseManagerServiceSpy = jasmine.createSpyObj('BaseManagerService', [
      'getBaseManagerRequestCountApi',
      'getAcmBaseManagerRequestsListApi',
    ]);

    await TestBed.configureTestingModule({
      declarations: [BaseManagerComponent],
      providers: [
        {
          provide: CommonService,
          useValue: commonServiceSpy,
        },
        {
          provide: AdobeAnalyticsService,
          useValue: adobeAnalyticsServiceSpy,
        },
        {
          provide: StorageEncryptionService,
          useValue: storageEncryptionServiceSpy,
        },
        { provide: HomeService, useValue: homeServiceSpy },
        { provide: BaseManagerService, useValue: baseManagerServiceSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(BaseManagerComponent);
    component = fixture.componentInstance;
    homeService = TestBed.inject(HomeService) as jasmine.SpyObj<HomeService>;
    baseManagerService = TestBed.inject(
      BaseManagerService,
    ) as jasmine.SpyObj<BaseManagerService>;
  });

  beforeEach(() => {
    component.labelsBaseManagerAcmList = {
      tabList: {
        imgNoRequest: 'path/to/no-request-image',
        btnPendingView: 'Pending',
        btnApprovedView: 'Approved',
        btnDeclinedView: 'Declined',
        labelTab: 'Manager',
      },
    } as LabelsBaseManagerAcmList;

    storageEncryptionServiceSpy.getvalue.and.returnValue(
      '{"listingTabIndex": 0, "listingFilter": "Pending"}',
    );
    commonServiceSpy.getEmpDataStatus.and.returnValue(of(true));
    commonServiceSpy.fetchLoggedInEmployeeData.and.returnValue(
      of({ employeeId: '123' }),
    );
    homeService.getBaseManagerList.and.returnValue(
      of({ data: [{ employeeId: '123' }] }),
    );
    baseManagerService.getBaseManagerRequestCountApi.and.returnValue(
      of({
        status: { code: 200 },
        data: [
          { empId: '123', totalCount: 5 },
          { empId: '456', totalCount: 3 },
        ],
      }),
    );
    baseManagerService.getAcmBaseManagerRequestsListApi.and.returnValue(
      of({
        status: { code: 200 },
        data: {
          acmList: [{ requestId: 1 }],
          isViewMore: true,
          totalCount: 10,
        },
      }),
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should initialize and fetch data', () => {
      component.ngOnInit();
      expect(commonServiceSpy.getEmpDataStatus).toHaveBeenCalled();
      expect(commonServiceSpy.fetchLoggedInEmployeeData).toHaveBeenCalled();
      expect(homeService.getBaseManagerList).toHaveBeenCalled();
    });
  });

  describe('getBaseManagerTabData', () => {
    it('should get tab data and shuffle indexes', () => {
      component.getBaseManagerTabData(true);
      expect(
        baseManagerService.getBaseManagerRequestCountApi,
      ).toHaveBeenCalled();
      expect(component.tabList.length).toBe(2);
      expect(component.tabList[0].empId).toBe('123');
    });
  });

  describe('onFilterChange', () => {
    it('should change filter and get listing data', () => {
      spyOn(component, 'getListingData');
      component.onFilterChange('Pending');
      expect(component.selectedButton).toBe('Pending');
      expect(component.offset).toBe(0);
      expect(component.getListingData).toHaveBeenCalledWith(
        'Pending',
        0,
        3,
        '',
      );
    });
  });

  // describe('tabClick', () => {
  //   it('should change tab and get listing data', () => {
  //     spyOn(component, 'getListingData');
  //     const event = { index: 1 } as MatTabChangeEvent;
  //     component.tabClick(event);
  //     // expect(component.selectedTabData).toEqual({});
  //     expect(component.offset).toBe(0);
  //     expect(component.getListingData).toHaveBeenCalledWith(
  //       undefined,
  //       0,
  //       3,
  //       '',
  //     );
  //   });
  // });

  describe('getListingData', () => {
    it('should get listing data from service', () => {
      component.getListingData('Pending', 0, 3, '');
      expect(
        baseManagerService.getAcmBaseManagerRequestsListApi,
      ).toHaveBeenCalled();
      expect(component.baseManagerRequestsList.length).toBe(1);
      expect(component.viewMoreData).toBe(true);
      expect(component.totalDataCount).toBe(10);
    });
  });

  describe('getTabLabel', () => {
    it('should return tab label for employee', () => {
      component.isTabDataLoaded = true;

      const tabData = { empId: '123', totalCount: 5 };
      component.isTabDataLoaded = true;

      const label = component.getTabLabel(tabData);

      expect(label).toBe(' (5)');
    });

    it('should return tab label for manager', () => {
      component.isTabDataLoaded = true;

      const tabData = {
        empId: '456',
        firstName: 'John',
        lastName: 'Doe',
        totalCount: 3,
      };
      component.isTabDataLoaded = true;
      const label = component.getTabLabel(tabData);

      expect(label).toBe('John Doe (3)');
    });
  });

  describe('getSelectedButtonLabel', () => {
    it('should return "pending" when the selected button is Pending', () => {
      component.selectedButton = 'Pending';
      const result = component.getSelectedButtonLabel();
      expect(result).toBe('pending');
    });

    it('should return "approved" when the selected button is Approved', () => {
      component.selectedButton = 'Approved';
      const result = component.getSelectedButtonLabel();
      expect(result).toBe('approved');
    });

    it('should return "declined" when the selected button is Declined', () => {
      component.selectedButton = 'Declined';
      const result = component.getSelectedButtonLabel();
      expect(result).toBe('declined');
    });

    it('should return an empty string when the selected button does not match any predefined values', () => {
      component.selectedButton = 'Unknown';
      const result = component.getSelectedButtonLabel();
      expect(result).toBe('');
    });
  });

  describe('onClickViewMore', () => {
    beforeEach(() => {
      component.selectedButton = 'Pending';
      component.offset = 0;
      component.limit = 3;
      component.searchKeyword = '';
    });

    it('should increment the offset and call getListingData when viewMoreData is true', () => {
      component.viewMoreData = true;
      spyOn(component, 'getListingData');

      component.onClickViewMore();

      expect(component.offset).toBe(1);
      expect(component.getListingData).toHaveBeenCalledWith(
        'Pending',
        1,
        3,
        '',
      );
    });

    it('should not increment the offset or call getListingData when viewMoreData is false', () => {
      component.viewMoreData = false;
      spyOn(component, 'getListingData');

      component.onClickViewMore();

      expect(component.offset).toBe(0);
      expect(component.getListingData).not.toHaveBeenCalled();
    });
  });

  describe('resetSearch', () => {
    beforeEach(() => {
      component.selectedButton = 'Pending';
      component.offset = 0;
      component.limit = 3;
      component.searchKeyword = 'Test';
    });

    it('should reset the search keyword, set offset to 0, and call getListingData when searchKeyword has non-whitespace characters', () => {
      spyOn(component, 'getListingData');

      component.resetSearch();

      expect(component.offset).toBe(0);
      expect(component.searchKeyword).toBe('');
      expect(component.getListingData).toHaveBeenCalledWith(
        'Pending',
        0,
        3,
        '',
      );
    });

    it('should not reset the search keyword or call getListingData when searchKeyword has only whitespace characters', () => {
      component.searchKeyword = '    ';
      spyOn(component, 'getListingData');

      component.resetSearch();

      expect(component.offset).toBe(0);
      expect(component.searchKeyword).toBe('    ');
      expect(component.getListingData).not.toHaveBeenCalled();
    });

    it('should not reset the search keyword or call getListingData when searchKeyword is empty', () => {
      component.searchKeyword = '';
      spyOn(component, 'getListingData');

      component.resetSearch();

      expect(component.offset).toBe(0);
      expect(component.searchKeyword).toBe('');
      expect(component.getListingData).not.toHaveBeenCalled();
    });
  });

  it('should run on enter search', () => {
    component.searchKeyword = 'ab';
    component.offset = 1;
    component.limit = 1;
    const clickName = 'search here';

    const getListingDataSpy = spyOn(
      component,
      'getListingData',
    ).and.callThrough();
    const adobeAnalyticsOnClickOfFormSubmitSpy = spyOn(
      component,
      'adobeAnalyticsOnClickOfFormSubmit',
    ).and.callThrough();

    component.onEnterSearch(clickName);

    expect(component.offset).toBe(0);
    expect(component.isListDataLoaded).toBe(true);

    expect(getListingDataSpy).toHaveBeenCalledWith(
      component.selectedButton,
      0,
      component.limit,
      component.searchKeyword,
    );

    expect(adobeAnalyticsOnClickOfFormSubmitSpy).toHaveBeenCalledWith(
      clickName,
    );
  });

  it('should reset offset and isListDataLoaded, and call getListingData with search value if length > 2', () => {
    const searchValue = 'test';
    const getListingDataSpy = spyOn(
      component,
      'getListingData',
    ).and.callThrough();

    const adobeAnalyticsOnFirstFormStartSpy = spyOn(
      component,
      'adobeAnalyticsOnFirstFormStart',
    ).and.callThrough();

    component.onSearchKeyUp(searchValue);

    expect(component.offset).toBe(0);
    expect(component.isListDataLoaded).toBe(true);
    expect(getListingDataSpy).toHaveBeenCalledWith(
      component.selectedButton,
      0,
      component.limit,
      searchValue,
    );
    expect(adobeAnalyticsOnFirstFormStartSpy).toHaveBeenCalledWith(searchValue);
    expect(component.formHasFirstValue).toBe(true);
  });
});
