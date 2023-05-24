import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { TransformResService } from 'src/app/services/transform-res/transform-res.service';
import { SearchCoursesService } from 'src/app/services/search-courses/search-courses.service';
import { iCours_short } from 'src/app/interface/courses';
import { openingParagraphs, openingVideosUrl } from 'src/app/template/home-page-template';
// import { Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  inputControl: FormControl = new FormControl();
  indexOutput$: Observable<iCours_short[]>;
  resultItem$ = new Subject<iCours_short | undefined>();

  showList: boolean = false;
  showCourseSelection: boolean;
  sortingCycles: any[];

  readMoreButton = [false, 1]; //[f-short t-long, mun of paragraphs]
  openingParagraphs: string[] = openingParagraphs;
  openingVideosUrl = openingVideosUrl;

  @Output() selectedCourse = new EventEmitter<string>();
  @Output() selectedPage = new EventEmitter<string>();
  @Output() selectedCycle = new EventEmitter<string>();
  @Input() page: string = '';



  constructor(searchService: SearchCoursesService, apiFunc: TransformResService) {

    this.indexOutput$ = this.inputControl.valueChanges.pipe(
      searchService.getListCourses()
    );
    this.sortingCycles = apiFunc.ListOfShowOnWebCycles();
    this.showCourseSelection = apiFunc.ShowCourseSlection();
  }

  navigatePage(event: any) {

    if (this.page === 'home-page') {
      this.selectedPage.emit('output-page');
      this.selectedCourse.emit(event);
    }
    // else if (this.page === 'management-page') {
    //   this.selectedPage.emit('');
    // }

    // this.selectedCourse.emit(this.page);
  }

  ngOnInit(): void { }

  handleShowList(show: boolean): void {
    this.showList = show;
  }

  handleSelected(item: iCours_short): void {
    this.resultItem$.next(item);
    this.inputControl.setValue(item.courseNumber);
  }

  handleClear(): void {
    this.inputControl.setValue('');
    this.resultItem$.next(undefined);
  }

  routingPage() {
    window.open(
      'https://youtube.com/channel/UCElJ2Ybi3FBsslbq5ROLQoA',
      '_blank'
    );
  }

  readMoreButtonClick(): void {

    if (this.readMoreButton[0]) { this.readMoreButton = [false, 1]; }
    else { this.readMoreButton = [true, this.openingParagraphs.length]; }
  }

  threeImagesPosition(): boolean {
    if ((window.innerWidth / window.innerHeight) > 1) { return true; }
    else { return false; }
  }

  cyclePageClicked(cycleName: string) {
    sessionStorage.setItem('selectedCycle', cycleName);
  }
}
