import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';


@Component({
  selector: 'app-block-page',
  templateUrl: './block-page.component.html',
  styleUrls: ['./block-page.component.scss']
})
export class BlockPageComponent implements OnInit {

  @Output() selectedPage = new EventEmitter<string>();
  @Input() page: string = '';
  loading: boolean = false;

  constructor(private msalService: MsalService) {
  }

  ngOnInit(): void {
    this.page = this.page.slice(6, this.page.length);
    this.isLogedIn();
  }

  login() {
    this.msalService.loginPopup().subscribe((response: AuthenticationResult) => {
      this.msalService.instance.setActiveAccount(response.account);
      this.navPage(response.account?.idTokenClaims?.roles || []);
    })
  }

  isLogedIn() {
    if (this.msalService.instance.getActiveAccount() != null) {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.navPage(this.msalService.instance.getActiveAccount()?.idTokenClaims?.roles || []);
      }, 150);
    }
  }

  navPage(rols: string[]) {
    if (this.page != 'management') {
      this.selectedPage.emit(this.page);
    } else if (rols.includes('Mannger') && this.page === 'management') {
      this.selectedPage.emit(this.page);
    }
  }
}
