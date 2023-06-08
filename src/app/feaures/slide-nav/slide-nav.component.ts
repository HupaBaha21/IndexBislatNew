import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { navOptions } from 'src/app/template/management';


@Component({
  selector: 'app-slide-nav',
  templateUrl: './slide-nav.component.html',
  styleUrls: ['./slide-nav.component.scss']
})
export class SlideNavComponent implements OnInit {

  NavTitles: any[];
  navPosition: string;
  @Output() selectedNav = new EventEmitter();

  constructor() {
    this.NavTitles = navOptions;
    this.navPosition = '';
  }

  ngOnInit(): void {
  }

  barToggle() {
    if (this.navPosition === 'show') {
      this.navPosition = 'hide';
    } else {
      this.navPosition = 'show';
    }
  }

  itemClicked(page: any) {
    this.navPosition = 'hide';
    this.selectedNav.emit(page);
  }

  logOut() {
    // this.msal_service.logOut();
    // window.location.href = '/homePage'
  }

}
