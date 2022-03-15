import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PostComponent } from './post/post.component';
import { PostcardComponent } from './postcard/postcard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { BrowserModule } from '@angular/platform-browser';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { MentionModule } from 'angular-mentions';
import { CardComponent } from './card/card.component';
import { CommentComponent } from './comment/comment.component';
// import { PostComponent } from './post.component';


@NgModule({
  declarations: [
    PostComponent,
    PostcardComponent,
    CardComponent,
    CommentComponent
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    PickerModule,
    FormsModule,
    ReactiveFormsModule,
    MentionModule 
  ]
})
export class PostModule { }
