import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dota2Component } from './dota2.component';

describe('Dota2Component', () => {
  let component: Dota2Component;
  let fixture: ComponentFixture<Dota2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dota2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dota2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
