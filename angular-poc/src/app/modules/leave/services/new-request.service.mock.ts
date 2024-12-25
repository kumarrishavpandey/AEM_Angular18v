import { of } from 'rxjs';
import { NewRequestService } from './new-request.service';

export class NewRequestServiceMock {
  newRequestServiceSpy: jasmine.SpyObj<NewRequestService>;

  newRequestServiceMock = {
    getLeaveTypeAndBalanceApi: jasmine.createSpy('getLeaveTypeAndBalanceApi'),
    createNewLeaveRequestApi: jasmine.createSpy('createNewLeaveRequestApi'),
    getDurationAndReturnToWork: jasmine.createSpy('getDurationAndReturnToWork'),
    getAboutLeaveDataFromAEM: jasmine.createSpy('getAboutLeaveDataFromAEM'),
    uploadAttachmentWithApi: jasmine.createSpy('uploadAttachmentWithApi'),
  };

  constructor() {
    this.newRequestServiceSpy = jasmine.createSpyObj('NewRequestService', this.newRequestServiceMock);

    this.newRequestServiceSpy.getLeaveTypeAndBalanceApi.and.returnValue(of({}));

    this.newRequestServiceSpy.createNewLeaveRequestApi.and.returnValue(of({}));

    this.newRequestServiceSpy.getDurationAndReturnToWork.and.returnValue(of({}));

    this.newRequestServiceSpy.getAboutLeaveDataFromAEM.and.returnValue(of({}));

    this.newRequestServiceSpy.uploadAttachmentWithApi.and.returnValue(of({}));
  }
}
