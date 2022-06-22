import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';

import {GlobalSearchComponent} from './components/global-search/global-search.component';
import { Usercard1Component } from './components/cards/usercard1/usercard1.component';
import {Usercard2Component} from './components/cards/usercard2/usercard2.component';
import { Usercard3Component } from './components/cards/usercard3/usercard3.component';
import { FollowersComponent } from './components/connection/followers/followers.component';


@NgModule({
  imports: [
    CommonModule,
    AutocompleteLibModule,

  ],
  exports:[
    GlobalSearchComponent,
    //Usercard1Component,
    Usercard2Component, //used in circlecomponent of app.module which is outside of this module, so have to export
    //Usercard3Component,
    //FollowersComponent
  ],
  declarations: [
    GlobalSearchComponent,
    Usercard1Component,
    Usercard2Component,
    Usercard3Component,
    FollowersComponent
  ],
  providers:[

  ]
})
export class SharedModule {}
