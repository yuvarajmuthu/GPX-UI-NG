import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import { UserstageComponent } from './userstage/userstage.component';
import { UserComponent } from './user/user.component';
import { AboutComponent } from './about/about.component';
import { EventComponent } from '../../event/event.component';
//import { HomeComponent } from '../../home/home.component';
import { RoleComponent } from '../../role/role.component';
import { TwittertweetsComponent } from '../../components/twittertweets/twittertweets.component';
import { PostcardComponent } from '../../post/postcard/postcard.component';
import { InterestComponent } from './interest/interest.component';

const routes: Routes = [
  {
   // path: '', 
   // component: UserstageComponent,
   // children: [
     // {
          path: ':id', component: UserComponent,
          children: [
            {
              path: 'about',
              component: AboutComponent,
            },
            {
              path: 'event',
              component: EventComponent,
            },
            {
              path: 'role',
              component: RoleComponent,
            },
            {
              path: 'twitter',
              component: TwittertweetsComponent,
            },
            {
              path: 'news',
              component: PostcardComponent,
            },
            {
              path: 'interest',
              component: InterestComponent,
            }
          ]
     // }  
      
    

   // ]
  }

]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }