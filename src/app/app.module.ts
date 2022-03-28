import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HttpClientJsonpModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {JwtModule} from '@auth0/angular-jwt';

import { SocialLoginModule, SocialAuthServiceConfig  } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";


import { AppRoutingModule } from './app-routing.module';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {UserModule} from './components/user/user.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
//import { SidemenuComponent } from './sidemenu/sidemenu.component';
//import { RightsidemenuComponent } from './rightsidemenu/rightsidemenu.component';
import { EventComponent } from './event/event.component';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';
import { RoleComponent } from './role/role.component';
import {SearchlegislatorsComponent} from './components/searchlegislators/searchlegislators.component';
import {LegislatorComponent} from './components/legislator/legislator.component';
import {GAddressSearchComponent} from './components/g-address-search/g-address-search.component';


//import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import {MockHttpInterceptorService} from '../app/services/mock/mock-http-interceptor.service';
import {AuthenticationService} from '../app/services/authentication.service';
import {AuthGuard} from '../app/auth/auth.guard';

export function tokenGetter() {
  return localStorage.getItem('currentUserToken');
}




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    //SidemenuComponent,
    //RightsidemenuComponent,
    EventComponent,
    AboutComponent,
    FooterComponent,
    RoleComponent,
    SearchlegislatorsComponent,
    LegislatorComponent,
    GAddressSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    //NgMultiSelectDropDownModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    NgbModalModule,
    AutocompleteLibModule,
    NgbModule,
    SocialLoginModule,
    UserModule,
    //Any requests sent using Angular's HttpClient will automatically have a token attached as an Authorization header.
    JwtModule.forRoot({
      config: {
          skipWhenExpired: true,
          //throwNoTokenError: true,
          tokenGetter: tokenGetter,
          //Authenticated requests should only be sent to whitelistedDomains
          //DEV mode
          allowedDomains: ['localhost:5000'],
          //PROD mode
          //allowedDomains: ['www.gpxservice.xyz'],
          //specific routes that shouldn’t receive the JWT even if they are on a whitelisted domain
          disallowedRoutes: ['localhost:5000/login','localhost:5000/user/tokenVerify']
          //disallowedRoutes: ['https://www.gpxservice.xyz/login','https://www.gpxservice.xyz/user/tokenVerify']
      }
  })
  ],
    exports:[
      UserModule],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          //enable the interceptor only for DEV mode
          {
              provide: HTTP_INTERCEPTORS,
              useClass: MockHttpInterceptorService,
              multi: true
          },  
          AuthenticationService,
          AuthGuard,        
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '300979965528-5oo12abv1dtekvh6ugtgmfvofm8h903p.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('3044465642432045')
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
