import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// import { GET_TODO_COUNTS, MYAI_LOGOUT, TODO_REQUESTS } from 'src/app/app.api';
import { CommonService } from '../shared/services/common.service';
import { HttpService } from '../shared/services/http.service';
import { StorageEncryptionService } from '../shared/services/storage-encryption.service';
import { environment } from '../../../environments/environment';
import { GET_TODO_COUNTS, MYAI_LOGOUT, TODO_REQUESTS } from '../../app.api';
// import { CommonService } from 'src/app/shared/services/common.service';
// import { HttpService } from 'src/app/shared/services/http.service';
// import { StorageEncryptionService } from 'src/app/shared/services/storage-encryption.service';
// import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  private toDoCountSubject = new BehaviorSubject<number>(0);

  constructor(
    private commonService: CommonService,
    private httpService: HttpService,
    private storageEncryptionService: StorageEncryptionService,
  ) { }

  setToDoCount(count: number) {
    this.toDoCountSubject.next(count);
  }

  getToDoCount() {
    return this.toDoCountSubject.asObservable();
  }

  getHeaderToDoCount() {
    const employeeId = this.storageEncryptionService.getEmpId();

    const endpoint = `${TODO_REQUESTS}${GET_TODO_COUNTS}${employeeId}`;

    return this.httpService.get(environment.TODO_BASE_URL, endpoint);
  }

  getAEMKeys(){
    return this.httpService.get("", 'content/experience-fragments/myai_xf/in/header/header/master/jcr:content/root/container/header.model.json',{ 'Referer' : 'myai-dev.airindia.com/content'});
  }

  fetchToDoCount() {
    this.commonService.getEmpDataStatus().subscribe((loggedIn) => {
      if (loggedIn) {
        this.getHeaderToDoCount().subscribe((res) => {
          if (res.status.code === 200 && res.data) {
            if (res.data.count && !Number.isNaN(res.data.count)) {
              this.setToDoCount(parseInt(res.data.count, 10));
            }
          }
        });
      }
    });
  }

  logout(){
    return this.httpService.get(environment.EMP_PROFILE_BASE_URL, MYAI_LOGOUT);
  }
}
