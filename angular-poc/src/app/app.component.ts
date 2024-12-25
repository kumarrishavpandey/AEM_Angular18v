import { Component, OnInit } from '@angular/core';
import { CommonService } from './modules/shared/services/common.service';
import { environment } from '../environments/environment';
import { DynamicScriptLoaderService } from './modules/shared/services/dynamic-script-loader.service';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(
    private commonService: CommonService,
    private scriptLoader: DynamicScriptLoaderService
  ) {
    this.loadLoggedIndata();
  }
  title = 'myai-ng18';

  ngOnInit(): void {
    if (environment.CHATBOT_ENABLE === 'true') {
      this.commonService.getEmpDataStatus().subscribe((empstatus) => {
        if (empstatus && !this.commonService.checkIfVistaraLocale()) {
          this.scriptLoader.load('chatbot-js', 'chatbot-css');
        }
      });
    }
  }
  async loadLoggedIndata() {
   let id =  sessionStorage.getItem('employeeid')
    await this.commonService.fetchEmpDataV2(id);
  }
}
