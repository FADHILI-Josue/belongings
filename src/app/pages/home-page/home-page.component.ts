import { Component, OnInit, signal } from '@angular/core';
import { VariantEnum } from 'src/app/components/ui/button/button.variants';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { fixture } from 'src/app/services/data.types';
import { formatDateTime } from 'src/lib/date-utils';
import { Title, Meta } from '@angular/platform-browser';



@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit {
  public fixtures: fixture[] = [];
  public matches: any[] = [];
  public table: any[] = [];
  public sd: any[] = [];
  public iSloading = true;

  ngOnInit(): void {
    this.dataService.getFixtures();
    this.dataService.getMatches();
    this.dataService.getFixtures();
    this.dataService.getStandings();
    this.dataService.playedMatches$.subscribe((matches) => this.matches = matches);
    this.dataService.fixtures$.subscribe((matches) => this.fixtures = matches);
    this.dataService.standings$.subscribe((s) => this.table = s);
    this.dataService.loading$.subscribe((loading) => this.iSloading = loading);
  }

  constructor(private router: Router, private dataService: DataService, private titleService: Title, private metaService: Meta) {
    this.titleService.setTitle('Belongings League Football News, Fixtures, Scores & Results');
    this.metaService.addTags([
      { name: 'description', content: 'Belongings League Football is an app to provide the News, Fixtures, Scores & Results from the competiotions in rwanda coding academy ' },
      { name: 'author', content: 'FADHILI Josue'},
      {charset: 'UTF-8'}
    ]);
  }
  ActiveTab = signal('latest');
  setActiveTab(tab: string) {
    console.log(this.ActiveTab())
    this.ActiveTab() === 'latest' ? this.ActiveTab.set(tab) : this.ActiveTab.set(tab);
  }
  tab = this.ActiveTab();
  click = () => console.log('hello')
  v1 = VariantEnum.default
  v2 = VariantEnum.destructive

  navigateToMatch(id: string): void {
    this.router.navigate(['/match', id]); // Navigate to the defined route
  }

  formatDateAndTime = formatDateTime;
}
