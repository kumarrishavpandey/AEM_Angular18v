import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AnchorTagComponent } from './anchor-tag.component';

@NgModule({
  declarations: [AnchorTagComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
  ],
  exports: [AnchorTagComponent],
})
export class AnchorTagModule {}
