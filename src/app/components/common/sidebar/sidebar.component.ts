import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostBinding, HostListener, OnDestroy, OnInit, ViewChild, effect, signal } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { faCoffee,faFutbol, faHome, faNoteSticky } from '@fortawesome/free-solid-svg-icons';
import { UiService } from 'src/app/services/ui.service';
import { Subscription,BehaviorSubject } from 'rxjs';
import { NavLink } from 'src/lib/@types';
import { navLinks } from 'src/lib/constants';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})


export class SidebarComponent implements OnInit, OnDestroy {
  sidebarOpen = false;
  sidebarOpensub = new BehaviorSubject(false);
  private subscription:Subscription;
  constructor(private uiService:UiService,private router: Router,private elementRef: ElementRef,private cdr: ChangeDetectorRef) {
    this.subscription = this.uiService.getSidebarSheetObservable().subscribe((e:boolean) =>{ console.log(e); this.sidebarOpensub.next(e); this.sidebarOpensub.subscribe((e)=> this.sidebarOpen = e)});
  }
  @HostListener('document:click', ['$event'])
  public onClick(event: MouseEvent): void {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.sidebarOpen ? this.closeSideBar(): null;
    }
    // this.sidebarOpensub.subscribe((e)=> this.sidebarOpen = e)
  }
  
  closeSideBar():void {
    this.uiService.closeSidebar()
  }
  toogleDarkMode() {
    this.uiService.toogleDarkmode();
  }

  // ICONS
  faCoffee = faCoffee;
  faFootBall = faFutbol;
  faHome = faHome;
  faDocument = faNoteSticky;
  navlinks:NavLink[] = navLinks;
  svg = `
    <svg width="166px" height="166px" viewBox="-4.8 -4.8 57.60 57.60" xmlns="http://www.w3.org/2000/svg" fill="#1ca7e3" stroke="#1ca7e3" stroke-width="0.528" transform="matrix(1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.576"><defs><style>.a{fill:none;stroke:#000000;stroke-linecap:round;stroke-linejoin:round;}</style></defs><path class="a" d="M30.2374,9.5s.0977-3.1487,1.0209-4.49a13.317,13.317,0,0,0-2.3748,2.5913l-.259.0011L28.37,3.5,25.0467,7.334,22.6706,3.5284l-1.554,4.1992L16.94,4.7677c.21,1.3474.4382,2.77.5321,4.0948A12.607,12.607,0,0,0,14.46,6.923a12.0817,12.0817,0,0,1,2.2144,4.2686A18.1192,18.1192,0,0,1,30.2376,9.5Z"></path><path class="a" d="M26.17,25.0128l1.652,3.4366a.8194.8194,0,0,0,.7414.1932A11.2078,11.2078,0,0,0,31.63,27.074c.6526-.548,1.3279-1.0757,1.3279-1.0757l.08-2.2388L31.04,22.5559l-.7052-.0238Z"></path><path class="a" d="M34.278,23.81l1.5912-1.245.5962,1.8944.0541,2.3989-.4658,1.3652-1.7615-2.2106Z"></path><path class="a" d="M28.8441,30.4293l1.2331,2.1463a4.7238,4.7238,0,0,0,1.7772-.69c.5146-.46.7421-.6949.7421-.6949a.7347.7347,0,0,1,.3054.5526c-.0141.3263,0,2.01,0,2.01a5.0618,5.0618,0,0,0,1.7672-1.7615c.3431-.89.6377-1.9549.6377-1.9549s-.4562-1.6725-.9391-1.7159-1.819,0-1.819,0a7.6392,7.6392,0,0,1-1.5831,1.1563,6.3883,6.3883,0,0,1-2.1216.9521Z"></path><path class="a" d="M38.728,35.4467c1.771-7.77,1.6247-8.9794-2.136-16.2773l-.2791,1.4617L35.22,19.223c.5267-.9742.2678-1.43-.7351-1.6348-.4952.04-.6258.3169-.9654.6274a2.5873,2.5873,0,0,0-1.4937-.9245,34.5552,34.5552,0,0,0,3.0333,3.85,5.2761,5.2761,0,0,0-1.9139-.3812,9.2906,9.2906,0,0,0-2.1488.3013L28.67,18.5875c-.1931-.63-.0652-.9292.2861-1.6732l-1.2758.7644c-1.2879-.6707-2.4836-1.4853-3.2037-1.0695-.8872.457-2.1565,1.2424-2.1565,1.2424,1.31,1.0728,3.1021,1.0354,4.5281,1.0277l2.5211,2.5828h-.5739c-1.488-.0066-3.2151-.1364-4.7728-.1729a5.2346,5.2346,0,0,1-2.4464-1.25,5.2016,5.2016,0,0,1-.66-1.833,4.92,4.92,0,0,1-1.5088-.1889c.62-1.2239,1.3162-1.4386,2.582-1.9322l-.6611-.628c1.7042-1.5428,2.9762-1.6981,5.2573-2.2516l3.4763,2.207a3.1445,3.1445,0,0,0,.6156-1.66,30.7114,30.7114,0,0,1,4.1282,2.5737c-.7568-3.3986-2.2881-4.3917-5.4406-5.2365A2.3253,2.3253,0,0,1,29.47,12.9s-1.6411-2.1887-2.3258-2.2217c-3.39.0128-6.8086.3507-9.6444,1.8472,1.5148.1185,1.8932,1.0754,2.3524,1.9721-4.354-1.46-4.115,1.816-3.0833,4.1232-2.0559-.5508-2.2371-2.2223-1.5659-4.7267a23.9231,23.9231,0,0,0-5.3784,6.5445h1.98S9.0505,24.4245,8.62,26.5749a22.1058,22.1058,0,0,0-.4442,2.6292l3.16-.977s-.964,5.8061-.2636,7.979a10.3226,10.3226,0,0,0,1.2053,2.817,26.459,26.459,0,0,0,3.1751-3.2967C16.257,34.5306,17.2,33.401,17.2,33.401a22.88,22.88,0,0,1,.6791,4.8778c-.1164,1.59-.6682,4.8191-.6682,4.8191s5.07,2.3136,8.6794.9969a18.6863,18.6863,0,0,0,4.653-2.1585l.673,2.1537s3.3187-2.3076,4.5266-4.7022a19.098,19.098,0,0,0,1.5724-5.4561Z"></path></g><g id="SVGRepo_iconCarrier"><defs><style>.a{fill:none;stroke:#000000;stroke-linecap:round;stroke-linejoin:round;}</style></defs><path class="a" d="M30.2374,9.5s.0977-3.1487,1.0209-4.49a13.317,13.317,0,0,0-2.3748,2.5913l-.259.0011L28.37,3.5,25.0467,7.334,22.6706,3.5284l-1.554,4.1992L16.94,4.7677c.21,1.3474.4382,2.77.5321,4.0948A12.607,12.607,0,0,0,14.46,6.923a12.0817,12.0817,0,0,1,2.2144,4.2686A18.1192,18.1192,0,0,1,30.2376,9.5Z"></path><path class="a" d="M26.17,25.0128l1.652,3.4366a.8194.8194,0,0,0,.7414.1932A11.2078,11.2078,0,0,0,31.63,27.074c.6526-.548,1.3279-1.0757,1.3279-1.0757l.08-2.2388L31.04,22.5559l-.7052-.0238Z"></path><path class="a" d="M34.278,23.81l1.5912-1.245.5962,1.8944.0541,2.3989-.4658,1.3652-1.7615-2.2106Z"></path><path class="a" d="M28.8441,30.4293l1.2331,2.1463a4.7238,4.7238,0,0,0,1.7772-.69c.5146-.46.7421-.6949.7421-.6949a.7347.7347,0,0,1,.3054.5526c-.0141.3263,0,2.01,0,2.01a5.0618,5.0618,0,0,0,1.7672-1.7615c.3431-.89.6377-1.9549.6377-1.9549s-.4562-1.6725-.9391-1.7159-1.819,0-1.819,0a7.6392,7.6392,0,0,1-1.5831,1.1563,6.3883,6.3883,0,0,1-2.1216.9521Z"></path><path class="a" d="M38.728,35.4467c1.771-7.77,1.6247-8.9794-2.136-16.2773l-.2791,1.4617L35.22,19.223c.5267-.9742.2678-1.43-.7351-1.6348-.4952.04-.6258.3169-.9654.6274a2.5873,2.5873,0,0,0-1.4937-.9245,34.5552,34.5552,0,0,0,3.0333,3.85,5.2761,5.2761,0,0,0-1.9139-.3812,9.2906,9.2906,0,0,0-2.1488.3013L28.67,18.5875c-.1931-.63-.0652-.9292.2861-1.6732l-1.2758.7644c-1.2879-.6707-2.4836-1.4853-3.2037-1.0695-.8872.457-2.1565,1.2424-2.1565,1.2424,1.31,1.0728,3.1021,1.0354,4.5281,1.0277l2.5211,2.5828h-.5739c-1.488-.0066-3.2151-.1364-4.7728-.1729a5.2346,5.2346,0,0,1-2.4464-1.25,5.2016,5.2016,0,0,1-.66-1.833,4.92,4.92,0,0,1-1.5088-.1889c.62-1.2239,1.3162-1.4386,2.582-1.9322l-.6611-.628c1.7042-1.5428,2.9762-1.6981,5.2573-2.2516l3.4763,2.207a3.1445,3.1445,0,0,0,.6156-1.66,30.7114,30.7114,0,0,1,4.1282,2.5737c-.7568-3.3986-2.2881-4.3917-5.4406-5.2365A2.3253,2.3253,0,0,1,29.47,12.9s-1.6411-2.1887-2.3258-2.2217c-3.39.0128-6.8086.3507-9.6444,1.8472,1.5148.1185,1.8932,1.0754,2.3524,1.9721-4.354-1.46-4.115,1.816-3.0833,4.1232-2.0559-.5508-2.2371-2.2223-1.5659-4.7267a23.9231,23.9231,0,0,0-5.3784,6.5445h1.98S9.0505,24.4245,8.62,26.5749a22.1058,22.1058,0,0,0-.4442,2.6292l3.16-.977s-.964,5.8061-.2636,7.979a10.3226,10.3226,0,0,0,1.2053,2.817,26.459,26.459,0,0,0,3.1751-3.2967C16.257,34.5306,17.2,33.401,17.2,33.401a22.88,22.88,0,0,1,.6791,4.8778c-.1164,1.59-.6682,4.8191-.6682,4.8191s5.07,2.3136,8.6794.9969a18.6863,18.6863,0,0,0,4.653-2.1585l.673,2.1537s3.3187-2.3076,4.5266-4.7022a19.098,19.098,0,0,0,1.5724-5.4561Z"></path></g></svg>
  `

  // PROPS
  activeRoute: number = 0;
  
    navigate(path: string, i:number): void {
      this.router.navigate([path]);
      this.activeRoute = i
      this.closeSideBar()
    }

  ngOnInit(): void {
    this.router.events.pipe().subscribe((event) => {
      if (event instanceof NavigationStart) {
        const index =event.url == '/' ? 0 : navLinks.findIndex(link =>link.name.toLocaleLowerCase() === event.url.split('/')[1].toLocaleLowerCase());
        this.activeRoute = index
      }
    });
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
