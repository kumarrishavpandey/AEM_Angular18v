import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-common-error-message-bar',
  templateUrl: './common-error-message-bar.component.html',
  styleUrls: ['./common-error-message-bar.component.scss'],
})
export class CommonErrorMessageBarComponent {
  @Input() errorMessagesList = [];

  @Input() errorMessage = '';
}
