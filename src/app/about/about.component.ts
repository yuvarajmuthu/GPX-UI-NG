import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  isReadMore = true
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  showText() {
    this.isReadMore = !this.isReadMore
  }
  largeModalAbout(largeDataModalAbout: any) {
    this.modalService.open(largeDataModalAbout, { centered: true });
  }
}
