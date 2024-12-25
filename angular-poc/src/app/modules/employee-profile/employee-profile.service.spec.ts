// import { TestBed } from '@angular/core/testing';
// import {
//   HttpClientTestingModule,
//   HttpTestingController,
// } from '@angular/common/http/testing';

// import { environment } from 'src/environments/environment';
// import {
//   ADD_EMP_EDUCATION,
//   ADD_EMP_EXPERIENCE,
//   DELETE_EMP_EDUCATION,
//   DELETE_EMP_EXPERIENCE,
//   EMP_LEAVE,
//   EMP_LEAVE_BALANCE,
//   EMP_PROFILE,
//   GET_EMP_EDUCATION,
//   GET_EMP_EXPERIENCE,
//   GET_EMP_PROFILE,
//   UPDATE_EMP_EDUCATION,
//   UPDATE_EMP_EXPERIENCE,
// } from 'src/app/app.api';
// import { HttpErrorResponse } from '@angular/common/http';
// import { EmployeeProfileService } from './employee-profile.service';

// describe('EmployeeProfileService', () => {
//   let service: EmployeeProfileService;
//   let httpTestingController: HttpTestingController;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       providers: [EmployeeProfileService],
//     });

//     service = TestBed.inject(EmployeeProfileService);
//     httpTestingController = TestBed.inject(HttpTestingController);
//   });

