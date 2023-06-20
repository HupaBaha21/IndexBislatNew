import { Component, OnInit } from '@angular/core';
import { TransformResService } from 'src/app/services/transform-res/transform-res.service';
import { iNavPattern_page } from 'src/app/interface/management-page';
import { expandOptions_sorts, expandOptions_archives } from 'src/app/template/management';
import { RequestsService } from 'src/app/api-connection/requests/requests.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {

  navTitle = { text: 'מחזורי מיון', url: 'sorts' };
  message: string = '';
  cycle: any;
  cycleName: string = '';
  selectedCycle = { name: '', status: '' };

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

  creatNewCycle_confirm(event: any) {
    this.navTitle = event;

    if (event.url.includes('edit-cycle')) {
      this.message = 'האם אתה בטוח שברצונך לערוך מחזור מיון זה?';
    } else if (event.url.includes('confirm-create-new-cycle')) {
      this.message = 'האם אתה בטוח שברצונך ליצור מחזור מיון זה?';
    }
  }

  NewCycle_update(nav: string) {

    this.navTitle.url = 'loading-' + nav;

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
          this.navTitle.url = 'error-' + nav;
          this.message = err.message;
        },
      );
    }

    else if (this.navTitle.url.includes('edit-cycle')) {
      this.apiConnection.PutRequest('Sort/UpdateSort', this.cycle).subscribe(
        res => {
          this.navTitle = { url: 'sorts', text: 'מחזורי מיון' };
        },
        err => {
          this.navTitle.url = 'error-' + nav;
          this.message = err.message;
        },
      );
    }
  }

  editCycle(cycle: any) {
    this.selectedCycle = { name: cycle.name, status: cycle.status };
    this.navTitle = { text: 'עריכת מחזור מיון', url: 'edit-cycle' };
  }

}
