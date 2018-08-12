import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookChairComponent } from './book-chair.component';

describe('BookChairComponent', () => {
  let component: BookChairComponent;
  let fixture: ComponentFixture<BookChairComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookChairComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookChairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
