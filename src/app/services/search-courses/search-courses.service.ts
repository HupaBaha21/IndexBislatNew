import { Injectable } from '@angular/core';
import { Observable, of, pipe } from 'rxjs';
import { equalshWords } from 'src/app/template/home-page-template';
import { distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';
import { iCours_short, iCours_ClearNum } from 'src/app/interface/courses';
import { RequestsService } from 'src/app/api-connection/requests/requests.service';

@Injectable({
  providedIn: 'root'
})
export class SearchCoursesService {
  courses: any[];
  unclearedCourses: any[];


  allCycles: any[]; //status 0-archives, 1-on web, 2-opened selection form, 3-unshowed on web

  constructor(private apiConnection: RequestsService,) {
    this.courses = apiConnection.GetRequest('Course');
    this.unclearedCourses = this.apiConnection.GetRequest("Course");


    this.allCycles = this.apiConnection.GetRequest('Sort');

  }

  getClearedSelectedCourses(coursesName: string[]): any {

    let selectedCourses: any = [];

    for (let i = 0; i < coursesName.length; i++) {
      if (coursesName[i][0] === '"') { coursesName[i] = coursesName[i].slice(1, coursesName[i].length - 1); }  //clear ""

      let unclearedCourseNumber = this.unclearedCourses.filter(item => item.courseName === coursesName[i])[0].courseNumber;
      let course = this.apiConnection.GetRequest("Course/" + unclearedCourseNumber);

      if (course.courseNumber.includes("_")) {
        let index = course.courseNumber.indexOf("_");
        course.courseNumber = course.courseNumber.slice(0, index);
      }
      selectedCourses.push(course);
    }

    return selectedCourses;
  }
  //------------------------------------------------------------------------------------

  isItemFavorite(courseName: any): string {

    const favorites: any[] = JSON.parse(localStorage.getItem('favoriteList') || '[]');
    for (let i = 0; i < favorites.length; i++) {
      if (favorites[i].courseName === courseName) { return 'favorite.svg'; }
    }

    return 'notFavorite.svg';
  }
  //------------------------------------------------------------------------------------

  getListCourses = () => pipe(
    debounceTime(300),
    distinctUntilChanged<string>(),
    switchMap((input: string) => {

      input = input.trim();

      if (!isNaN(Number(input)) && input != '') {
        const filteredCourses = this.courses.filter(item => (item.courseNumber.slice(0, input.length) === input));
        return of(this.clearCourseNumber(filteredCourses));
      }
      else if (isNaN(Number(input)) && input != '') {
        let searchWords: string[] = this.getSearchWords(input);
        let filteredCourses: any[] = this.getListOfWord(searchWords[0]);

        for (let i = 1; i < searchWords.length; i++) {

          let partialFilteredCourses: any[] = this.getListOfWord(searchWords[i]);
          partialFilteredCourses = partialFilteredCourses.filter(item => filteredCourses.includes(item));
          filteredCourses = partialFilteredCourses;
        }
        if (filteredCourses != []) { return of(this.clearCourseNumber(filteredCourses)); }
      }
      return of([]);
    })
  )


  getListOfWord(searchWord: string): iCours_short[] {

    let Arr: any[] = this.courses.filter(item => (" " + item.courseName).includes(" " + searchWord));

    for (let i = 0; i < equalshWords.length; i++) {
      if (equalshWords[i].includes(searchWord)) {
        let words: string[] = this.getSearchWords(equalshWords[i]);

        for (let index = 0; index < words.length; index++) {
          let tmpArr: any[] = this.courses.filter(item => ((" " + item.courseName).includes(words[index]) && !Arr.includes(item)));
          Arr = [...Arr, ...tmpArr];
        }
      }
    }
    return Arr;
  }//----------------------------------------------------

  getSearchWords(input: string): string[] {

    let searchWords: string[] = [];

    while (input.indexOf(' ') != -1) {
      let index = input.indexOf(' ');
      searchWords.push(input.slice(0, index));
      input = input.slice(index + 1, input.length);
    }
    searchWords.push(input);
    return searchWords;
  }

  clearCourseNumber(courses: iCours_short[]) {

    let arr: iCours_ClearNum[] = [];

    for (let i = 0; i < courses.length; i++) {

      let tmpCourse = courses[i];
      arr.push({
        courseName: tmpCourse.courseName,
        courseNumber: tmpCourse.courseNumber,
        courseUnclearNumber: tmpCourse.courseNumber,
        gender: tmpCourse.gender
      });

      if (isNaN(Number(courses[i].courseNumber))) {

        let index = courses[i].courseNumber.indexOf("_");
        arr[i].courseNumber = courses[i].courseNumber.slice(0, index);
      }
    }
    // console.log(arr);
    return arr;
  }

  findCourseNumber(courses: any[]) {
    let unclearedCourses: any[] = this.apiConnection.GetRequest("Course");
    let coursesNumber: string[] = [];

    for (let i = 0; i < courses.length; i++) {
      coursesNumber.push(unclearedCourses.filter(item => item.courseName === courses[i].courseName)[0].courseNumber);
      // coursesNumber.push(courses[i].courseNum);
    }
    return coursesNumber;
  }
  // //




  // ListOfShowOnWebCycles() {
  //   let showOnWebCycles = [];

  //   showOnWebCycles = this.allCycles.filter(item => item.status === 0 || item.status === 1);
  //   return showOnWebCycles;
  // }


  // ShowCourseSlection(): boolean {
  //   let openedCourseSelection = false;

  //   for (let i = 0; i < this.allCycles.length; i++) {
  //     if (this.allCycles[i].status === 1) {
  //       openedCourseSelection = true;
  //     }
  //   }
  //   return openedCourseSelection;
  // }
}
