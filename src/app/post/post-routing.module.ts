import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from './post/post.component';
import { CommentComponent } from './comment/comment.component';
import { NewPostComponent } from './newpost/newpost.component';
import { PostcardComponent } from './postcard/postcard.component';

const routes: Routes = [
  {
    path: '',
    component: PostcardComponent,
  },
  {
    path: 'news',
    component: PostcardComponent,
  },
  {
    path: 'newpost',
    component: NewPostComponent,
  },
  {
    path: 'stage',
    component: PostComponent,
  },
  {
    path: 'comment',
    component: CommentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
