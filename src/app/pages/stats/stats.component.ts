import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { PlayerStats, TeamStats } from 'src/lib/@types';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent {
  public playerStats:Record<'mostGoals' | "mostTackles" | "mostAssists" | "mostPasses",PlayerStats[]> = {
    mostAssists: [],
    mostGoals: [],
    mostTackles: [],
    mostPasses: []
  };

  public teamStats: Record<"mostCorners" | "mostFreeKicks" | "mostShots" | "mostShotsOnTarget", TeamStats[]>={
    mostCorners: [],
    mostFreeKicks: [],
    mostShots: [],
    mostShotsOnTarget: []
  };
  public iSloading = true;

  ngOnInit(): void {
    this.dataService.getPlayerStats();
    this.dataService.getTeamStats();
    this.dataService.playerStats$.subscribe((stats) => this.playerStats = stats);
    this.dataService.teamStats$.subscribe((stats) => this.teamStats = stats);
    this.dataService.loading$.subscribe((loading) => this.iSloading = loading);
  }

  constructor(private dataService: DataService) { }
}
