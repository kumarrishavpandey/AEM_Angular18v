import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RishavComponent } from './rishav/rishav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RishavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-projects';
}
