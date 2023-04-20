import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NamesOfAllahComponent } from './names-of-allah.component';

describe('NamesOfAllahComponent', () => {
  let component: NamesOfAllahComponent;
  let fixture: ComponentFixture<NamesOfAllahComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NamesOfAllahComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NamesOfAllahComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
