import { Component, HostBinding, HostListener } from '@angular/core';
import { UiService } from './services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private readonly THEME_KEY = 'theme-mode';

  
  getDarkMode(): boolean {
    const storedTheme = localStorage.getItem(this.THEME_KEY);
    if (storedTheme && ['light', 'dark'].includes(storedTheme)) {
      return (storedTheme === 'dark');
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }


  darkMode: boolean = this.getDarkMode();
  subscription: Subscription;

  @HostBinding('class.dark') get mode() {return this.darkMode; }
  constructor(private uiService: UiService){
    this.subscription = this.uiService
    .onToggle()
    .subscribe((value) => (this.darkMode = value));
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    event.target.innerWidth > 1024 && this.uiService.closeSidebar()
  }
}
