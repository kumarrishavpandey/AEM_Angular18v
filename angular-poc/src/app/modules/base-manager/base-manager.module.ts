import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, TitleCasePipe } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectSearchModule } from 'mat-select-search';
import { BaseManagerCurrentRequestComponent } from './base-manager-list/base-manager-view-details/base-manager-current-request/base-manager-current-request.component';
import { BaseManagerHistoryComponent } from './base-manager-list/base-manager-view-details/base-manager-history/base-manager-history.component';
import { DeclineRequestDialogComponent } from './base-manager-list/base-manager-view-details/base-manager-current-request/decline-request-dialog/decline-request-dialog.component';
import { BaseManagerListComponent } from './base-manager-list/base-manager-list.component';
import { BaseManagerComponent } from './base-manager.component';
import { BaseManagerViewDetailsComponent } from './base-manager-list/base-manager-view-details/base-manager-view-details.component';

@NgModule({
  declarations: [
    BaseManagerComponent,
    BaseManagerListComponent,
    BaseManagerCurrentRequestComponent,
    BaseManagerHistoryComponent,
    DeclineRequestDialogComponent,
    BaseManagerViewDetailsComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    SharedModule,
    MatSelectSearchModule,
  ],
  providers: [DatePipe, TitleCasePipe],
})
export class BaseManagerModule {}
