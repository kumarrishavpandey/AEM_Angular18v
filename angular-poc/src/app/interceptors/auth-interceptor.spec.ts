// import {
//   HTTP_INTERCEPTORS,
//   HttpClient,
//   HttpErrorResponse,
//   HttpResponse,
// } from '@angular/common/http';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { Type } from '@angular/core';
// import { TestBed } from '@angular/core/testing';
// import { MsalService } from '@azure/msal-angular';
// import { throwError } from 'rxjs';
// import { CommonServiceMock } from '../shared/services/__mock__/common.service.mock';
// import { authNewToken, authToken, MsalServiceMock } from '../shared/services/__mock__/msal.service.mock';
// import { StorageEncryptionServiceMock } from '../shared/services/__mock__/storage-encryption.service.mock';
// import { CommonService } from '../shared/services/common.service';
// import { StorageEncryptionService } from '../shared/services/storage-encryption.service';
// import { AuthInterceptor } from './auth-interceptor';

// const url = 'https://api.example.com/data';

// const interceptorOf = <T>(type: Type<T>) => TestBed
//   .inject(HTTP_INTERCEPTORS)
//   .find((interceptor) => interceptor instanceof type) as unknown as T;

// describe('AuthInterceptor', () => {
//   let interceptor: AuthInterceptor;
//   let httpClient: HttpClient;
//   let httpMock: HttpTestingController;
//   let commonServiceSpy: jasmine.SpyObj<CommonService>;
//   let msalServiceSpy: jasmine.SpyObj<MsalService>;
//   let storageServiceSpy: jasmine.SpyObj<StorageEncryptionService>;

//   beforeEach(() => {
//     commonServiceSpy = new CommonServiceMock().commonServiceSpy;

//     msalServiceSpy = new MsalServiceMock().msalServiceSpy;

//     storageServiceSpy = new StorageEncryptionServiceMock().storageEncryptionServiceSpy;

//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       providers: [
//         {
//           provide: MsalService,
//           useValue: msalServiceSpy,
//         },
//         {
//           provide: CommonService,
//           useValue: commonServiceSpy,
//         },
//         {
//           provide: StorageEncryptionService,
//           useValue: storageServiceSpy,
//         },
//         {
//           provide: HTTP_INTERCEPTORS,
//           useClass: AuthInterceptor,
//           multi: true,
//         },
//       ],
//     });

//     interceptor = interceptorOf(AuthInterceptor);
//     httpClient = TestBed.inject(HttpClient);
//     httpMock = TestBed.inject(HttpTestingController);
//   });

//   afterEach(() => {
//     httpMock.verify();
//   });

//   it('should be created', () => {
//     expect(interceptor).toBeTruthy();
//   });

//   it('should add Authorization header with token to outgoing requests', () => {
//     httpClient.get<any>(url).subscribe();

//     const httpRequest = httpMock.expectOne(url);

//     expect(httpRequest.request.headers.has('Authorization')).toBeTruthy();
//     expect(httpRequest.request.headers.get('Authorization')).toEqual(`Bearer ${authToken}`);

//     httpRequest.flush(new HttpResponse({ status: 200, body: {} }));
//   });

//   it('should handle 401 error by refreshing token and retrying the request', () => {
//     httpClient.get<any>(url).subscribe();

//     const httpRequest = httpMock.expectOne(url);

//     httpRequest.flush('error', new HttpErrorResponse({ status: 401 }));

//     expect(httpRequest.request.headers.has('Authorization')).toBeTruthy();
//     expect(httpRequest.request.headers.get('Authorization')).toEqual(`Bearer ${authToken}`);

//     const newRequest = httpMock.expectOne(url);

//     newRequest.flush(new HttpResponse({ status: 200, body: {} }));

//     expect(httpRequest.request.headers.has('Authorization')).toBeTruthy();
//     expect(newRequest.request.headers.get('Authorization')).toEqual(`Bearer ${authNewToken}`);

