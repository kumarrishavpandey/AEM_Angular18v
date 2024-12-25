import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AnalyticsInfoData } from 'src/app/shared/constants';
import { AdobeAnalyticsServiceMock } from 'src/app/shared/services/__mock__/adobe-analytics.service.mock';
import { StorageEncryptionServiceMock } from 'src/app/shared/services/__mock__/storage-encryption.service.mock';
import { AdobeAnalyticsService } from 'src/app/shared/services/adobe-analytics.service';
import { StorageEncryptionService } from 'src/app/shared/services/storage-encryption.service';
import { BaseManagerDetailsPageSession, JOURNEY_TYPES, labelsBaseManagerACMapproval } from '../../../base-manager.constant';
import { BaseManagerHistoryComponent } from './base-manager-history.component';

describe('BaseManagerHistoryComponent', () => {
  let component: BaseManagerHistoryComponent;
  let fixture: ComponentFixture<BaseManagerHistoryComponent>;
  let adobeAnalyticsServiceSpy: jasmine.SpyObj<AdobeAnalyticsService>;
  let storageEncryptionServiceSpy: jasmine.SpyObj<StorageEncryptionService>;

  beforeEach(async () => {
    adobeAnalyticsServiceSpy = new AdobeAnalyticsServiceMock().adobeAnalyticsServiceSpy;

    storageEncryptionServiceSpy = new StorageEncryptionServiceMock().storageEncryptionServiceSpy;

    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [BaseManagerHistoryComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: { queryParams: of({}) } },
        {
          provide: AdobeAnalyticsService,
          useValue: adobeAnalyticsServiceSpy,
        },
        {
          provide: StorageEncryptionService,
          useValue: storageEncryptionServiceSpy,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseManagerHistoryComponent);
    component = fixture.componentInstance;
    component.historyTabLabels = labelsBaseManagerACMapproval.tabHistory;
    adobeAnalyticsServiceSpy.setAnalyticsInfo(AnalyticsInfoData);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set selectedType to JOURNEY_TYPES.DOMESTIC when no selectedReq is provided', () => {
    storageEncryptionServiceSpy.getvalue.and.returnValue(JSON.stringify({ detailsType: JOURNEY_TYPES.DOMESTIC }));
    component.ngOnInit();
    expect(component.selectedType).toBe(JOURNEY_TYPES.DOMESTIC);
  });

  it('should set selectedType to the value from storage when selectedReq is not provided', () => {
    storageEncryptionServiceSpy.getvalue.and.returnValue(JSON.stringify({ detailsType: JOURNEY_TYPES.INTERNATIONAL }));
    component.ngOnInit();
    expect(component.selectedType).toBe(JOURNEY_TYPES.INTERNATIONAL);
  });

  it('should emit selectedTab event when onTabClick is called', () => {
    const selectedTabSpy = spyOn(component.selectedTab, 'emit');
    component.onTabClick(JOURNEY_TYPES.DOMESTIC);
    expect(selectedTabSpy).toHaveBeenCalledWith({
      selectedType: JOURNEY_TYPES.DOMESTIC,
      offset: 0,
      limit: 1,
    });
  });

  it('should set value in storage when navigateToHistoryViewDetails is called', () => {
    component.navigateToHistoryViewDetails('reqNo');
    expect(storageEncryptionServiceSpy.setvalue).toHaveBeenCalledWith(
      BaseManagerDetailsPageSession,
      JSON.stringify({ detailsType: component.selectedType }),
    );
  });
});
