import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';

import {SearchlegislatorsComponent} from './components/searchlegislators/searchlegislators.component';
import {HomeComponent} from '../app/home/home.component';

const routes: Routes = [
  { path: 'searchLegislator', 
    component: SearchlegislatorsComponent
  },
 // {path: 'circle', component: CircleComponent, canActivate: [AuthGuard]},
//  {path: 'register', component: RegisterComponent},
 // {path: 'login', component: LoginComponent},
 // {path: 'createpage', component: CreatepageComponent, canActivate: [AuthGuard]},
 // {path: 'createpageoptions', component: CreatepageselectionComponent, canActivate: [AuthGuard]},
 // {path: 'request', loadChildren: './components/connection/connection.module#ConnectionModule', canActivate: [AuthGuard]},
  {path: 'home', component: HomeComponent},
  //{path: 'privacy', component: PrivacyComponent},
  //{path: 'terms', component: TermsComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},

  //lazy loading
  {
    path: 'user', 
    loadChildren: () => import('./components/user/user.module').then(m => m.UserModule)
  },
  { 
    path: 'post', 
    loadChildren: () => import('./post/post.module').then(m => m.PostModule)
    //, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
