import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogChangeInfoComponent } from './dialog-change-info.component';

describe('DialogChangeInfoComponent', () => {
  let component: DialogChangeInfoComponent;
  let fixture: ComponentFixture<DialogChangeInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogChangeInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogChangeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
