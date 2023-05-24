import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {

  @Input() title: string | undefined;
  @Input() title_span: string | undefined;
  @Input() subtitle: string | undefined;
  @Input() iconUrl: string | undefined;

  @Output() selectedPage = new EventEmitter<string>();
  @Output() iconClicked = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

}
