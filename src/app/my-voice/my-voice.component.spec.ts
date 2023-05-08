import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyVoiceComponent } from './my-voice.component';

describe('MyVoiceComponent', () => {
  let component: MyVoiceComponent;
  let fixture: ComponentFixture<MyVoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyVoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyVoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
