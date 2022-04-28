import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-interest',
  templateUrl: './interest.component.html',
  styleUrls: ['./interest.component.scss']
})
export class InterestComponent implements OnInit {

  constructor() { }
  
  array=[
    'Abortion',
    'Climate Change',
    'Criminal Justice',
    'Economic Inequality',
    'Education',
    'Electoral College',
    'Foreign policy',
    'Gun Policy',
    'Health Care',
    'Immigration',
    'Opioid Crisis',
    'Trade',
  ]
  color:string = 'select';
  ngOnInit(): void {
  }

}
