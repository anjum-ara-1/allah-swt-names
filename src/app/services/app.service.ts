import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';

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
    return this.selectedAudio.asObservable();
  }

  getAudioOptions() {
    return of([
      { name: 'Fatima', path: '1' },
      { name: 'Hameed', path: '2' },
      { name: 'Custom', path: '1' },
    ]);
  }

}
