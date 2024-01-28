import { Component, Input } from '@angular/core';
import { PlayerStats } from 'src/lib/@types';

@Component({
  selector: 'app-stats-card',
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.css']
})
export class StatsCardComponent {
@Input() name: string = "";
@Input() stats: PlayerStats[] = [];
@Input() subHeader: string = "";
}
