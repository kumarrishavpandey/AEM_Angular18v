import { Component, Input, OnInit } from '@angular/core';
import { MapTo } from '@adobe/aem-angular-editable-components'

@Component({
  selector: 'app-rishav',
  standalone: true,
  imports: [],
  templateUrl: './rishav.component.html',
  styleUrl: './rishav.component.scss'
})
export class RishavComponent  implements OnInit{
  @Input() rishavData : string | undefined;

  ngOnInit(): void {
    console.log("this is for testing.");
  }

}

MapTo('myai/components/rishav')(RishavComponent);
