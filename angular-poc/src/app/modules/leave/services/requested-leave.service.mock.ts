import { of } from 'rxjs';
import { RequestedLeaveService } from './requested-leave.service';

export class RequestedLeaveServiceMock {
  requestedLeaveServiceSpy: jasmine.SpyObj<RequestedLeaveService>;

  requestedLeaveServiceMock = {
    getLeaveDataWithId: jasmine.createSpy('getLeaveDataWithId'),
    getRequestLeaveData: jasmine.createSpy('getRequestLeaveData'),
    cancelLeaveRequestApi: jasmine.createSpy('cancelLeaveRequestApi'),
    deleteLeaveRequestApi: jasmine.createSpy('deleteLeaveRequestApi'),
    updateLeaveRequestApi: jasmine.createSpy('updateLeaveRequestApi'),
    uploadAttachmentWithApi: jasmine.createSpy('uploadAttachmentWithApi'),
  };

  constructor() {
    this.requestedLeaveServiceSpy = jasmine.createSpyObj('NewRequestService', this.requestedLeaveServiceMock);

    this.requestedLeaveServiceSpy.getLeaveDataWithId.and.returnValue(of({}));

    this.requestedLeaveServiceSpy.getRequestLeaveData.and.returnValue(of({}));

    this.requestedLeaveServiceSpy.cancelLeaveRequestApi.and.returnValue(of({}));

    this.requestedLeaveServiceSpy.deleteLeaveRequestApi.and.returnValue(of({}));

    this.requestedLeaveServiceSpy.updateLeaveRequestApi.and.returnValue(of({}));

    this.requestedLeaveServiceSpy.uploadAttachmentWithApi.and.returnValue(of({}));
  }
}
