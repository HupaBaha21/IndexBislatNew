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

  constructor() {
    this.selectedPage = "home-page";
  }
}
