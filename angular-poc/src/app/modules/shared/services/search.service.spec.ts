// import { HttpClientModule } from '@angular/common/http';
// import {
//   HttpClientTestingModule,
//   HttpTestingController,
// } from '@angular/common/http/testing';
// import { TestBed } from '@angular/core/testing';
// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { RouterTestingModule } from '@angular/router/testing';
// import { AngularMaterialModule } from 'src/app/angular-material.module';
// import { EMP_PROFILE, GET_SEARCH_DATA } from 'src/app/app.api';
// import { environment } from 'src/environments/environment';
// import { of } from 'rxjs';
// import { SharedModule } from '../shared.module';
// import { HttpService } from './http.service';
// import { SearchService } from './search.service';

// describe('SearchService', () => {
//   let searchService: SearchService;
//   let httpTestingController: HttpTestingController;
//   let httpServiceSpy: jasmine.SpyObj<HttpService>;

//   beforeEach(() => {
//     const spy = jasmine.createSpyObj('HttpService', ['get']);
//     TestBed.configureTestingModule({
//       imports: [
//         RouterTestingModule,
//         AngularMaterialModule,
//         SharedModule,
//         HttpClientModule,
//         HttpClientTestingModule,
//         BrowserAnimationsModule,
//         BrowserModule,
//       ],
//       providers: [SearchService, HttpService,
//         { provide: HttpService, useValue: spy },
//       ],

//     });

//     searchService = TestBed.inject(SearchService);
//     httpTestingController = TestBed.inject(HttpTestingController);
//     httpServiceSpy = TestBed.inject(HttpService) as jasmine.SpyObj<HttpService>;
//   });

//   afterEach(() => {
//     // Verify that there are no outstanding requests
//     httpTestingController.verify();
//   });

//   it('should be created', () => {
//     expect(searchService).toBeTruthy();
//   });

//   it('getSearchEmpData should call the correct endpoint with the right parameters', () => {
//     const value = 'john.doe';
//     const pageNumber = 1;
//     const pageSize = 10;
//     const expectedEndpoint = `${EMP_PROFILE}/${value}/${GET_SEARCH_DATA}?pageNumber=${pageNumber}&pageSize=${pageSize}`;
//     httpServiceSpy.get.and.returnValue(of({}));

//     searchService.getSearchEmpData(value, pageNumber, pageSize);

//     expect(httpServiceSpy.get).toHaveBeenCalledOnceWith(
//       environment.EMP_PROFILE_BASE_URL,
//       expectedEndpoint,
//     );
//   });
// });
