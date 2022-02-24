import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  isReadMore = true
  showText() {
    this.isReadMore = !this.isReadMore
  }
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  largeModal(largeDataModalAbout: any) {
    this.modalService.open(largeDataModalAbout, { centered: true });
  }
}
