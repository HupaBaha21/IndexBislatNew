import { Pipe, PipeTransform } from '@angular/core';
import { TransformResService } from '../services/transform-res/transform-res.service';

@Pipe({
  name: 'selectOptions'
})
export class SelectOptionsPipe implements PipeTransform {

  constructor(private apiHelper: TransformResService) { }

  transform(element: string, selectedCycle: string, selectedGender: string): string[] {

    switch (element) {
      case "cycleInput": return [" ", ...this.apiHelper.cyclesName_status1()];
      case "genderInput": if (selectedCycle === '') return [];
        return [... ' ', ...this.apiHelper.cyclesGenderList(selectedCycle)];
      default: if (selectedGender === 'אוויוניקה') { return [" ", ...this.apiHelper.gendersCoursesList(selectedCycle, 'Avionics')]; }
        return [" ", ...this.apiHelper.gendersCoursesList(selectedCycle, 'Maintenace')];
    }
  }

}
