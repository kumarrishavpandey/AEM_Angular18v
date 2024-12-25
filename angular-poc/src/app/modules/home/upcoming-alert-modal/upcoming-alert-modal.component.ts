import {
  Component, Inject, OnInit, Optional,
} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upcoming-alert-modal',
  templateUrl: './upcoming-alert-modal.component.html',
  styleUrls: ['./upcoming-alert-modal.component.scss'],
})
export class UpcomingAlertModalComponent implements OnInit {
  userPersona = '';

  alertList: any[] = [];

  constructor(
    public dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
  ) {
    this.userPersona = this.data.userPersona;
  }

  ngOnInit(): void {
    if (this.userPersona === 'Pilot' || this.userPersona === 'Cabin Crew') {
      this.alertList = this.data.pilotCrewAlertInfo;
    } else {
      this.alertList = this.data?.employeeAlertInfo;
    }
  }

  navigateToURL(data) {
    if (data?.isExternal) {
      if (
        data?.externalLink?.toLowerCase().startsWith('https://')
        || data?.externalLink?.toLowerCase().startsWith('http://')
      ) {
        window.open(data?.externalLink, '_blank');
      } else {
        this.closeDialog();
        this.router.navigateByUrl(data?.externalLink);
      }
    }
  }

  // Attempt to close dialog
  closeDialog() {
    this.dialog.closeAll();
  }
}
