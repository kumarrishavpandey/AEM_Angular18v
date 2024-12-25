// import {
//   ComponentFixture,
//   fakeAsync,
//   TestBed,
//   tick,
// } from '@angular/core/testing';

// import { HttpClientTestingModule } from '@angular/common/http/testing';

// import { RouterTestingModule } from '@angular/router/testing';
// import {
//   MSAL_GUARD_CONFIG,
//   MSAL_INSTANCE,
//   MsalBroadcastService,
//   MsalGuardConfiguration,
//   MsalService,
// } from '@azure/msal-angular';
// import { InteractionType, PopupRequest } from '@azure/msal-browser';
// import { of } from 'rxjs';
// import { MSALInstanceFactory } from 'src/app/app.module';
// import { CommonService } from 'src/app/shared/services/common.service';
// import { RosterService } from 'src/app/shared/services/roster-http.service';
// import { SkeletonLoaderComponent } from '../skeleton-loader/skeleton-loader.component';
// import { RosterSectionComponent } from './roster-section.component';
// import { DynamicScriptLoaderService } from '../../services/dynamic-script-loader.service';

// const msalGuardConfigStub: MsalGuardConfiguration = {
//   authRequest: {} as PopupRequest,
//   interactionType: InteractionType.Popup,
// };

// describe('RosterSectionComponent', () => {
//   let component: RosterSectionComponent;
//   let fixture: ComponentFixture<RosterSectionComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [RosterSectionComponent, SkeletonLoaderComponent],
//       imports: [HttpClientTestingModule, RouterTestingModule],
//       providers: [
//         {
//           provide: DynamicScriptLoaderService,
//           useClass: DynamicScriptLoaderService,
//         },
//         {
//           provide: MsalService,
//           useValue: {
//             // Mock any methods or properties that are used in the component
//             // For example:
//             logout: () => {},
//             // Add more mocks as needed
//           },
//         },
//         { provide: MsalBroadcastService },
//         { provide: MSAL_GUARD_CONFIG, useValue: msalGuardConfigStub },
//         {
//           provide: MSAL_INSTANCE,
//           useFactory: MSALInstanceFactory,
//         },
//         CommonService,
//         RosterService,
//       ],
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(RosterSectionComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should Roster API calls', fakeAsync(() => {
//     // const storageEncryptionService = TestBed.inject(StorageEncryptionService);
//     const rosterService = TestBed.inject(RosterService);
//     const commonService = TestBed.inject(CommonService);
//     const rosterInfo = {
//       staffID: '81001879',
//       roster: [
//         {
//           flightNumber: 'AI102',
//           travelDate: '2024-03-10 04:22:08',
//           source: 'JFK',
//           sourceCity: 'New York',
//           sourceCountry: 'USA',
//           sourceTime: '2026-04-09T11:40:00.000+00:00',
//           destination: 'DEL',
//           destinationTime: '2026-04-09T19:15:00.000+00:00',
//           destinationCity: 'Delhi',
//           destinationCountry: 'India',
//         },
//         {
//           flightNumber: 'AI106',
//           travelDate: '2024-03-10 04:22:08',
//           source: 'JFK',
//           sourceCity: 'New York',
//           sourceCountry: 'USA',
//           sourceTime: '2026-04-10T11:40:00.000+00:00',
//           destination: 'DEL',
//           destinationTime: '2026-04-10T19:15:00.000+00:00',
//           destinationCity: 'Delhi',
//           destinationCountry: 'India',
//         },
//       ],
//     };
//     const bgImg = {
//       data: {
//         airportsList: {
//           items: [
//             {
//               airportCode: 'BLR',
//               airportName: 'Kempegowda International Airport',
//               img: {
//                 altText: 'Bengaluru',
//                 thumbnailImage: null,
//                 mobileImage: {
//                   _path: '/content/dam/my-ai/airportimage/Bengaluru.jpg',
//                 },
//                 tabletImage: {
//                   _path: '/content/dam/my-ai/airportimage/Bengaluru.jpg',
//                 },
//               },
//             },
//           ],
//         },
//       },
//     };
//     spyOn(commonService, 'getEmpDataStatus').and.returnValue(of(true));
//     spyOn(rosterService, 'getRosterData').and.returnValue(of(rosterInfo));
//     spyOn(rosterService, 'getCardBgImg').and.returnValue(of(bgImg));
//     component.ngOnInit();
//     tick(2000); // time to wait
//     expect(component.recentFl.length).toBe(0);
//   }));
//   it('show all cards', () => {
//     component.showAllCards(6);
//     expect(component.numberOfCards).toBe(6);
//   });

//   // format flight numbers
//   describe('formatFlightNumber', () => {
//     it('should format flight number correctly', () => {
//       const input = 'AI102';
//       const expectedOutput = 'AI 102';
//       const result = component.formatFlightNumber(input);
//       expect(result).toBe(expectedOutput);
//     });

//     it('should handle flight numbers with different lengths', () => {
//       const input = 'AA1234';
//       const expectedOutput = 'AA 1234';
//       const result = component.formatFlightNumber(input);
//       expect(result).toBe(expectedOutput);
//     });

//     it('should handle flight numbers with non-alphanumeric characters', () => {
//       const input = 'AI-102';
//       const expectedOutput = 'AI -102';
//       const result = component.formatFlightNumber(input);
//       expect(result).toBe(expectedOutput);
//     });

//     it('should handle empty input', () => {
//       const input = '';
//       const expectedOutput = ' ';
//       const result = component.formatFlightNumber(input);
//       expect(result).toBe(expectedOutput);
//     });
//   });
// });
