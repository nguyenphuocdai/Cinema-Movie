import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieAccountComponent } from './movie-account.component';

describe('MovieAccountComponent', () => {
  let component: MovieAccountComponent;
  let fixture: ComponentFixture<MovieAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
