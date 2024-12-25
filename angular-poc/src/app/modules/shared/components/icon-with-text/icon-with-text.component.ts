import { Component, EventEmitter, Input, Output } from '@angular/core';
import { getNavBarDynamicImagePath } from '../../../../../utils/utils';

@Component({
  selector: 'app-icon-with-text',
  templateUrl: './icon-with-text.component.html',
  styleUrls: ['./icon-with-text.component.scss'],
})
export class IconWithTextComponent {
  @Input() tool: any | undefined;

  @Input() borderRadius: number = 8;

  @Output() clickLink: EventEmitter<any> = new EventEmitter();

  @Input() isClass: boolean = false;

  hover: boolean = false;

  onClick() {
    this.clickLink.emit();
  }

  getIconPath(url) {
    const urlParts = url.split('/');
    const fileNameWithExtension = urlParts[urlParts.length - 1];
    const [fileName, fileExtension] = fileNameWithExtension.split('.');
    return getNavBarDynamicImagePath(fileName, fileExtension);
  }
}
