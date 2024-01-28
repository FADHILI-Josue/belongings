import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SidebarComponent } from './components/common/sidebar/sidebar.component';
import { ButtonComponent } from './components/ui/button/button.component';
import { LayoutComponent } from './components/layout/layout.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { ToogleModeComponent } from './components/ui/toogle-mode/toogle-mode.component';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { MatchPageComponent } from './pages/match-page/match-page.component';
import { MatchChartComponent } from './components/match/chart/chart.component';
import { NgApexchartsModule } from 'ng-apexcharts'
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { FixturesPageComponent } from './pages/fixtures-page/fixtures-page.component';
import { LogoComponent } from './components/common/logo/logo.component';
import { StatsComponent } from './pages/stats/stats.component';
import { StandingsComponent } from './pages/standings/standings.component';
import { ResultsComponent } from './pages/results/results.component';
import { ClubsComponent } from './pages/clubs/clubs.component';
import { PlayersComponent } from './pages/players/players.component';
import { LoaderComponent } from './components/ui/loader/loader.component';
import { SvgIconComponent } from './components/ui/svg-icon/svg-icon.component';
import { CardloaderComponent } from './components/ui/cardloader/cardloader.component';
import { StatsCardComponent } from './components/stats/stats-card/stats-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    SidebarComponent,
    ButtonComponent,
    LayoutComponent,
    ToogleModeComponent,
    NavbarComponent,
    MatchPageComponent,
    MatchChartComponent,
    NotFoundPageComponent,
    FixturesPageComponent,
    LogoComponent,
    StatsComponent,
    StandingsComponent,
    ResultsComponent,
    ClubsComponent,
    PlayersComponent,
    LoaderComponent,
    SvgIconComponent,
    CardloaderComponent,
    StatsCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    NgApexchartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
