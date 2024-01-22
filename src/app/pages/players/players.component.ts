import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Player, playerPosition } from 'src/app/services/data.types';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent {
  public players:Player[] = [];
  public iSloading = true;

  ngOnInit(): void {
    this.dataService.getPlayers();
    this.dataService.players$.subscribe((players) => {
      this.players = players.map((player: any) => ({
        ...player,
        position: playerPosition[player.position as keyof typeof playerPosition] || "Unknown Position",
      }));
    });
    this.dataService.loading$.subscribe((loading) => this.iSloading = loading);
  }

  constructor(private dataService: DataService) { }
}
