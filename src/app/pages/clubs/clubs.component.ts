import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Club } from 'src/app/services/data.types';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.css']
})


export class ClubsComponent {
  public clubs:Club[] = [];
  public iSloading = true;

  ngOnInit(): void {
    this.dataService.getClubs();
    this.dataService.clubs$.subscribe((clubs) => this.clubs = clubs);
    this.dataService.loading$.subscribe((loading) => this.iSloading = loading);
  }

  constructor(private dataService: DataService) { }
}
