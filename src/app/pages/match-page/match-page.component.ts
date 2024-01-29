import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-match-page',
  templateUrl: './match-page.component.html',
  styles: ['th, td {padding: 1rem 0;}']
})
export class MatchPageComponent implements OnInit, OnDestroy {
  public match: any = {};
  public iSloading = true;

  constructor(private route: ActivatedRoute, private dataService: DataService) { }
  private routeSubscription: Subscription = new Subscription();
  public teamsAccuracies: Array<{ title: string, values: { home: number, away: number } }> = [];
  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(params => {
      const id: string = params['matchId'];
      this.dataService.getMatch(id);
      this.dataService.match$.subscribe(s => {
        this.match = s;
        this.teamsAccuracies = [
          {
            title: 'freekick',
            values: {
              home: s.homeTeamAccuracy.freeKickAccuracy ?? 0,
              away: s.awayTeamAccuracy.freeKickAccuracy ?? 0,
            }
          },
          {
            title: 'corners',
            values: {
              home: s.homeTeamAccuracy.cornersAccuracy ?? 0,
              away: s.awayTeamAccuracy.cornersAccuracy ?? 0,
            }
          },
          {
            title: 'shooting',
            values: {
              home: s.homeTeamAccuracy.shootingAccuracy ?? 0,
              away: s.awayTeamAccuracy.shootingAccuracy ?? 0,
            }
          },
          {
            title: 'passing',
            values: {
              home: s.homeTeamAccuracy.passAccuracy ?? 0,
              away: s.awayTeamAccuracy.passAccuracy ?? 0,
            }
          },
          {
            title: 'tackling',
            values: {
              home: s.homeTeamAccuracy.tackleAccuracy ?? 0,
              away: s.awayTeamAccuracy.tackleAccuracy ?? 0,
            },
          },
        ]
      });
      this.dataService.loading$.subscribe((loading) => this.iSloading = loading);
    });
  }
  shortenName(fullName: string) {
    const names = fullName.split(' ');
    if (names.length >= 2) {
      const firstName = names[0];
      const lastName = names[names.length - 1];
      const shortenedName = `${firstName.charAt(0).toLowerCase()}.${lastName.toLowerCase()}`;
      return shortenedName;
    }
    return fullName;
  }

  ngOnDestroy() {
    // unsubscribe to avoid memory leaks
    this.routeSubscription.unsubscribe();
  }
}
