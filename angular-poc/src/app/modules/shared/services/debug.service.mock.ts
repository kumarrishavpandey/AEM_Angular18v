import { DebugService } from './debug.service';

export class DebugServiceMock {
  debugServiceSpy: jasmine.SpyObj<DebugService>;

  debugServiceMock = {
    log: jasmine.createSpy('log'),
    error: jasmine.createSpy('error'),
    warn: jasmine.createSpy('warn'),
    info: jasmine.createSpy('info'),
    debug: jasmine.createSpy('debug'),
    trace: jasmine.createSpy('trace'),
  };

  constructor() {
    this.debugServiceSpy = jasmine.createSpyObj('DebugService', this.debugServiceMock);
  }
}
