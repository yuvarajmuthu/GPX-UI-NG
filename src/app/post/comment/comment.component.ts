import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
 isLiked = false;
 
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }
 like($event:any){
    console.log("Save button is clicked!", $event);  
    this.isLiked = !this.isLiked
  }
  modelPopupComment(largeDataModal: any) {
    this.modalService.open(largeDataModal, { centered: true });
  }
}
