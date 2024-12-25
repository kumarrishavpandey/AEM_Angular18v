// /* eslint-disable no-console */
// import { TestBed } from '@angular/core/testing';
// import { environment } from 'src/environments/environment';
// import { DebugService } from './debug.service';

// describe('DebugService', () => {
//   let debugService: DebugService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [DebugService],
//     });
//     debugService = TestBed.inject(DebugService);
//     environment.DEBUG_MODE = true;
//   });

//   it('should be created', () => {
//     expect(debugService).toBeTruthy();
//   });

//   it('should log messages in debug mode', () => {
//     spyOn(console, 'log');

//     debugService.log('Test Log');

//     expect(console.log).toHaveBeenCalledWith('[LOG]', 'Test Log');
//   });

//   it('should log errors in debug mode', () => {
//     spyOn(console, 'error');

//     debugService.error('Test Error');

//     expect(console.error).toHaveBeenCalledWith('[ERROR]', 'Test Error');
//   });

//   it('should not log messages when debug mode is disabled', () => {
//     environment.DEBUG_MODE = false;

//     spyOn(console, 'log');

//     debugService.log('Test Log');

//     expect(console.log).not.toHaveBeenCalled();
//   });

//   it('should not log errors when debug mode is disabled', () => {
//     environment.DEBUG_MODE = false;

//     spyOn(console, 'error');

//     debugService.error('Test Error');

//     expect(console.error).not.toHaveBeenCalled();
//   });
// });
