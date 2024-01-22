import { Component } from '@angular/core';
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-toogle-mode',
  templateUrl: './toogle-mode.component.html',
  styleUrls: ['./toogle-mode.component.css']
})
export class ToogleModeComponent {
  faMoon = faMoon;
  faSun = faSun
}
