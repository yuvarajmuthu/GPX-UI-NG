import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwittertweetsComponent } from './twittertweets.component';

describe('TwittertweetsComponent', () => {
  let component: TwittertweetsComponent;
  let fixture: ComponentFixture<TwittertweetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwittertweetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwittertweetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
