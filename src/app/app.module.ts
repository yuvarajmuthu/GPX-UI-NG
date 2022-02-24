import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { RightsidemenuComponent } from './rightsidemenu/rightsidemenu.component';
import { EventComponent } from './event/event.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SidemenuComponent,
    RightsidemenuComponent,
    EventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModalModule,
    AutocompleteLibModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
