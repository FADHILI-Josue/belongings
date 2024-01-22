import { Routes } from "@angular/router";
import { HomePageComponent } from "./home-page/home-page.component";
import { MatchPageComponent } from "./match-page/match-page.component";
import { NotFoundPageComponent } from "./not-found-page/not-found-page.component";
import { FixturesPageComponent } from "./fixtures-page/fixtures-page.component";
import { StatsComponent } from "./stats/stats.component";
import { StandingsComponent } from "./standings/standings.component";
import { ResultsComponent } from "./results/results.component";
import { ClubsComponent } from "./clubs/clubs.component";
import { PlayersComponent } from "./players/players.component";

export const routes: Routes = [
    {path: '', component:HomePageComponent},
    {path: 'match/:matchId', component:MatchPageComponent},
    {path: 'fixtures', component:FixturesPageComponent},
    {path: 'stats', component:StatsComponent},
    {path: 'standings', component:StandingsComponent},
    {path: 'results', component:ResultsComponent},
    {path: 'clubs', component:ClubsComponent},
    {path: 'players', component:PlayersComponent},
    {path: '**', component: NotFoundPageComponent}
  ];
  