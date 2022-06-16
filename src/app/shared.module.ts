import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';

import {GlobalSearchComponent} from './components/global-search/global-search.component';
import {Usercard2Component} from './components/cards/usercard2/usercard2.component';


@NgModule({
  imports: [
    CommonModule,
    AutocompleteLibModule,

  ],
  exports:[
    GlobalSearchComponent,
    Usercard2Component
  ],
  declarations: [
    GlobalSearchComponent,
    Usercard2Component
  ],
  providers:[

  ]
})
export class SharedModule {}
