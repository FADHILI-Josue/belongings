import { Injectable } from '@angular/core';
import { Observable, Subject} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UiService {
  getDarkMode(): boolean {
    const storedTheme = localStorage.getItem('theme-mode');
    if (storedTheme && ['light', 'dark'].includes(storedTheme)) {
      return (storedTheme === 'dark');
    }
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  // properties
  private darkMode: boolean = this.getDarkMode();
  private sideBar: boolean = false;
  private subject = new Subject<any>();
  private sideBarSubject = new Subject<boolean>();
  constructor() {}
  

  toogleDarkmode() {
    this.darkMode = !this.darkMode;
    this.subject.next(this.darkMode);
    localStorage.setItem('theme-mode', this.darkMode ? 'dark' : 'light');
  }
  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }

  openSidebar() {
    this.sideBarSubject.next(true);
   }
  
  closeSidebar() {
    this.sideBarSubject.next(false);
  }

  getSidebarSheetObservable(): Observable<any> {
    return this.sideBarSubject.asObservable()
  }

}
