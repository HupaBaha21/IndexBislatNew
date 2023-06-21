import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { createNewCycle } from 'src/app/template/management';
import { Observable } from 'rxjs';
import { SearchCoursesService } from 'src/app/services/search-courses/search-courses.service';
import { iCours_ClearNum } from 'src/app/interface/courses';
import { iGender, iCreateNew } from 'src/app/interface/management-page';
import { TransformResService } from 'src/app/services/transform-res/transform-res.service';


@Component({
  selector: 'app-create-new-cycle',
  templateUrl: './create-new-cycle.component.html',
  styleUrls: ['./create-new-cycle.component.scss']
})
export class CreateNewCycleComponent implements OnInit {

  pattern: iCreateNew[] = JSON.parse(JSON.stringify(createNewCycle));
  genderArr: iGender[] = [];
  buttonClicked: boolean = false;

  @Input() selectedCycle = { name: '', status: '' };
  @Output() selectedPage = new EventEmitter();
  @Output() cycle = new EventEmitter;
  @Output() option = new EventEmitter;

  showList: boolean = false;
  inputControl: FormControl = new FormControl();
  indexOutput$: Observable<any[]>;

  newCycle = new FormGroup({
    name: new FormControl('', Validators.required),
    showSortOnWeb: new FormControl(false),
    openSelectionForm: new FormControl(false)
  });

  constructor(searchService: SearchCoursesService, private helpFunc: TransformResService) {
    this.indexOutput$ = this.inputControl.valueChanges.pipe(
      searchService.getListCourses()
    );
  }

  ngOnInit(): void {
    this.newCycle.controls['name'].setValue(this.selectedCycle.name);
    this.genderArr = this.helpFunc.arrayCoursesByGender(this.selectedCycle.name);
    this.updateCheckbox();
  }

  // ----------------------------------------------- add and delete course -----------------------------------------------
  addCourse(event: iCours_ClearNum) {
    //genderArr index: 0-Avionics, 1-Maintenace
    this.inputControl.setValue('');
    let genderIndex = 0;
    let exist: boolean = false;

    switch (event.gender) {
      case 'Avionics': genderIndex = 0; break;
      case 'Maintenace': genderIndex = 1; break;
    }

    for (let i = 0; i < this.genderArr[genderIndex].courses.length && !exist; i++) {
      if (this.genderArr[genderIndex].courses[i].courseName === event.courseName) { exist = true; }
    }
    if (!exist) {
      this.genderArr[genderIndex].courses.push(event);
    }
  }

  deleteCourseFromCycle(course: any, genderIndex: number) {

    const index = this.genderArr[genderIndex].courses.indexOf(course)
    this.genderArr[genderIndex].courses.splice(index, 1);
  }

  // ----------------------------------------------- functions -----------------------------------------------
  checkBoxClicked(value: boolean, index: number) {

    if (this.pattern[index + 1] && this.pattern[index + 1].HTMLelement === 'checkbox') {

      switch (value) {
        case true: this.pattern[index + 1].show = true; break;
        case false: this.pattern[index + 1].show = false; break;
      }
    }
  }

  getCycleStatus(): number {
    //status: 0-showed up on web, 1-selection form opened, 2-unshown on web, 3-archives
    let selectionFormStatus = this.newCycle.controls['openSelectionForm'].value;
    let showCycleOnWebStatus = this.newCycle.controls['showSortOnWeb'].value;

    if (!selectionFormStatus && showCycleOnWebStatus) { return 0; }
    if (selectionFormStatus && showCycleOnWebStatus) { return 1; }
    return 2;
  }

  updateCheckbox() {
    switch (String(this.selectedCycle.status)) {
      case '0':
        this.pattern[3].show = true;
        this.newCycle.controls['showSortOnWeb'].setValue(true);
        break;
      case '1':
        this.pattern[3].show = true;
        this.newCycle.controls['showSortOnWeb'].setValue(true);
        this.newCycle.controls['openSelectionForm'].setValue(true);
        break;
    }
  }

  // ----------------------------------------------- validation -----------------------------------------------
  coursesValidator(): boolean {
    if (this.genderArr) {
      let avionicsLength = this.genderArr[0].courses.length;
      let maintenaceLength = this.genderArr[1].courses.length;

      return !(avionicsLength < 3 && avionicsLength > 0) && !(maintenaceLength > 0 && maintenaceLength < 3) &&
        (maintenaceLength != 0 || avionicsLength != 0);
    }
    return false;
  }

  // ----------------------------------------------- search input -----------------------------------------------
  onBlur(): void {
    setTimeout(() => {
      this.showList = false;
    }, 80);
  }

  listOnFocus(): void {
    this.showList = true;
  }

  // ----------------------------------------------- create -----------------------------------------------
  createCycleInterface() {
    if (this.newCycle.valid && this.coursesValidator() && this.genderArr) {

      if (this.selectedCycle.name != '') {
        this.option.emit({ option: 'אישור עריכת המחזור', message: 'האם אתה בטוח שברצונך לערוך מחזור מיון זה?' });
        this.selectedPage.emit({ url: 'confirm-edit-cycle', text: 'עריכת מחזור מיון' });
      }
      else {
        this.option.emit({ option: 'יצירת המחזור', message: 'האם אתה בטוח שברצונך ליצור מחזור מיון זה?' });
        this.selectedPage.emit({ url: 'confirm-create-new-cycle', text: 'יצירת מחזור מיון חדש' });
      }

      this.cycle.emit({
        name: this.newCycle.controls['name'].value || '',
        status: this.getCycleStatus(),
        courses: [...this.genderArr[0].courses.map(num => num.courseUnclearNumber), ...this.genderArr[1].courses.map(num => num.courseUnclearNumber)]
      });
    }
  }
}


