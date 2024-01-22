import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css']
})
export class StandingsComponent implements OnInit {
  public iSloading = true;
  public table:any[] = [];
  ngOnInit(): void {
    this.dataService.getStandings();
    this.dataService.standings$.subscribe((s) => {console.log(s);this.table = s});
    this.dataService.loading$.subscribe((loading) => this.iSloading = loading);
  }
  constructor(private dataService: DataService) {}
}
