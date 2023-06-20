import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { iCours_short } from 'src/app/interface/courses';

@Component({
  selector: 'app-search-list-result',
  templateUrl: './search-list-result.component.html',
  styleUrls: ['./search-list-result.component.scss']
})
export class SearchListResultComponent implements OnInit {

  @Input() indexOutput: any[] | null | undefined;
  @Input() page: string | undefined;
  @Input() showList: boolean | undefined;

  @Output() selectedPage = new EventEmitter<string>();
  @Output() selectedCourse = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }

  listClicked(course: any) {
    if (this.page === 'homePage') {
      this.selectedCourse.emit(course.courseUnclearNumber);
      this.selectedPage.emit('course-page');
    }
    else if (this.page === 'managementPage') {
      this.selectedCourse.emit(course);
    }
  }
}
