import { Component, Input } from '@angular/core';
import { EnumSkeletonUnit } from 'src/app/shared/components/skeleton/skeleton.enum';

@Component({
  selector: 'app-stack-card-skeleton',
  templateUrl: './stack-card-skeleton.component.html',
  styleUrls: ['./stack-card-skeleton.component.scss'],
})
export class StackCardSkeletonComponent {
  @Input()
  stackCardCount: number = 1;

  enumSkeletonUnit = EnumSkeletonUnit;
}
