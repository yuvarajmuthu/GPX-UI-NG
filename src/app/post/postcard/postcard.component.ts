import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-postcard',
  templateUrl: './postcard.component.html',
  styleUrls: ['./postcard.component.scss']
})
export class PostcardComponent implements OnInit {
  isLiked = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  like($event:any){
    console.log("Save button is clicked!", $event);  
    this.isLiked = !this.isLiked
  }
  commentPage(){
    this.router.navigate(['/post/comment']);
  }
}
