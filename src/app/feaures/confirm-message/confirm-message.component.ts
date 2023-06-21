import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { iExpandOptions } from 'src/app/interface/management-page';

@Component({
  selector: 'app-confirm-message',
  templateUrl: './confirm-message.component.html',
  styleUrls: ['./confirm-message.component.scss']
})
export class ConfirmMessageComponent implements OnInit {

  @Input() message: string | undefined;
  @Input() option: iExpandOptions | undefined;
  @Input() navTitle: any;

  @Output() selectedPage = new EventEmitter;
  @Output() confirm = new EventEmitter;

  constructor() { }

  ngOnInit(): void {
  }

  closeMessage() {
    this.selectedPage.emit({ url: this.navTitle.url.replace('confirm-', '').replace('error-', ''), text: this.navTitle.text });
  }
}
