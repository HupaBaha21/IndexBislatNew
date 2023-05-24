import { Component, OnInit } from '@angular/core';
import { MicrosoftLoginService } from 'src/app/microsoft-msal/microsoft-login/microsoft-login.service';

@Component({
  selector: 'app-block-page',
  templateUrl: './block-page.component.html',
  styleUrls: ['./block-page.component.scss']
})
export class BlockPageComponent implements OnInit {

  constructor(private msal_service: MicrosoftLoginService) { }

  ngOnInit(): void {
  }

  buttonClicked() {
    this.logIn();
  }

  isLogedIn(): boolean { return this.msal_service.isLogedIn(); };
  logIn() { this.msal_service.logIn(); }
}
