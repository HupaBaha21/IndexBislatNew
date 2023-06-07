import { Component, OnInit } from '@angular/core';
import { TransformResService } from 'src/app/services/transform-res/transform-res.service';
import { iSoringCycle_management } from 'src/app/interface/management-page';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {

  //status: 0-showed up on web, 1-selection form opened, 2-unshown on web, 3-archives
  sortingCycleByStatus: Array<any[]> = [];
  navTitle: string = 'sorts';

  soringCycles_showed: iSoringCycle_management[] = [];
  soringCycles_archives: iSoringCycle_management[] = [];

  constructor(private apiFunc: TransformResService) {
    this.sortingCycleByStatus = apiFunc.listSortedByStatus();
    this.soringCycles_showed = [...this.sortingCycleByStatus[0], ...this.sortingCycleByStatus[1], ...this.sortingCycleByStatus[2]];
    this.soringCycles_archives = this.sortingCycleByStatus[3];
  }

  ngOnInit(): void {
  }

}
