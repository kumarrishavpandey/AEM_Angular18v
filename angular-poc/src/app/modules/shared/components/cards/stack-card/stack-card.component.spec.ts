// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { RouterTestingModule } from '@angular/router/testing';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { CommonService } from 'src/app/shared/services/common.service';
// import { CommonServiceMock } from 'src/app/shared/services/__mock__/common.service.mock';
// import { AdobeAnalyticsService } from 'src/app/shared/services/adobe-analytics.service';
// import { AdobeAnalyticsServiceMock } from 'src/app/shared/services/__mock__/adobe-analytics.service.mock';
// import { ApprovalDialogService } from 'src/app/modules/approvals/services/approval-dialog.service';
// import { ApprovalActionService } from 'src/app/modules/approvals/services/approval-action.service';
// import { of } from 'rxjs';
// import { DatePipe } from '@angular/common';
// import { StackCardComponent } from './stack-card.component';
// import { ILabelsStackCard } from './stack-card.model';

// describe('StackCardViewComponent', () => {
//   let component: StackCardComponent;
//   let fixture: ComponentFixture<StackCardComponent>;
//   let commonServiceSpy: jasmine.SpyObj<CommonService>;
//   let adobeAnalyticsServiceSpy: jasmine.SpyObj<AdobeAnalyticsService>;

//   const mockILabelsStackCard: ILabelsStackCard = {
//     labelCardTitle: 'Mock Card Title',
//     labelViewMore: 'Mock View More',
//     iconViewMore: 'mock-icon',
//     linkViewMore: 'https://example.com/mock-link',

//   };

//   beforeEach(async () => {
//     commonServiceSpy = new CommonServiceMock().commonServiceSpy;
//     adobeAnalyticsServiceSpy = new AdobeAnalyticsServiceMock().adobeAnalyticsServiceSpy;

//     const approvalDialogServiceSpy = jasmine.createSpyObj(
//       'ApprovalDialogService',
//       ['showRejectRequestDialog'],
//     );
//     // const approvalActionServiceMock = {
//     //   approveRequest: jasmine
//     //     .createSpy('approveRequest')
//     //     .and.returnValue(of(true)),
//     // };
//     const approvalActionServiceMock = jasmine.createSpyObj(
//       'ApprovalActionService',
//       ['approveRequest'],
//     );

//     await TestBed.configureTestingModule({
//       declarations: [StackCardComponent],
//       imports: [RouterTestingModule],
//       providers: [HttpClientTestingModule,
//         {
//           provide: CommonService,
//           useValue: commonServiceSpy,
//         },
//         {
//           provide: AdobeAnalyticsService,
//           useValue: adobeAnalyticsServiceSpy,
//         },
//         { provide: ApprovalDialogService, useValue: approvalDialogServiceSpy },
//         { provide: ApprovalActionService, useValue: approvalActionServiceMock },
//         DatePipe,
//       ],
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(StackCardComponent);
//     component = fixture.componentInstance;
//     component.labelsStackCard = mockILabelsStackCard;
//     // approvalActionServiceSpy = TestBed.inject(
//     //   ApprovalActionService,
//     // ) as jasmine.SpyObj<ApprovalActionService>;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
