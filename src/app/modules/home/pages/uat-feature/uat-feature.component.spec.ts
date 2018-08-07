import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UATFeatureComponent } from './uat-feature.component';

describe('UATFeatureComponent', () => {
  let component: UATFeatureComponent;
  let fixture: ComponentFixture<UATFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UATFeatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UATFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
