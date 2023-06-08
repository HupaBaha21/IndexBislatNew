import { Component, OnInit, Input } from '@angular/core';
import { iSoringCycle_management } from 'src/app/interface/management-page';

@Component({
  selector: 'app-show-sorting-cycles',
  templateUrl: './show-sorting-cycles.component.html',
  styleUrls: ['./show-sorting-cycles.component.scss']
})
export class ShowSortingCyclesComponent implements OnInit {

  // @Input() sortingCycleByStatus: Array<any[]> = [];
  @Input() sortionCycles: iSoringCycle_management[] | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
