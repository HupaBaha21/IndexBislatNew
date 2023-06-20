import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-confirm-message',
  templateUrl: './confirm-message.component.html',
  styleUrls: ['./confirm-message.component.scss']
})
export class ConfirmMessageComponent implements OnInit {

  @Input() message: string | undefined;
  @Input() navTitle: any;
  @Output() selectedPage = new EventEmitter;
  @Output() confirm = new EventEmitter;

  constructor() { }

  ngOnInit(): void {
    // console.log(this.navTitle);
  }

  closeMessage() {
    // console.log(this.navTitle);
    this.selectedPage.emit({ url: this.navTitle.url.replace('confirm-', '').replace('error-', ''), text: this.navTitle.text });
  }
}
