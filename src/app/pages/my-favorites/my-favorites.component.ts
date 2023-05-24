import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-my-favorites',
  templateUrl: './my-favorites.component.html',
  styleUrls: ['./my-favorites.component.scss']
})
export class MyFavoritesComponent implements OnInit {

  favoriteCourses: any[] = [];
  routingClicked: boolean = true;

  @Output() selectedPage = new EventEmitter<string>();
  @Output() selectedCourse = new EventEmitter<string>();


  constructor() {
    this.favoriteCourses = JSON.parse(localStorage.getItem('my-favorites') || '[]');
  }

  ngOnInit(): void {
  }

  pageNavigate(page: string) {
    this.selectedPage.emit(page);
  }

  removeCourse(course: any) {

    let index = this.favoriteCourses.indexOf(course);
    this.favoriteCourses.splice(index, 1);
    localStorage.setItem('my-favorites', JSON.stringify(this.favoriteCourses));
    this.routingClicked = false;
  }

  courseClicked(courseUnclearNmber: string) {
    // if (this.routingClicked) {
    this.selectedCourse.emit(courseUnclearNmber);
    this.pageNavigate('output-page');
    // }
    // else {
    // this.routingClicked = true;
    // }
  }

}