//   afterEach(() => {
//     httpTestingController.verify();
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   describe('getEmployee', () => {
//     it('should make a GET request to the correct endpoint with the employeeId', () => {
//       const employeeId = '123';
//       const mockResponse = {};

//       service.getEmployee(employeeId).subscribe((response) => {
//         expect(response).toEqual(mockResponse);
//       });

//       const expectedEndpoint = `${environment.AEM_BASE_URL}${environment.EMP_PROFILE_BASE_URL}/${EMP_PROFILE}/${employeeId}/${GET_EMP_PROFILE}`;
//       const req = httpTestingController.expectOne(expectedEndpoint);
//       expect(req.request.method).toEqual('GET');

//       req.flush(mockResponse);
//     });

//     it('should handle errors and return an observable with the error', () => {
//       const employeeId = '123';
//       const mockError = new ErrorEvent('Some error', {
//         error: new Error('Some error'),
//         message: 'Some error message',
//         filename: 'example.ts',
//         lineno: 42,
//         colno: 17,
//       });

//       service.getEmployee(employeeId).subscribe(
//         () => fail('Expected an error, but received a response'),
//         (error) => {
//           expect(error instanceof HttpErrorResponse).toBe(true);
//         },
//       );

//       const expectedEndpoint = `${environment.AEM_BASE_URL}${environment.EMP_PROFILE_BASE_URL}/${EMP_PROFILE}/${employeeId}/${GET_EMP_PROFILE}`;
//       const req = httpTestingController.expectOne(expectedEndpoint);

//       req.error(mockError);
//     });
//   });

//   describe('getEmpExperience', () => {
//     it('should make a GET request to the correct endpoint with the employeeId', () => {
//       const employeeId = '123';
//       const mockResponse = {};

//       service.getEmpExperience(employeeId).subscribe((response) => {
//         expect(response).toEqual(mockResponse);
//       });

//       const expectedEndpoint = `${environment.AEM_BASE_URL}${environment.EMP_PROFILE_BASE_URL}/${EMP_PROFILE}/${employeeId}${GET_EMP_EXPERIENCE}`;
//       const req = httpTestingController.expectOne(expectedEndpoint);
//       expect(req.request.method).toEqual('GET');

//       req.flush(mockResponse);
//     });
//     it('should handle errors and return an observable with the error', () => {
//       const employeeId = '123';
//       const mockError = new ErrorEvent('Some error', {
//         error: new Error('Some error'),
//         message: 'Some error message',
//         filename: 'example.ts',
//         lineno: 42,
//         colno: 17,
//       });

//       service.getEmpExperience(employeeId).subscribe(
//         () => fail('Expected an error, but received a response'),
//         (error) => {
//           expect(error instanceof HttpErrorResponse).toBe(true);
//         },
//       );

//       const expectedEndpoint = `${environment.AEM_BASE_URL}${environment.EMP_PROFILE_BASE_URL}/${EMP_PROFILE}/${employeeId}${GET_EMP_EXPERIENCE}`;
//       const req = httpTestingController.expectOne(expectedEndpoint);

//       req.error(mockError);
//     });
//   });

//   describe('getEmpEducation', () => {
//     it('should make a GET request to the correct endpoint with the employeeId', () => {
//       const employeeId = '123';
//       const mockResponse = {};

//       service.getEmpEducation(employeeId).subscribe((response) => {
//         expect(response).toEqual(mockResponse);
//       });

//       const expectedEndpoint = `${environment.AEM_BASE_URL}${environment.EMP_PROFILE_BASE_URL}/${EMP_PROFILE}/${employeeId}${GET_EMP_EDUCATION}`;
//       const req = httpTestingController.expectOne(expectedEndpoint);
//       expect(req.request.method).toEqual('GET');

//       req.flush(mockResponse);
//     });

//     it('should handle errors and return an observable with the error', () => {
//       const employeeId = '123';
//       const mockError = new ErrorEvent('Some error', {
//         error: new Error('Some error'),
//         message: 'Some error message',
//         filename: 'example.ts',
//         lineno: 42,
//         colno: 17,
//       });

//       service.getEmpEducation(employeeId).subscribe(
//         () => fail('Expected an error, but received a response'),
//         (error) => {
//           expect(error instanceof HttpErrorResponse).toBe(true);
//         },
//       );

//       const expectedEndpoint = `${environment.AEM_BASE_URL}${environment.EMP_PROFILE_BASE_URL}/${EMP_PROFILE}/${employeeId}${GET_EMP_EDUCATION}`;
//       const req = httpTestingController.expectOne(expectedEndpoint);

//       req.error(mockError);
//     });
//   });

//   describe('getLeaveBalance', () => {
//     it('should make a GET request to the correct endpoint with the employeeId', () => {
//       const employeeId = '123';
//       const mockResponse = {};

//       service.getLeaveBalance(employeeId).subscribe((response) => {
//         expect(response).toEqual(mockResponse);
//       });

//       const expectedEndpoint = `${environment.AEM_BASE_URL}${environment.EMP_LEAVE_BASE_URL}/${EMP_LEAVE}/${employeeId}${EMP_LEAVE_BALANCE}`;
//       const req = httpTestingController.expectOne(expectedEndpoint);
//       expect(req.request.method).toEqual('GET');

//       req.flush(mockResponse);
//     });

//     it('should handle errors and return an observable with the error', () => {
//       const employeeId = '123';
//       const mockError = new ErrorEvent('Some error', {
//         error: new Error('Some error'),
//         message: 'Some error message',
//         filename: 'example.ts',
//         lineno: 42,
//         colno: 17,
//       });

//       service.getLeaveBalance(employeeId).subscribe(
//         () => fail('Expected an error, but received a response'),
//         (error) => {
//           expect(error instanceof HttpErrorResponse).toBe(true);
//         },
//       );

//       const expectedEndpoint = `${environment.AEM_BASE_URL}${environment.EMP_LEAVE_BASE_URL}/${EMP_LEAVE}/${employeeId}${EMP_LEAVE_BALANCE}`;
//       const req = httpTestingController.expectOne(expectedEndpoint);

//       req.error(mockError);
//     });
//   });
//   describe('updateEmpExperience', () => {
//     it('should make a PUT request to the correct endpoint with the employeeId and data', () => {
//       const employeeId = '123';
//       const mockData = {};
//       const mockResponse = {};

//       service
//         .updateEmpExperience(employeeId, mockData)
//         .subscribe((response) => {
//           expect(response).toEqual(mockResponse);
//         });

//       const expectedEndpoint = `${environment.EMP_PROFILE_BASE_URL}/${EMP_PROFILE}/${employeeId}${UPDATE_EMP_EXPERIENCE}`;
//       const req = httpTestingController.expectOne(expectedEndpoint);
//       expect(req.request.method).toEqual('PUT');
//       expect(req.request.body).toEqual(mockData);

//       req.flush(mockResponse);
//     });

//     it('should handle errors and return an observable with the error', () => {
//       const employeeId = '123';
//       const mockData = {};
//       const mockError = new ErrorEvent('Some error', {
//         error: new Error('Some error'),
//         message: 'Some error message',
//         filename: 'example.ts',
//         lineno: 42,
//         colno: 17,
//       });

//       service.updateEmpExperience(employeeId, mockData).subscribe(
//         () => fail('Expected an error, but received a response'),
//         (error) => {
//           expect(error instanceof HttpErrorResponse).toBe(true);
//         },
//       );

//       const expectedEndpoint = `${environment.EMP_PROFILE_BASE_URL}/${EMP_PROFILE}/${employeeId}${UPDATE_EMP_EXPERIENCE}`;
//       const req = httpTestingController.expectOne(expectedEndpoint);

//       req.error(mockError);
//     });
//   });

//   describe('addEmpExperience', () => {
//     it('should make a POST request to the correct endpoint with the employeeId and data', () => {
//       const employeeId = '123';
//       const mockData = {};
//       const mockResponse = {};

//       service.addEmpExperience(employeeId, mockData).subscribe((response) => {
//         expect(response).toEqual(mockResponse);
//       });

//       const expectedEndpoint = `${environment.AEM_BASE_URL}${environment.EMP_PROFILE_BASE_URL}/${EMP_PROFILE}/${employeeId}${ADD_EMP_EXPERIENCE}`;
//       const req = httpTestingController.expectOne(expectedEndpoint);
//       expect(req.request.method).toEqual('POST');
//       expect(req.request.body).toEqual(mockData);

//       req.flush(mockResponse);
//     });

//     it('should handle errors and return an observable with the error', () => {
//       const employeeId = '123';
//       const mockData = {};
//       const mockError = new ErrorEvent('Some error', {
//         error: new Error('Some error'),
//         message: 'Some error message',
//         filename: 'example.ts',
//         lineno: 42,
//         colno: 17,
//       });

//       service.addEmpExperience(employeeId, mockData).subscribe(
//         () => fail('Expected an error, but received a response'),
//         (error) => {
//           expect(error instanceof HttpErrorResponse).toBe(true);
//         },
//       );

//       const expectedEndpoint = `${environment.AEM_BASE_URL}${environment.EMP_PROFILE_BASE_URL}/${EMP_PROFILE}/${employeeId}${ADD_EMP_EXPERIENCE}`;
//       const req = httpTestingController.expectOne(expectedEndpoint);

//       req.error(mockError);
//     });
//   });

//   describe('deleteEmpExperience', () => {
//     it('should make a DELETE request to the correct endpoint with the employeeId and expId', () => {
//       const employeeId = '123';
//       const expId = '456';
//       const mockResponse = {};

//       service.deleteEmpExperience(employeeId, expId).subscribe((response) => {
//         expect(response).toEqual(mockResponse);
//       });

//       const expectedEndpoint = `${environment.EMP_PROFILE_BASE_URL}/${EMP_PROFILE}/${expId}/${employeeId}${DELETE_EMP_EXPERIENCE}`;
//       const req = httpTestingController.expectOne(expectedEndpoint);
//       expect(req.request.method).toEqual('DELETE');

//       req.flush(mockResponse);
//     });

//     it('should handle errors and return an observable with the error', () => {
//       const employeeId = '123';
//       const expId = '456';
//       const mockError = new ErrorEvent('Some error', {
//         error: new Error('Some error'),
//         message: 'Some error message',
//         filename: 'example.ts',
//         lineno: 42,
//         colno: 17,
//       });

//       service.deleteEmpExperience(employeeId, expId).subscribe(
//         () => fail('Expected an error, but received a response'),
//         (error) => {
//           expect(error instanceof HttpErrorResponse).toBe(true);
//         },
//       );

//       const expectedEndpoint = `${environment.EMP_PROFILE_BASE_URL}/${EMP_PROFILE}/${expId}/${employeeId}${DELETE_EMP_EXPERIENCE}`;
//       const req = httpTestingController.expectOne(expectedEndpoint);

//       req.error(mockError);
//     });
//   });

//   describe('updateEmpEducation', () => {
//     it('should make a PUT request to the correct endpoint with the employeeId and data', () => {
//       const employeeId = '123';
//       const mockData = {};
//       const mockResponse = {};

//       service.updateEmpEducation(employeeId, mockData).subscribe((response) => {
//         expect(response).toEqual(mockResponse);
//       });

//       const expectedEndpoint = `${environment.EMP_PROFILE_BASE_URL}/${EMP_PROFILE}/${employeeId}${UPDATE_EMP_EDUCATION}`;
//       const req = httpTestingController.expectOne(expectedEndpoint);
//       expect(req.request.method).toEqual('PUT');
//       expect(req.request.body).toEqual(mockData);

//       req.flush(mockResponse);
//     });

//     it('should handle errors and return an observable with the error', () => {
//       const employeeId = '123';
//       const mockData = {};
//       const mockError = new ErrorEvent('Some error', {
//         error: new Error('Some error'),
//         message: 'Some error message',
//         filename: 'example.ts',
//         lineno: 42,
//         colno: 17,
//       });

//       service.updateEmpEducation(employeeId, mockData).subscribe(
//         () => fail('Expected an error, but received a response'),
//         (error) => {
//           expect(error instanceof HttpErrorResponse).toBe(true);
//         },
//       );

//       const expectedEndpoint = `${environment.EMP_PROFILE_BASE_URL}/${EMP_PROFILE}/${employeeId}${UPDATE_EMP_EDUCATION}`;
//       const req = httpTestingController.expectOne(expectedEndpoint);

//       req.error(mockError);
//     });
//   });

//   describe('addEmpEducation', () => {
//     it('should make a POST request to the correct endpoint with the employeeId and data', () => {
//       const employeeId = '123';
//       const mockData = {};
//       const mockResponse = {};

//       service.addEmpEducation(employeeId, mockData).subscribe((response) => {
//         expect(response).toEqual(mockResponse);
//       });

//       const expectedEndpoint = `${environment.AEM_BASE_URL}${environment.EMP_PROFILE_BASE_URL}/${EMP_PROFILE}/${employeeId}${ADD_EMP_EDUCATION}`;
//       const req = httpTestingController.expectOne(expectedEndpoint);
//       expect(req.request.method).toEqual('POST');
//       expect(req.request.body).toEqual(mockData);

//       req.flush(mockResponse);
//     });

//     it('should handle errors and return an observable with the error', () => {
//       const employeeId = '123';
//       const mockData = {};
//       const mockError = new ErrorEvent('Some error', {
//         error: new Error('Some error'),
//         message: 'Some error message',
//         filename: 'example.ts',
//         lineno: 42,
//         colno: 17,
//       });

//       service.addEmpEducation(employeeId, mockData).subscribe(
//         () => fail('Expected an error, but received a response'),
//         (error) => {
//           expect(error instanceof HttpErrorResponse).toBe(true);
//         },
//       );

//       const expectedEndpoint = `${environment.AEM_BASE_URL}${environment.EMP_PROFILE_BASE_URL}/${EMP_PROFILE}/${employeeId}${ADD_EMP_EDUCATION}`;
//       const req = httpTestingController.expectOne(expectedEndpoint);

//       req.error(mockError);
//     });
//   });

//   describe('deleteEmpEducation', () => {
//     it('should make a DELETE request to the correct endpoint with the employeeId and educationId', () => {
//       const employeeId = '123';
//       const educationId = '456';
//       const mockResponse = {};

//       service
//         .deleteEmpEducation(employeeId, educationId)
//         .subscribe((response) => {
//           expect(response).toEqual(mockResponse);
//         });

//       const expectedEndpoint = `${environment.EMP_PROFILE_BASE_URL}/${EMP_PROFILE}/${educationId}/${employeeId}${DELETE_EMP_EDUCATION}`;
//       const req = httpTestingController.expectOne(expectedEndpoint);
//       expect(req.request.method).toEqual('DELETE');

//       req.flush(mockResponse);
//     });

//     it('should handle errors and return an observable with the error', () => {
//       const employeeId = '123';
//       const educationId = '456';
//       const mockError = new ErrorEvent('Some error', {
//         error: new Error('Some error'),
//         message: 'Some error message',
//         filename: 'example.ts',
//         lineno: 42,
//         colno: 17,
//       });

//       service.deleteEmpEducation(employeeId, educationId).subscribe(
//         () => fail('Expected an error, but received a response'),
//         (error) => {
//           expect(error instanceof HttpErrorResponse).toBe(true);
//         },
//       );

//       const expectedEndpoint = `${environment.EMP_PROFILE_BASE_URL}/${EMP_PROFILE}/${educationId}/${employeeId}${DELETE_EMP_EDUCATION}`;
//       const req = httpTestingController.expectOne(expectedEndpoint);

//       req.error(mockError);
//     });
//   });
// });
