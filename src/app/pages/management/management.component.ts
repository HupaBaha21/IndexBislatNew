import { Component, OnInit } from '@angular/core';
import { TransformResService } from 'src/app/services/transform-res/transform-res.service';
import { iNavPattern_page } from 'src/app/interface/management-page';
import { expandOptions_sorts, expandOptions_archives } from 'src/app/template/management';
import { RequestsService } from 'src/app/api-connection/requests/requests.service';
import { iExpandOptions } from 'src/app/interface/management-page';
// import { ManagementPageService } from 'src/app/services/management-page/management-page.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {

  navTitle = { text: 'מחזורי מיון', url: 'sorts' };
  cycle: any;
  option: iExpandOptions | undefined;
  errorMessage: string = '';

  soringCycles_showed: iNavPattern_page = { expandOptions: [], cycles: [] };
  soringCycles_archives: iNavPattern_page = { expandOptions: [], cycles: [] }

  constructor(private apiFunc: TransformResService, private apiConnection: RequestsService) {
    this.updateSortingCycles();
  }

  ngOnInit(): void {
  }

  updateSortingCycles() {
    //status: 0-showed up on web, 1-selection form opened, 2-unshown on web, 3-archives
    let allByStaus = this.apiFunc.listSortedByStatus();

    this.soringCycles_showed.expandOptions = expandOptions_sorts;
    this.soringCycles_showed.cycles = [...allByStaus[0], ...allByStaus[1], ...allByStaus[2]];

    this.soringCycles_archives.expandOptions = expandOptions_archives;
    this.soringCycles_archives.cycles = allByStaus[3];
  }

  actConfirmed(act: string) {
    switch (act) {
      case 'מחיקה': this.deleteCycle(); break;
      // case 'הורדת דו\"ח העדפות': this.service.fileDownload(this.cycle.name); break;
      case 'עריכת המחזור': this.editCycle(); break;
      case 'אישור עריכת המחזור': this.updateCycle(); break;
      case 'העבר לארכיון': this.updateCycleStatus(3); break;
      case 'הוצא מארכיון': this.updateCycleStatus(2); break;
      case 'יצירת המחזור': this.createNewCycle(); break;
    }
  }

  // --------------------------------------------- options ---------------------------------------------
  editCycle() {
    this.navTitle = { text: 'עריכת מחזור מיון', url: 'edit-cycle' };
  }

  deleteCycle() {
    this.navTitle = { text: this.navTitle.text, url: 'loading-' + this.navTitle.url.replace('confirm-', '') }
    this.apiConnection.DeleteRequest('Sort/' + this.cycle.name).subscribe(
      res => {
        if (this.navTitle.url.includes('sorts')) {
          let index = this.soringCycles_showed.cycles.indexOf(this.cycle);
          this.soringCycles_showed.cycles.splice(index, 1);
        } else {
          let index = this.soringCycles_archives.cycles.indexOf(this.cycle);
          this.soringCycles_archives.cycles.splice(index, 1);
        }
        this.navTitle = { text: this.navTitle.text, url: this.navTitle.url.replace('loading-', '') }
      },
      err => {
        this.errorMessage = err.message;
        this.navTitle.url = 'error-' + this.navTitle.url.replace('loading-', '');
      }
    );
  }

  updateCycleStatus(updatedStatus: number) {

    this.navTitle = { text: this.navTitle.text, url: 'loading-' + this.navTitle.url.replace('confirm-', '') };
    let originalCycle = this.apiConnection.GetRequest('Sort/' + this.cycle.name);
    originalCycle.status = updatedStatus;
    originalCycle.courses = this.listOfCourseNumber(originalCycle.courses);

    this.apiConnection.PutRequest('Sort/UpdateSort', originalCycle).subscribe(
      res => {
        // להעביר לארכיון
        if (this.navTitle.url.includes('sorts')) {
          let index = this.soringCycles_showed.cycles.indexOf(this.cycle);
          this.soringCycles_showed.cycles.splice(index, 1);
          this.soringCycles_archives.cycles.push(this.cycle);
        }
        else {
          let index = this.soringCycles_archives.cycles.indexOf(this.cycle);
          this.soringCycles_archives.cycles.splice(index, 1);
          this.soringCycles_showed.cycles.push(this.cycle);
        }
        this.navTitle = { text: this.navTitle.text, url: this.navTitle.url.replace('loading-', '') };
      },
      err => {
        this.errorMessage = err.message;
        this.navTitle.url = 'error-' + this.navTitle.url.replace('loading-', '');
      }
    );
  }

  createNewCycle() {
    this.navTitle.url = 'loading-' + this.navTitle.url.replace('confirm-', '');

    if (this.navTitle.url.includes('create-new-cycle')) {
      this.apiConnection.postRequest('Sort', this.cycle).subscribe(
        res => {
          this.soringCycles_showed.cycles.push({
            name: this.cycle.name,
            status: this.cycle.status,
            isExpand: false
          });
          this.navTitle = { url: 'sorts', text: 'מחזורי מיון' };
        },
        err => {
          this.errorMessage = err.message;
          this.navTitle.url = 'error-' + this.navTitle.url.replace('loading-', '');
        },
      );
    }
  }

  updateCycle() {
    this.navTitle.url = 'loading-' + this.navTitle.url.replace('confirm-', '');
    this.apiConnection.PutRequest('Sort/UpdateSort', this.cycle).subscribe(
      res => {
        this.navTitle = { url: 'sorts', text: 'מחזורי מיון' };
      },
      err => {
        this.errorMessage = err.message;
        this.navTitle.url = 'error-' + this.navTitle.url.replace('loading-', '');
      },
    );
  }
  // ------------------------------------------------------------------------------------------

  listOfCourseNumber(courses: any) {
    let listCourseNumber: string[] = [];

    for (let i = 0; i < courses.length; i++) {
      listCourseNumber.push(courses[i].courseNumber);
    }
    return listCourseNumber;
  }
}
