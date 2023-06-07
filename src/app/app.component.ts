import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'index-bislat';

  selectedPage: string = '';
  selectedCourse: string = '';
  selectedCycle: string = '';

  blockPage: boolean = true;

  constructor() {

    if (window.location.href === 'http://localhost:4200/') {
      this.selectedPage = "home-page";
    }
    else if (window.location.href === 'http://localhost:4200/management') {
      // this.selectedPage = "block-management";
      this.selectedPage = "block-management";
    }
  }
}
