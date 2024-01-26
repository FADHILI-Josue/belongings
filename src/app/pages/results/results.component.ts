import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {
  public iSloading = true;
  public playedmatches:any[] = [];
  ngOnInit(): void {
    this.dataService.getMatches();
    this.dataService.playedMatches$.subscribe((s) => { console.log(s);this.playedmatches = s});
    this.dataService.loading$.subscribe((loading) => this.iSloading = loading);
  }
  constructor(private dataService: DataService) {}
}