//     expect(msalServiceSpy.acquireTokenSilent).toHaveBeenCalledTimes(1);
//     expect(storageServiceSpy.deleteAccessToken).toHaveBeenCalledTimes(1);
//     expect(storageServiceSpy.setAccessToken).toHaveBeenCalledTimes(1);
//     expect(storageServiceSpy.setAccessToken).toHaveBeenCalledWith(authNewToken);
//   });

//   it('should not add Authorization header if access token is not present', () => {
//     storageServiceSpy.deleteAccessToken();

//     httpClient.get<any>(url).subscribe();

//     const httpRequest = httpMock.expectOne(url);

//     expect(httpRequest.request.headers.has('Authorization')).toBeFalsy();
//     expect(httpRequest.request.headers.get('Authorization')).toBeNull();

//     httpRequest.flush(new HttpResponse({ status: 200, body: {} }));
//   });

//   it('should not add Authorization header for adobeaemcloud requests', () => {
//     commonServiceSpy.checkIFCompCardDomain.and.returnValue(true);

//     httpClient.get<any>(url).subscribe();

//     const httpRequest = httpMock.expectOne(url);

//     expect(httpRequest.request.headers.has('Authorization')).toBeTruthy();
//     expect(httpRequest.request.headers.get('Authorization')).toEqual(`Bearer ${authToken}`);

//     httpRequest.flush('error', new HttpErrorResponse({ status: 401 }));

//     const newRequest = httpMock.expectOne(url);

//     expect(httpRequest.request.headers.has('Authorization')).toBeTruthy();
//     expect(newRequest.request.headers.get('Authorization')).toEqual(`Bearer ${authNewToken}`);

//     newRequest.flush(new HttpResponse({ status: 200, body: {} }));

//     expect(commonServiceSpy.checkIFCompCardDomain).toHaveBeenCalledTimes(1);
//     expect(msalServiceSpy.acquireTokenSilent).toHaveBeenCalledTimes(1);
//     expect(storageServiceSpy.deleteAccessToken).toHaveBeenCalledTimes(1);
//     expect(storageServiceSpy.setAccessToken).toHaveBeenCalledTimes(1);
//     expect(storageServiceSpy.setAccessToken).toHaveBeenCalledWith(authNewToken);
//   });

//   it('should handle other errors without refreshing token', () => {
//     httpClient.get<any>(url)
//       .subscribe({
//         error: () => {
//           expect(msalServiceSpy.acquireTokenSilent).not.toHaveBeenCalled();
//           expect(storageServiceSpy.deleteAccessToken).not.toHaveBeenCalled();
//           expect(storageServiceSpy.setAccessToken).not.toHaveBeenCalled();
//         },
//       });

//     const httpRequest = httpMock.expectOne(url);

//     httpRequest.flush('error', new HttpErrorResponse({ status: 403 }));

//     expect(httpRequest.request.headers.has('Authorization')).toBeTruthy();
//     expect(httpRequest.request.headers.get('Authorization')).toEqual(`Bearer ${authToken}`);
//   });

//   it('should handle token refresh error', () => {
//     const errorMsg = 'Failed to fetch Access Token';

//     const error = new Error(errorMsg);

//     msalServiceSpy.acquireTokenSilent.and.returnValue(throwError(error));

//     httpClient.get<any>(url)
//       .subscribe({
//         error: (err) => {
//           expect(msalServiceSpy.acquireTokenSilent).toHaveBeenCalledTimes(1);
//           expect(err.message).toEqual(errorMsg);
//           expect(storageServiceSpy.deleteAccessToken).not.toHaveBeenCalled();
//           expect(storageServiceSpy.setAccessToken).not.toHaveBeenCalled();
//         },
//       });

//     const httpRequest = httpMock.expectOne(url);

//     httpRequest.flush('error', new HttpErrorResponse({ status: 401 }));

//     expect(httpRequest.request.headers.has('Authorization')).toBeTruthy();
//     expect(httpRequest.request.headers.get('Authorization')).toEqual(`Bearer ${authToken}`);
//   });
// });
