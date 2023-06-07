import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
// import { ApiHelpersService } from 'src/app/services/api-helpers/api-helpers.service';
import { TransformResService } from 'src/app/services/transform-res/transform-res.service';
import { iSortingCycle_page } from 'src/app/interface/sorting-cycle';
import { iCours_forCycles } from 'src/app/interface/courses';


@Component({
  selector: 'app-sorting-cycle',
  templateUrl: './sorting-cycle.component.html',
  styleUrls: ['./sorting-cycle.component.scss']
})
export class SortingCycleComponent implements OnInit {

  @Input() selectedSortingCycle: string | undefined;
  @Output() selectedPage = new EventEmitter<string>();
  @Output() selectedCourse = new EventEmitter<string>();

  sortingCycle: iSortingCycle_page = { name: '', genders: [] };
  genderArray: iCours_forCycles[][] = [];

  constructor(private apiFunc: TransformResService) { }

  ngOnInit(): void {
    this.genderArray = this.apiFunc.listOfGender(this.selectedSortingCycle + ""); // index: 0- Avionics, 1- Maintenace
    this.updateSortingCycle();
  }

  pageNavigate(courseNumber: string) {
    this.selectedCourse.emit(courseNumber);
    this.selectedPage.emit('output-page');
  }

  updateSortingCycle() {
    this.sortingCycle.name = this.selectedSortingCycle + "";
    this.sortingCycle.genders.push({ title: 'אוויוניקה', courses: this.genderArray[0].slice(0, 3), button: 'הצג הכל' });
    this.sortingCycle.genders.push({ title: 'אחזקה/חשמל', courses: this.genderArray[1].slice(0, 3), button: 'הצג הכל' });
  }

  showOrHide(index: number) {

    switch (this.sortingCycle.genders[index].button) {
      case 'הצג פחות':
        this.sortingCycle.genders[index].courses = this.genderArray[index].slice(0, 3);
        this.sortingCycle.genders[index].button = 'הצג הכל'; break;
      case 'הצג הכל':
        this.sortingCycle.genders[index].courses = this.genderArray[index];
        this.sortingCycle.genders[index].button = 'הצג פחות'; break;
    }
  }
}
