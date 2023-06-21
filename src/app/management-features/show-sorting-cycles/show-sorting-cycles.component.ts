import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { iNavPattern_page } from 'src/app/interface/management-page';
import { ManagementPageService } from 'src/app/services/management-page/management-page.service';

@Component({
  selector: 'app-show-sorting-cycles',
  templateUrl: './show-sorting-cycles.component.html',
  styleUrls: ['./show-sorting-cycles.component.scss']
})
export class ShowSortingCyclesComponent implements OnInit {

  @Input() page: any;
  @Input() sortionCycles: iNavPattern_page | undefined;
  @Output() selectedPage = new EventEmitter<{ text: string, url: string }>();
  @Output() selectedCycle = new EventEmitter();
  @Output() cycle = new EventEmitter();
  @Output() message = new EventEmitter();
  @Output() option = new EventEmitter();
  @Output() addArchive = new EventEmitter();

  constructor(private service: ManagementPageService) { }

  ngOnInit(): void {
  }

  blobToggle(index: number) {
    if (this.sortionCycles)
      this.sortionCycles.cycles[index].isExpand = !this.sortionCycles.cycles[index].isExpand;
  }

  optionClicked(optionIndex: number, cycleIndex: number) {
    let option = this.sortionCycles?.expandOptions[optionIndex];

    if (option?.message) {
      this.option.emit(option);
      this.cycle.emit(this.sortionCycles?.cycles[cycleIndex]);
      this.selectedPage.emit({ text: this.page.text, url: 'confirm-' + this.page.url });
    }
    else if (option?.option === 'הורדת דו\"ח העדפות') {
      this.service.fileDownload(this.sortionCycles?.cycles[cycleIndex].name + '');
    }
  }
}
