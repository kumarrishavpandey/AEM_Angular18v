import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonService } from '../shared/services/common.service';
import { NavigationService } from '../navigation/navigation.service';
import { SharedModule } from '../shared/shared.module';
import { AngularMaterialModule } from '../../angular-material.module';

const routes: Routes = [
  {
    path: '',
    component: HeaderComponent,
  },
];

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    AngularMaterialModule,
  ],
  exports: [HeaderComponent],
  providers: [CommonService, NavigationService],
  schemas: [NO_ERRORS_SCHEMA],
})
export class HeaderModule {}
