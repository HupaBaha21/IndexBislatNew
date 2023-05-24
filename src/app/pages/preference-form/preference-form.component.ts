import { Component, Directive, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors, AbstractControl, FormArray, RequiredValidator } from '@angular/forms';
import { ipreference_page, iSelectionForm, option } from 'src/app/template/preference-form';
import { TransformResService } from 'src/app/services/transform-res/transform-res.service';
import { RequestsService } from 'src/app/api-connection/requests/requests.service';

@Component({
  selector: 'app-preference-form',
  templateUrl: './preference-form.component.html',
  styleUrls: ['./preference-form.component.scss']
})
export class PreferenceFormComponent implements OnInit {

  @Output() selectedPage = new EventEmitter();
  formPage: number = 1;
  preferencePattern = ipreference_page;
  buttonClicked: boolean = false;
  ExpansionValidatorLocation: Array<number[]> = [[], [], []]; //index:  index - optionIndex, value - expansionIndex

  offeredCycles: string[] = [];
  APILoading: boolean = false;
  APISuccess: boolean = false;

  selectionPage1Form = new FormGroup({
    cycleInput: new FormControl('', Validators.required),
    nameInput: new FormControl('', Validators.required),
    idInput: new FormControl('', this.idValidator()),
    sortNumberInput: new FormControl('', this.sortValidator()),
    genderInput: new FormControl('', Validators.required)
  });

  selectionPage2Form = new FormGroup({
    firstOption: new FormControl('', Validators.required),
    firstCauses: new FormArray([
      new FormControl(''),
      new FormControl(''),
      new FormControl(''),
      new FormControl('')], this.formArrValidator(4)),
    secondOption: new FormControl('', Validators.required),
    secondCauses: new FormArray([
      new FormControl(''),
      new FormControl(''),
      new FormControl(''),
      new FormControl('')], this.formArrValidator(4)),
    thirdOption: new FormControl('', Validators.required),
    thirdCauses: new FormArray([
      new FormControl(''),
      new FormControl(''),
      new FormControl(''),
      new FormControl('')], this.formArrValidator(4))
  });

  constructor(private apiConnection: RequestsService, private apiHelper: TransformResService) {
    this.preferencePattern[0].formGroup = this.selectionPage1Form;
    this.preferencePattern[1].formGroup = this.selectionPage2Form;
    this.selectionPage2Form.controls['firstOption'].addValidators(this.selectOptionsValidator(1));
    this.selectionPage2Form.controls['secondOption'].addValidators(this.selectOptionsValidator(2));
    this.selectionPage2Form.controls['thirdOption'].addValidators(this.selectOptionsValidator(3));
    this.offeredCycles = apiHelper.cyclesName_status1();
  }

  ngOnInit(): void {
  }

  addAndRemoveInput(isExpansion: boolean, isChecked: boolean, formName: string, option: number, causeNum: number) {
    if (isExpansion) {
      const formGroupExpansion = (this.selectionPage2Form.get(formName) as FormArray);

      //add
      if (isChecked) {
        formGroupExpansion.push(new FormControl());
        this.ExpansionValidatorLocation[causeNum][option] = (formGroupExpansion.length - 1);
      }
      //remove
      else if (!isChecked) {
        let index = this.ExpansionValidatorLocation[causeNum][option];
        formGroupExpansion.removeAt(this.ExpansionValidatorLocation[causeNum][option]);
        for (let i = 0; i < this.ExpansionValidatorLocation[causeNum].length; i++) {
          if (this.ExpansionValidatorLocation[causeNum][i] > index)
            this.ExpansionValidatorLocation[causeNum][i] = (this.ExpansionValidatorLocation[causeNum][i] - 1);
        }
        this.ExpansionValidatorLocation[causeNum][option] = NaN;
      }
    }
  }

  // isLogedIn(): boolean { return (this.msalService.isLogedIn()); }

  submitForm(index: number): void {
    if (index === 0) { this.moveNextPage(); }
    if (index === 1) { this.sendForm(); }
  }

  // -----------------------------------------------------------
  moveNextPage(): void {
    this.buttonClicked = true;

    if (this.preferencePattern[0].formGroup?.valid) {
      // this.allCourses = this.apiHelper.getCyclesListOfCourseName(this.selectionPage1Form.controls["cycleInput"].value + "");
      // this.allGenders = this.apiHelper.cyclesGenderList(this.selectionPage1Form.controls['cycleInput'].value + "");
      this.formPage = 2;
      this.buttonClicked = false;
    }
  }

