import { Component, OnInit } from '@angular/core';
import { formatDate } from './utlls';
import { formatDateTime } from 'src/lib/date-utils';
import { fixture } from 'src/app/services/data.types';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-fixtures-page',
  templateUrl: './fixtures-page.component.html',
})
export class FixturesPageComponent implements OnInit {
  public fixtures:fixture[] = [];
  public iSloading = true;

  ngOnInit(): void {
    this.dataService.getFixtures();
    this.dataService.fixtures$.subscribe((matches) => this.fixtures = matches);
    this.dataService.loading$.subscribe((loading) => this.iSloading = loading);
  }

  constructor(private dataService: DataService) { }

  // Functions definitions
  formatDateAndTime = formatDateTime;
  formatTitleTime = formatDate
}
