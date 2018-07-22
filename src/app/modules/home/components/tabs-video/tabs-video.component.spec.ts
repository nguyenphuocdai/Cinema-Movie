import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsVideoComponent } from './tabs-video.component';

describe('TabsVideoComponent', () => {
  let component: TabsVideoComponent;
  let fixture: ComponentFixture<TabsVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
