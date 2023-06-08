import { Component, OnInit } from '@angular/core';
import { TransformResService } from 'src/app/services/transform-res/transform-res.service';
import { iSoringCycle_management, iNavPattern_page } from 'src/app/interface/management-page';
import { expandOptions_sorts, expandOptions_archives } from 'src/app/template/management';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {

  navTitle: string = 'sorts';

  soringCycles_showed: iNavPattern_page = { expandOptions: [], cycles: [] };
  soringCycles_archives: iNavPattern_page = { expandOptions: [], cycles: [] }

  constructor(private apiFunc: TransformResService) {
    this.updateSortingCycles();
  }

  ngOnInit(): void {
  }

  updateSortingCycles() {
    let allByStaus = this.apiFunc.listSortedByStatus();
    //status: 0-showed up on web, 1-selection form opened, 2-unshown on web, 3-archives

    this.soringCycles_showed.expandOptions = expandOptions_sorts;
    this.soringCycles_showed.cycles = [...allByStaus[0], ...allByStaus[1], ...allByStaus[2]];

    this.soringCycles_archives.expandOptions = expandOptions_archives;
    this.soringCycles_archives.cycles = allByStaus[3];
  }
}