  sendForm(): void {
    this.buttonClicked = true;

    if (this.selectionPage2Form.valid) {
      this.APILoading = true;
      this.formPage = 3;
      this.apiConnection.postRequest("https://index-bislat-back.azurewebsites.net/Choise/Addchoise", this.createSelectionInterface()).subscribe(
        res => {
          this.APILoading = false;
          this.APISuccess = true;
        },
        err => {
          console.log(err);
          this.APISuccess = false;
          this.APILoading = false;
        },
      );
    }
  }
  // -----------------------------------------------------------

  createSelectionInterface() {
    let tmpPage1 = this.selectionPage1Form.controls;
    let tmpPage2 = this.selectionPage2Form.controls;
    let tmpOption: Array<Array<option>> = [];

    if (this.preferencePattern[1].items[1].selectionsOptions && this.preferencePattern[1].items[3].selectionsOptions && this.preferencePattern[1].items[5].selectionsOptions) {
      tmpOption[0] = this.preferencePattern[1].items[1].selectionsOptions;
      tmpOption[1] = this.preferencePattern[1].items[3].selectionsOptions;
      tmpOption[2] = this.preferencePattern[1].items[5].selectionsOptions;
    }

    let formSelection: iSelectionForm = {
      title: tmpPage1['cycleInput'].value + "",
      gender: tmpPage1['genderInput'].value + "",
      fullName: tmpPage1['nameInput'].value + "",
      id: tmpPage1['idInput'].value + "",
      sortFrame: Number(tmpPage1['sortNumberInput'].value),
      first: tmpPage2['firstOption'].value + "",
      resonef: this.convertArrayResonesToString(tmpPage2['firstCauses'].value, tmpOption[0], 0) + "",
      second: tmpPage2['secondOption'].value + "",
      resones: this.convertArrayResonesToString(tmpPage2['secondCauses'].value, tmpOption[1], 1) + "",
      third: tmpPage2['thirdOption'].value + "",
      resonet: this.convertArrayResonesToString(tmpPage2['thirdCauses'].value, tmpOption[2], 2) + ""
    }
    return formSelection;
  }

  convertArrayResonesToString(formValues: any[], optionsInfo: option[], causeNum: number): string {
    let s: string = '';

    while (formValues.indexOf(true) != -1) {
      let selecedOptionIndex = formValues.indexOf(true);
      s += optionsInfo[selecedOptionIndex].text;

      if (optionsInfo[selecedOptionIndex].expansion) {
        s += ": " + formValues[this.ExpansionValidatorLocation[causeNum][selecedOptionIndex]];
      }
      formValues[selecedOptionIndex] = 'false';
      if (formValues.includes(true)) { s += ", "; }
    }
    return s;
  }

  //---------------------------------- validators ----------------------------------
  isValid(controlName: string): boolean | undefined {
    if (this.formPage === 1) {
      return !this.buttonClicked || this.selectionPage1Form.get(controlName)?.valid;
    }
    else {
      return !this.buttonClicked || this.selectionPage2Form.get(controlName)?.valid;
    }
  }

  idValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if ((control.value.length != 8 && control.value.length != 9) || isNaN(control.value)) {
        return { forbiddenName: { value: control.value } };
      }
      return null;
    }
  }

  selectOptionsValidator(select: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      switch (select) {
        case 1:
          if (control.value === this.selectionPage2Form.controls['secondOption'].value || control.value === this.selectionPage2Form.controls['thirdOption'].value || control.value === '') {
            return { forbiddenName: { value: control.value } }
          }
          break;
        case 2:
          if (control.value === this.selectionPage2Form.controls['firstOption'].value || control.value === this.selectionPage2Form.controls['thirdOption'].value || control.value === '') {
            return { forbiddenName: { value: control.value } }
          }
          break
        case 3:
          if (control.value === this.selectionPage2Form.controls['firstOption'].value || control.value === this.selectionPage2Form.controls['secondOption'].value || control.value === '') {
            return { forbiddenName: { value: control.value } }
          }
          break;
      }
      return null;
    }
  }

  formArrValidator(selectionsLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value.includes(true) || control.value.includes("", selectionsLength) || control.value.includes(null, selectionsLength)) {
        return { forbiddenName: { value: control.value } };
      }
      return null;
    }
  }

  sortValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (isNaN(control.value) || control.value === "") {
        return { forbiddenName: { value: control.value } };
      }
      return null;
    }
  }
}
