import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';

import {SearchlegislatorsComponent} from './components/searchlegislators/searchlegislators.component';

const routes: Routes = [
  { path: 'searchLegislator', 
    component: SearchlegislatorsComponent
  },
  //lazy loading
  {
    path: 'user', 
    loadChildren: () => import('./components/user/user.module').then(m => m.UserModule)
  },
  { 
    path: 'post', 
    loadChildren: () => import('./post/post.module').then(m => m.PostModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
