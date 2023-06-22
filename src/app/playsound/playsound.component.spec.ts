import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaysoundComponent } from './playsound.component';

describe('PlaysoundComponent', () => {
  let component: PlaysoundComponent;
  let fixture: ComponentFixture<PlaysoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaysoundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaysoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
