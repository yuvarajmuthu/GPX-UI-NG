import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { NewPostComponent } from './newpost/newpost.component';
import { PostcardComponent } from './postcard/postcard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { BrowserModule } from '@angular/platform-browser';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { MentionModule } from 'angular-mentions';
import { PostComponent } from './post/post.component';
import { CommentComponent } from './comment/comment.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
// import { PostComponent } from './post.component';


@NgModule({
  declarations: [
    NewPostComponent,
    PostcardComponent,
    PostComponent,
    CommentComponent
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    PickerModule,
    FormsModule,
    ReactiveFormsModule,
    MentionModule,
    AngularEditorModule
  ]
})
export class PostModule { }
