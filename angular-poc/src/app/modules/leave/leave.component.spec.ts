import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdobeAnalyticsServiceMock } from 'src/app/shared/services/__mock__/adobe-analytics.service.mock';
import { CommonServiceMock } from 'src/app/shared/services/__mock__/common.service.mock';
import { AdobeAnalyticsService } from 'src/app/shared/services/adobe-analytics.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { labelsLeaveModule } from './constant';
import { LeaveComponent } from './leave.component';

describe('LeaveComponent', () => {
  let component: LeaveComponent;
  let fixture: ComponentFixture<LeaveComponent>;
  let adobeAnalyticsServiceSpy: jasmine.SpyObj<AdobeAnalyticsService>;
  let commonServiceSpy: jasmine.SpyObj<CommonService>;

  beforeEach(async () => {
    adobeAnalyticsServiceSpy = new AdobeAnalyticsServiceMock().adobeAnalyticsServiceSpy;

    commonServiceSpy = new CommonServiceMock().commonServiceSpy;

    jasmine.createSpyObj('DashboardComponent', {
      changeSelectedButtonStatus: jasmine.createSpy('changeSelectedButtonStatus'),
    });

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        MatDialogModule,
        MatTabsModule,
        BrowserAnimationsModule,
      ],
      declarations: [LeaveComponent],
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
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ tab: '1' }),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveComponent);
    component = fixture.componentInstance;
    component.labelsLeaveModule = labelsLeaveModule;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set leaveTitle to "Leave Request"', () => {
    expect(component.leaveTitle).toBe('Leave Request');
  });

  it('should set activeTab to "Dashboard"', () => {
    expect(component.activeTab).toBe('Dashboard');
  });

  it('should initialize user persona on init', fakeAsync(() => {
    component.ngOnInit();
    tick();
    expect(commonServiceSpy.getEmpDataStatus).toHaveBeenCalled();
    expect(commonServiceSpy.fetchPersonaInfo).toHaveBeenCalled();
    expect(commonServiceSpy.getA2CountryCodeAsync).toHaveBeenCalled();
  }));

  it('should change tab index based on queryParams', fakeAsync(() => {
    component.ngAfterViewInit();
    tick();
    expect(component.tabGroup.selectedIndex).toBe(0);
  }));

  it('should call adobeAnalyticsOnButtonClick on tab change to Dashboard', () => {
    const textLabel = 'Dashboard';

    const tabChangeEvent = { tab: { textLabel } };

    component.dashboard = jasmine.createSpyObj('DashboardComponent', [
      'getLeaveAndHolidayList',
      'getLeaveBalance',
    ]);

    spyOn(component, 'adobeAnalyticsOnButtonClick');

    component.onTabChangeInLeave(tabChangeEvent);

    expect(component.dashboard.getLeaveAndHolidayList).toHaveBeenCalledTimes(1);
    expect(component.dashboard.getLeaveBalance).toHaveBeenCalledTimes(1);
    expect(component.adobeAnalyticsOnButtonClick).toHaveBeenCalledOnceWith(textLabel);
  });

  it('should call adobeAnalyticsOnButtonClick on tab change to New Request', () => {
    const textLabel = 'New Request';

    const tabChangeEvent = { tab: { textLabel } };

    component.newLeaveRequestComponent = jasmine.createSpyObj('NewRequestComponent', [
      'resetLeaveApplicationForm',
      'filterLeaveInSelectOptions',
    ]);

    spyOn(component, 'adobeAnalyticsOnButtonClick');

    component.onTabChangeInLeave(tabChangeEvent);

    expect(component.newLeaveRequestComponent.resetLeaveApplicationForm).toHaveBeenCalledTimes(1);
    expect(component.newLeaveRequestComponent.filterLeaveInSelectOptions).toHaveBeenCalledTimes(1);
    expect(component.adobeAnalyticsOnButtonClick).toHaveBeenCalledOnceWith(textLabel);
  });

  it('should call adobeAnalyticsOnButtonClick on tab change to Requested Leave', () => {
    const textLabel = 'Requested Leave';

    const tabChangeEvent = { tab: { textLabel } };

    component.requestedLeaveComponent = jasmine.createSpyObj('RequestedLeaveComponent', ['getRequestLeaveData']);

    spyOn(component, 'adobeAnalyticsOnButtonClick');

    component.onTabChangeInLeave(tabChangeEvent);

    expect(component.requestedLeaveComponent.getRequestLeaveData).toHaveBeenCalledTimes(1);
    expect(component.adobeAnalyticsOnButtonClick).toHaveBeenCalledOnceWith(textLabel);
  });

  it('should open the correct tab', () => {
    component.openTab();
    expect(component.tabGroup.selectedIndex).toBe(0);
  });

  it('should open the request leave tab', () => {
    component.openRequestLeaveTab();
    expect(component.tabGroup.selectedIndex).toBe(0);
  });
});
