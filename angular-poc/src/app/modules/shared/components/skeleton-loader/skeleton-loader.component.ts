import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton-loader',
  templateUrl: './skeleton-loader.component.html',
  styleUrls: ['./skeleton-loader.component.scss'],
})
export class SkeletonLoaderComponent {
  @Input() type: any;

  @Input() height: any;

  @Input() width: any;

  @Input() borderRadius?: any;

  @Input() repeatLoader?: string;

  get loadersArray() {
    return new Array(this.repeatLoader || 1);
  }

  get spacing() {
    return 10;
  }
}
