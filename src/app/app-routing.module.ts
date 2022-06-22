import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';

import {SearchlegislatorsComponent} from './components/searchlegislators/searchlegislators.component';
import {HomeComponent} from '../app/home/home.component';
import { PrivacyComponent } from './components/legal/privacy/privacy.component';
import { TermsComponent } from './components/legal/terms/terms.component';
import {RegisterComponent} from './components/security/register/register.component';
import {LoginComponent} from './components/security/login/login.component';
import {CreatepageselectionComponent} from './components/createpage/createpageselection/createpageselection.component';
import { CreatepageComponent } from './components/createpage/createpage.component';
import {ConnectionlistComponent} from './components/connection/connectionlist/connectionlist.component';
import {CircleComponent} from './components/circle/circle.component';

import {AuthGuard} from '../app/auth/auth.guard';
import { ElectionComponent } from './election/election.component';
import { OtpComponent } from './components/security/otp/otp.component';

const routes: Routes = [
  { path: 'searchLegislator', 
    component: SearchlegislatorsComponent
  },
  
  {path: 'connections', component: ConnectionlistComponent, canActivate: [AuthGuard]},
  {path: 'createpageoptions', component: CreatepageselectionComponent, canActivate: [AuthGuard]},
  {path: 'createpage', component: CreatepageComponent, canActivate: [AuthGuard]},
  {path: 'circle', component: CircleComponent, canActivate: [AuthGuard]},
   // {path: 'circle', component: CircleComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'otp', component: OtpComponent},
 // {path: 'createpage', component: CreatepageComponent, canActivate: [AuthGuard]},
 // {path: 'createpageoptions', component: CreatepageselectionComponent, canActivate: [AuthGuard]},
 // {path: 'request', loadChildren: './components/connection/connection.module#ConnectionModule', canActivate: [AuthGuard]},
  {path: 'home', component: HomeComponent},
  {path: 'privacy', component: PrivacyComponent},
  {path: 'election', component: ElectionComponent},
  {path: 'terms', component: TermsComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},

  //lazy loading
  {
    path: 'user', 
    loadChildren: () => import('./components/user/user.module').then(m => m.UserModule)
  },
  { 
    path: 'post', 
    loadChildren: () => import('./post/post.module').then(m => m.PostModule)
    , canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
