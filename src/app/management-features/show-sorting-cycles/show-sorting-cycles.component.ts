import { Component, OnInit, Input } from '@angular/core';
import { iSoringCycle_management, iNavPattern_page } from 'src/app/interface/management-page';

@Component({
  selector: 'app-show-sorting-cycles',
  templateUrl: './show-sorting-cycles.component.html',
  styleUrls: ['./show-sorting-cycles.component.scss']
})
export class ShowSortingCyclesComponent implements OnInit {

  // @Input() sortingCycleByStatus: Array<any[]> = [];
  @Input() sortionCycles: iNavPattern_page | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  blobToggle(index: number) {
    if (this.sortionCycles)
      this.sortionCycles.cycles[index].isExpand = !this.sortionCycles.cycles[index].isExpand;
  }
}
