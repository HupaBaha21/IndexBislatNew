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

  constructor(private apiFunc: TransformResService) { }

  ngOnInit(): void {
    this.updateSortingCycle();
  }

  pageNavigate(courseNumber: string) {
    this.selectedCourse.emit(courseNumber);
    this.selectedPage.emit('output-page');
  }

  updateSortingCycle() {
    const genderArray: iCours_forCycles[][] = this.apiFunc.listOfGender(this.selectedSortingCycle + ""); // index: 0- Avionics, 1- Maintenace

    this.sortingCycle.name = this.selectedSortingCycle + "";
    this.sortingCycle.genders.push({ title: 'אוויוניקה', courses: genderArray[0] });
    this.sortingCycle.genders.push({ title: 'אחזקה/חשמל', courses: genderArray[1] });
  }

}
