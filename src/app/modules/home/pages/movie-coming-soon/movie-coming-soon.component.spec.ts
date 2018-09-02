import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieComingSoonComponent } from './movie-coming-soon.component';

describe('MovieComingSoonComponent', () => {
  let component: MovieComingSoonComponent;
  let fixture: ComponentFixture<MovieComingSoonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieComingSoonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieComingSoonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
