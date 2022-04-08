import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  //title = 'GoPilitix';
  ngAfterViewInit(): void {
    (<any>window).twttr.widgets.load();
}
}
