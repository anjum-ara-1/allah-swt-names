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
      { name: 'Fatima', path: '1', isCustom: false },
      { name: 'Hameed', path: '2', isCustom: false },
      { name: 'Custom', path: '1', isCustom: true },
    ]);
  }
}
