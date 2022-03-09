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
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';
import { RoleComponent } from './role/role.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SidemenuComponent,
    RightsidemenuComponent,
    EventComponent,
    AboutComponent,
    FooterComponent,
    RoleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    NgMultiSelectDropDownModule.forRoot(),
    AppRoutingModule,
    NgbModalModule,
    AutocompleteLibModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
