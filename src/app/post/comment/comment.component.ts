import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
//OBSOLETE?
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
 isLiked = false;
 images = [
  {
    id: 1,
    url: "../../../assets/profile.png"
  },
  {
    id: 2,
    url: "../../../assets/images/avatar1.png"
  },
  {
    id: 3,
    url: "../../../assets/profile.png"
  },
  {
    id: 4,
    url: "../../../assets/images/avatar1.png"
  }
];
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  openModal(largeSlider: any) {
    this.modalService.open(largeSlider, { size: 'lg',centered: true });
  }
 like($event:any){
    console.log("Save button is clicked!", $event);  
    this.isLiked = !this.isLiked
  }
  modelPopupComment(largeDataModal: any) {
    this.modalService.open(largeDataModal, { centered: true });
  }
}
