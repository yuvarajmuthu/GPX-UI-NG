import { Component, HostListener, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  navFixed: boolean = false;
  private scrollOffset: number = 450;
  SectionName=''
  isReadMore = true
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {

  }
  largeModal(largeDataModal: any) {
    this.modalService.open(largeDataModal, { centered: true });
  }
  
  OpenSection(SectionModel: any,Section:any) {
    this.modalService.open(SectionModel, { centered: true });
    this.SectionName=Section
  }
  showText() {
    this.isReadMore = !this.isReadMore
  }
  @HostListener('window:scroll')
  onWindowScroll() {
    this.navFixed = (window.pageYOffset
      || document.documentElement.scrollTop
      || document.body.scrollTop || 0
    ) > this.scrollOffset;
  }
  largeModalAbout(largeDataModalAbout: any) {
    this.modalService.open(largeDataModalAbout, { centered: true });
  }

  fileNameProfile: string = "";
  onChangeProfile(event:any) {
    this.fileNameProfile = event.target.files[0].name;
  }
  fileNamecover: string = "";
  onChangecover(event:any) {
    this.fileNamecover = event.target.files[0].name;
  }
}
