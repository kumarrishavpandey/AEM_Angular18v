// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { of } from 'rxjs';
// import { CommonServiceMock } from 'src/app/shared/services/__mock__/common.service.mock';
// import { CommonService } from 'src/app/shared/services/common.service';
// import { AwardsRosterComponent } from './awards-roster.component';

// describe('AwardsRosterComponent', () => {
//   let component: AwardsRosterComponent;
//   let fixture: ComponentFixture<AwardsRosterComponent>;
//   let commonServiceSpy: jasmine.SpyObj<CommonService>;

//   const commonServiceMock = new CommonServiceMock();

//   beforeEach(async () => {
//     commonServiceSpy = jasmine.createSpyObj(
//       'CommonService',
//       commonServiceMock.commonServiceMock,
//     );
//     await TestBed.configureTestingModule({
//       declarations: [AwardsRosterComponent],
//       providers: [
//         {
//           provide: CommonService,
//           useValue: commonServiceSpy,
//         },
//       ],
//     }).compileComponents();

//     fixture = TestBed.createComponent(AwardsRosterComponent);
//     component = fixture.componentInstance;
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should initialize and set isGeneral to true when userPersona is General', () => {
//     commonServiceSpy.getEmpDataStatus.and.returnValue(of(true));
//     commonServiceSpy.fetchPersonaInfo.and.returnValue(of('General'));

//     component.ngOnInit();

//     expect(commonServiceSpy.getEmpDataStatus).toHaveBeenCalled();
//     expect(commonServiceSpy.fetchPersonaInfo).toHaveBeenCalled();
//     expect(component.isGeneral).toBe(true);
//   });
// });
