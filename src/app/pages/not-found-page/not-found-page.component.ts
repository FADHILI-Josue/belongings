import { Component } from '@angular/core';
import { faFutbol } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.css']
})
export class NotFoundPageComponent {
  faFootBall = faFutbol;

}
