import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  setting = new BehaviorSubject<any>({});
  private selectedAudio = new BehaviorSubject<any>({});

  constructor() {}

  setSelectedAudio(audio: any) {
    this.selectedAudio.next(audio);
  }

  getSelectedAudio() {
    this.selectedAudio.asObservable();
  }
}
