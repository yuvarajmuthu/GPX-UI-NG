import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent } from './card/card.component';
import { CommentComponent } from './comment/comment.component';
import { PostComponent } from './post/post.component';
import { PostcardComponent } from './postcard/postcard.component';

const routes: Routes = [
  {
    path: 'postcard',
    component: PostcardComponent,
  },
  {
    path: 'post',
    component: PostComponent,
  },
  {
    path: 'card',
    component: CardComponent,
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
