import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordSpeakComponent } from './record-speak.component';

describe('RecordSpeakComponent', () => {
  let component: RecordSpeakComponent;
  let fixture: ComponentFixture<RecordSpeakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordSpeakComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecordSpeakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
