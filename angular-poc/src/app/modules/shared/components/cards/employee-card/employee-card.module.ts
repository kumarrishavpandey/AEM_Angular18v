import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EmployeeCardComponent } from './employee-card.component';

@NgModule({
  declarations: [EmployeeCardComponent],
  imports: [
    CommonModule,
    BrowserModule,
  ],
  exports: [EmployeeCardComponent],
})
export class EmployeeCardModule {}
