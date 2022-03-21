import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserComponent } from './user/user.component';

import {UserRoutingModule} from './user-routing.module';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UserstageComponent } from './userstage/userstage.component';

import { HomeComponent } from '../../home/home.component';
import { SidemenuComponent } from '../../sidemenu/sidemenu.component';
import { RightsidemenuComponent } from '../../rightsidemenu/rightsidemenu.component';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    ReactiveFormsModule,
    AutocompleteLibModule,
    UserRoutingModule,
    NgbModule,
    NgMultiSelectDropDownModule.forRoot()

  ],
  exports: [
    ],
  //Any component as well as directives and pipes need to be added in declarations array  
  declarations: [
    UserComponent, 
   UserstageComponent,
   HomeComponent,
   SidemenuComponent,
   RightsidemenuComponent
  ],
  //The entryComponents array is used to define only components that are not found in html and created dynamically with ComponentFactoryResolver.
  entryComponents:[UserstageComponent],
  //exports:[UserstageComponent]
})
export class UserModule { }
