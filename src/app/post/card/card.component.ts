import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  constructor(private router: Router,
    private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  commentPage(){
    this.router.navigate(['/post/comment']);
  }
  modelPopup(largeDataModal: any) {
    this.modalService.open(largeDataModal, { centered: true });
  }
}
