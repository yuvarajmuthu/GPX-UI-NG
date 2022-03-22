import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HttpClientJsonpModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {UserModule} from './components/user/user.module';

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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    UserModule
  ],
    exports:[
      UserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
