import { Injectable } from '@angular/core';
import { RequestsService } from 'src/app/api-connection/requests/requests.service';
import { iCours_short, iCours_ClearNum, iCours_forCycles } from 'src/app/interface/courses';
import { iSortCycle } from 'src/app/interface/sorting-cycle';

@Injectable({
  providedIn: 'root'
})
export class TransformResService {

  allCycles: any[]; //status 0-archives, 1-on web, 2-opened selection form, 3-unshowed on web

  constructor(private apiConnection: RequestsService) {
    this.allCycles = this.apiConnection.GetRequest('Sort');
  }


  getCyclesListOfCourseName(cycle: string) {
    const allCourses = this.apiConnection.GetRequest('Sort/' + cycle).courses;
    let listCourseName: string[] = [];

    for (let i = 0; i < allCourses.length; i++) {
      listCourseName.push(allCourses[i].courseName);
    }
    return listCourseName;
  }

  getListOfCycleName() {
    // const allCycles = this.apiConnection.GetRequest('https://index-bislat-back.azurewebsites.net/Sort');
    let listCycleName: string[] = [];

    for (let i = 0; i < this.allCycles.length; i++) {
      listCycleName.push(this.allCycles[i].name);
    }
    // console.log(listCycleName);
    return listCycleName;
  }

  ListOfShowOnWebCycles() {
    let showOnWebCycles = [];

    showOnWebCycles = this.allCycles.filter(item => item.status === 0 || item.status === 1);
    return showOnWebCycles;
  }

  listOfNmAndName(cycle: string) {
    const courses = this.apiConnection.GetRequest('Sort/' + cycle).courses;
    let listCourseName: Array<{ name: string, num: string }> = [];

    for (let i = 0; i < courses.length; i++) {
      listCourseName.push({ name: courses[i].courseName, num: courses.courseNumber });
    }
    return listCourseName;
  }
  //


  listSortedByStatus() {
    //status: 0-showed up on web, 1-selection form opened, 2-unshown on web, 3-archives
    let cycleByStatus: any[] = [[], [], [], []]; //index-status

    for (let i = 0; i < this.allCycles.length; i++) {

      let cycle = this.allCycles[i];
      cycleByStatus[cycle.status].push({
        name: cycle.name,
        status: cycle.status,
        isExpand: false
      });
    }
    return cycleByStatus;
  }

  // מחזיר רשימת מגזרים שיש למחזור מסויים
  cyclesGenderList(cycleName: string): string[] {

    let list: string[] = [];
    if (cycleName != ' ') {
      const courses: any[] = this.apiConnection.GetRequest('Sort/' + cycleName).courses;

      for (let i = 0; i < courses.length && list.length < 2; i++) {
        switch (courses[i].gender) {
          case 'Avionics': if (!list.includes('אוויוניקה')) { list.push('אוויוניקה'); } break;
          case 'Maintenace': if (!list.includes('אחזקה מתכת/חשמל')) { list.push('אחזקה מתכת/חשמל'); } break;
        }
      }
    }
    return list;
  }

  // מחזיר רשימה של קורסים של מחזור מיון במגזר שנבחר
  gendersCoursesList(cycleName: string, selectedGender: string): string[] {
    const courses: any[] = this.apiConnection.GetRequest('Sort/' + cycleName).courses;
    let genderCourses: any[] = courses.filter(course => course.gender === selectedGender);
    let list: string[] = [];

    for (let i = 0; i < genderCourses.length; i++) {
      list.push(genderCourses[i].courseName)
    }
    return list;
  }

  cyclesCourseNumberList(courses: any) {
    let listCourseNumber: string[] = [];

    for (let i = 0; i < courses.length; i++) {
      listCourseNumber.push(courses[i].courseNumber);
    }
    return listCourseNumber;
  }

  // מחזיר רשימת מחזורי מיון שנפתחה אפשרות למלא שאלון העדפות
  // cyclesName_status1() {
  //   let list: string[] = [];

  //   for (let i = 0; i < this.allCycles.length; i++) {
  //     if (this.allCycles[i].status === 1) {
  //       list.push(this.allCycles[i].name);
  //     }
  //   }
  //   return list;
  // }

  // מחזיר אם קיים מחזור מיון שנפתח עבורו שאלון העדפות
  ShowCourseSlection(): boolean {
    let openedCourseSelection = false;

    for (let i = 0; i < this.allCycles.length; i++) {
      if (this.allCycles[i].status === 1) {
        openedCourseSelection = true;
      }
    }
    return openedCourseSelection;
  }

  //




  //אושר
  listOfGender(cycleName: string) {

    const courses: iCours_short[] = this.apiConnection.GetRequest('Sort/' + cycleName).courses;
    let gendersList: iCours_forCycles[][] = [[], []]; // index: 0- Avionics, 1- Maintenace

    for (let i = 0; i < courses.length; i++) {

      let arrayIndex;

      if (courses[i].gender === 'Avionics') { arrayIndex = 0; }
      else { arrayIndex = 1; }

      gendersList[arrayIndex].push({
        courseName: courses[i].courseName,
        courseUnclearNumber: courses[i].courseNumber,
        courseNumber: this.getClearNum(courses[i].courseNumber)
      });
    }
    return gendersList;
  }

  getClearNum(number: string) {
    let index = number.indexOf('_');

    if (index != -1) {
      number = number.slice(0, index);
    }
    return number;
  }









  //אושר
  clearNumber(courseNumber: string): string {

    if (isNaN(Number(courseNumber))) {
      let index = courseNumber.indexOf("_");
      return courseNumber.slice(0, index);
    }
    return courseNumber;
  }

  FavoritePosition(courseName: string): string { //אפשר לשפר

    const favorites: any[] = JSON.parse(localStorage.getItem('favoriteList') || '[]');
    for (let i = 0; i < favorites.length; i++) {
      if (favorites[i].courseName === courseName) { return 'favorite.svg'; }
    }

    return 'notFavorite.svg';
  }


  cyclesName_status1() {
    let list: string[] = [];

    for (let i = 0; i < this.allCycles.length; i++) {
      if (this.allCycles[i].status === 1) {
        list.push(this.allCycles[i].name);
      }
    }
    return list;
  }
}
