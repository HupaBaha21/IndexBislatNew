import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { iSoringCycle_management, iNavPattern_page } from 'src/app/interface/management-page';
import { ExportExcelService } from 'src/app/services/export-excel/export-excel.service';
import { ManagementPageService } from 'src/app/services/management-page/management-page.service';
import { RequestsService } from 'src/app/api-connection/requests/requests.service';

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
  @Output() message = new EventEmitter();

  constructor(private exportExcel: ExportExcelService, private service: ManagementPageService, private apiConnection: RequestsService) { }

  ngOnInit(): void {
  }

  blobToggle(index: number) {
    if (this.sortionCycles)
      this.sortionCycles.cycles[index].isExpand = !this.sortionCycles.cycles[index].isExpand;
  }

  optionClicked(optionIndex: number, cycleIndex: number) {
    let option = this.sortionCycles?.expandOptions[optionIndex];
    // this.selectedPage.emit({ text: this.page.text, url: 'loading-' + this.page.url });
    // this.selectedPage.emit({ text: this.page.text + 'jdjdjdj', url: this.page.url });

    switch (option?.option) {
      case 'מחיקה':
        console.log("מחיקה");
        this.selectedPage.emit({ text: this.page.text, url: 'loading-' + this.page.url });
        this.deleteCycle(cycleIndex);
        break;
      case 'הורדת דו\"ח העדפות':
        this.service.fileDownload(this.sortionCycles?.cycles[cycleIndex].name + '');
        break;
      case 'עריכת המחזור':
        this.selectedCycle.emit({ name: this.sortionCycles?.cycles[cycleIndex].name, status: this.sortionCycles?.cycles[cycleIndex].status });
        break;
      case 'העבר לארכיון':
        console.log("ארכיון");
        this.selectedPage.emit({ text: this.page.text, url: 'loading-' + this.page.url });
        this.updateCycle(cycleIndex);
        // this.service.updateCycleStatus(this.sortionCycles?.cycles[cycleIndex].name + '', 3);
        break;
      case 'הוצא מארכיון': break;
    }
  }

  deleteCycle(cycleIndex: number) {

    this.service.deleteCycle(this.sortionCycles?.cycles[cycleIndex].name + 'h').subscribe(answer => {
      if (answer.isSuccess === true) {
        this.sortionCycles?.cycles.splice(cycleIndex, 1);
        this.selectedPage.emit({ text: this.page.text, url: 'sorts' });
      }
      else if (answer.isSuccess === false) {
        this.message.emit(answer.message);
        this.selectedPage.emit({ text: this.page.text, url: 'error-sorts' });
      }
    });
  }

  updateCycle(cycleIndex: number) {

    console.log(this.sortionCycles?.cycles[cycleIndex].name);

    this.service.updateCycleStatus(this.sortionCycles?.cycles[cycleIndex].name + 'g', 3).subscribe(answer => {
      if (answer.isSuccess === true) {
        console.log("trueee");
        this.sortionCycles?.cycles.splice(cycleIndex, 1);
        this.selectedPage.emit({ text: this.page.text, url: 'sorts' });
      }
      else if (answer.isSuccess === false) {
        console.log("false");
        this.message.emit(answer.message);
        this.selectedPage.emit({ text: this.page.text, url: 'error-sorts' });
      }
    });
  }

}
