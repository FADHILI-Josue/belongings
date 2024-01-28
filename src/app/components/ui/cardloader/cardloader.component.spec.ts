import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardloaderComponent } from './cardloader.component';

describe('CardloaderComponent', () => {
  let component: CardloaderComponent;
  let fixture: ComponentFixture<CardloaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardloaderComponent]
    });
    fixture = TestBed.createComponent(CardloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
