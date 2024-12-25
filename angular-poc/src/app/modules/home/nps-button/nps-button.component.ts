import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NpsFeedbackComponent } from '../../shared/components/nps-feedback/nps-feedback.component';

@Component({
  selector: 'app-nps-button',
  templateUrl: './nps-button.component.html',
  styleUrls: ['./nps-button.component.scss'],
})
export class NpsButtonComponent {
  @Input()
  siteSection: string;

  @Input()
  btnFeedbackNps: string;

  constructor(public dialog: MatDialog) {}

  openFeedbackDialog() {
    const dialog = this.dialog.open(NpsFeedbackComponent, {
      panelClass: 'feedback-dialog',
    });

    dialog.afterClosed().subscribe(() => {});
  }
}
