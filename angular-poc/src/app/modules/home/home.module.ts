import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AngularMaterialModule } from '../../angular-material.module';
import { SharedModule } from '../shared/shared.module';
import { ChunkPipe } from '../shared/pipes/chunk.pipe';
import { DateWithoutYearPipe } from '../shared/pipes/date-without-year.pipe';
import { ExploreMyaiComponent } from './explore-myai/explore-myai.component';
import { BannerComponent } from './banner/banner.component';
import { WorkplaceComponent } from './workplace/workplace.component';
import { NpsButtonComponent } from './nps-button/nps-button.component';
import { HomeService } from './home.service';
import { EmpDashboardAwardsComponent } from './emp-dashboard-awards/emp-dashboard-awards.component';
import { MyBoardComponent } from './my-board/my-board.component';
import { QuickActionComponent } from './quick-action/quick-action.component';
import { UpcomingAlertsComponent } from './upcoming-alerts/upcoming-alerts.component';
import { UpcomingAlertModalComponent } from './upcoming-alert-modal/upcoming-alert-modal.component';
import { AwardsRosterComponent } from './awards-roster/awards-roster.component';
import { HomeComponent } from './home.component';
import { ChatBotDialogComponent } from './chat-bot-dialog/chat-bot-dialog.component';
import { RouterModule, Routes } from '@angular/router';

// const routes: Routes = [
//   {
//     path: '',
//     component: HomeComponent,
//   },
// ];

@NgModule({
  declarations: [
    ExploreMyaiComponent,
    BannerComponent,
    WorkplaceComponent,
    NpsButtonComponent,
    EmpDashboardAwardsComponent,
    MyBoardComponent,
    QuickActionComponent,
    UpcomingAlertsComponent,
    UpcomingAlertModalComponent,
    AwardsRosterComponent,
    HomeComponent,
    ChatBotDialogComponent,
  ],
  imports: [
  ],
  providers: [HomeService, ChunkPipe, DateWithoutYearPipe, DatePipe],
})
export class HomeModule {}
