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

  @Output() selectedItemEmitter = new EventEmitter<iCours_short>();
  @Output() selectedPage = new EventEmitter<string>();

  // @Output() selecedCourse = new EventEmitter<iCours_short>();
  @Output() selectedCourse = new EventEmitter<string>();


  constructor() { }

  ngOnInit(): void {
  }

  listClicked(item: any) {
    if (this.page === 'homePage') {
      this.selectedPage.emit('course-page');
    }
    else if (this.page === 'managementPage') {
      this.selectedItemEmitter.emit(item);
    }
  }

  // itemClicked(item: any) {
  //   if (this.page === 'homePage') {
  //     sessionStorage.setItem("selectedItem", item.courseName);
  //     window.location.href = '/course/' + item.courseNumber;
  //   }
  //   else if (this.page === 'managementPage') {
  //     this.selectedItemEmitter.emit(item);
  //   }
  // }

}
