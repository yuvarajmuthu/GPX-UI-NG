import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';

import {GlobalSearchComponent} from './components/global-search/global-search.component';



@NgModule({
  imports: [
    CommonModule,
    AutocompleteLibModule,

  ],
  exports:[
    GlobalSearchComponent
  ],
  declarations: [
    GlobalSearchComponent
  ],
  providers:[

  ]
})
export class SharedModule {}
