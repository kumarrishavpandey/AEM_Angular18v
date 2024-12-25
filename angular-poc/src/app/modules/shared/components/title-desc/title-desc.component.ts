import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title-desc',
  templateUrl: './title-desc.component.html',
  styleUrls: ['./title-desc.component.scss'],
})
export class TitleDescComponent {
  @Input() titleDesc: string | undefined;
}
