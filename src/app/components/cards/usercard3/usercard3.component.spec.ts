import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Usercard3Component } from './usercard3.component';

describe('Usercard3Component', () => {
  let component: Usercard3Component;
  let fixture: ComponentFixture<Usercard3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Usercard3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Usercard3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
