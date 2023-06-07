import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  @Input() apiError: string | undefined;
  @Output() closeMessage = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  closeEvent() {
    if (this.closeMessage)
      this.closeMessage.emit(false);
  }
}
