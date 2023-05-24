import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SearchInputComponent } from './feaures/search-input/search-input.component';
import { SearchOutputComponent } from './pages/search-output/search-output.component';
import { SearchListResultComponent } from './feaures/search-list-result/search-list-result.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from './feaures/header/header.component';
import { MyFavoritesComponent } from './pages/my-favorites/my-favorites.component';
import { PageHeaderComponent } from './feaures/page-header/page-header.component';
import { SafeUrlPipe } from './pipes/safe-url.pipe';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { SortingCycleComponent } from './pages/sorting-cycle/sorting-cycle.component';
import { PreferenceFormComponent } from './pages/preference-form/preference-form.component';
import { SelectOptionsPipe } from './pipes/select-options.pipe';
import { MsalInterceptor, MsalInterceptorConfiguration, MsalModule, MsalService, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG } from '@azure/msal-angular'
import { InteractionType, IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';


import { MicrosoftLoginService } from './microsoft-msal/microsoft-login/microsoft-login.service';
import { RequestsService } from './api-connection/requests/requests.service';
import { SearchCoursesService } from './services/search-courses/search-courses.service';
import { TransformResService } from './services/transform-res/transform-res.service';
import { BlockPageComponent } from './feaures/block-page/block-page.component';

export function MSAL_InctanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: '4e3fe790-6226-4152-8ca8-e1c01bd31a6c',
      redirectUri: 'https://index-bislat.azurewebsites.net/management'
    }
  })
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {

  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set('https://index-bislat-back.azurewebsites.net', ['api://4e3fe790-6226-4152-8ca8-e1c01bd31a6c/access_as_user']);
  protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', ['user.read', 'mail.read']);
  return {
    interactionType: InteractionType.Popup,
    protectedResourceMap
  };
}




@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    SearchInputComponent,
    HeaderComponent,
    SearchOutputComponent,
    MyFavoritesComponent,
    SearchListResultComponent,
    SafeUrlPipe,
    PageHeaderComponent,
    SortingCycleComponent,
    PreferenceFormComponent,
    SelectOptionsPipe,
    BlockPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: MSAL_INSTANCE,
      useFactory: MSAL_InctanceFactory
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory
    },
    MsalService,
    SearchCoursesService,
    RequestsService,
    MicrosoftLoginService,
    TransformResService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
