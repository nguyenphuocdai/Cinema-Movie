import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookTicketMiniComponent } from './book-ticket-mini.component';

describe('BookTicketMiniComponent', () => {
  let component: BookTicketMiniComponent;
  let fixture: ComponentFixture<BookTicketMiniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookTicketMiniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookTicketMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
