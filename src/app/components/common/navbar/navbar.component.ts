import { Component, ElementRef, ViewChild } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { VariantEnum } from '../../ui/button/button.variants';
import { UiService } from 'src/app/services/ui.service';
import { cn } from 'src/lib/utils';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @ViewChild('btnEl', { static: true }) openButtonRef!: ElementRef;

  getOpenButtonRef(): ElementRef {
    return this.openButtonRef;
  }
  faSearch= faSearch;
  cn=cn
  subscribeButtonVariant = VariantEnum.default
  constructor(private uiService:UiService){}
  openSidebar(event: Event) {
    this.uiService.openSidebar();
    event.stopPropagation(); 
  }
}
