import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { AudioOption } from '../models/audio-option.model';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private selectedAudio = new BehaviorSubject<AudioOption>({} as any);

  constructor() {}

  setSelectedAudio(audio: AudioOption) {
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
