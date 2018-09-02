import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieShowingComponent } from './movie-showing.component';

describe('MovieShowingComponent', () => {
  let component: MovieShowingComponent;
  let fixture: ComponentFixture<MovieShowingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieShowingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieShowingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
