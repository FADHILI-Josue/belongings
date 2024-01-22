import { Component } from '@angular/core';

@Component({
  selector: 'app-match-page',
  templateUrl: './match-page.component.html',
  styleUrls: ['./match-page.component.css']
})
export class MatchPageComponent {
  shortenName(fullName:string) {
    const names = fullName.split(' ');
    if (names.length >= 2) {
      const firstName = names[0];
      const lastName = names[names.length - 1];
      const shortenedName = `${firstName.charAt(0).toLowerCase()}.${lastName.toLowerCase()}`;
      return shortenedName;
    }
    return fullName;
  }
  
  fullName = "Christiano Ronaldo";
  shortenedName = this.shortenName(this.fullName);

  generateRandomArray() {
    const randomArray = [];
    for (let i = 0; i < 5; i++) {
      const randomNumber1 = Math.floor(Math.random() * 101); // Generates a random number between 0 and 100
      const randomNumber2 = Math.floor(Math.random() * 101); // Generates another random number between 0 and 100
      randomArray.push([randomNumber1, randomNumber2]);
    }
    return randomArray;
  }
  myRandomArray = this.generateRandomArray();
  
  
}
