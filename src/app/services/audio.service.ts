import { Injectable } from '@angular/core';
import { StorageService, tableNames } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  
  constructor(private storage: StorageService) {}

  addNameAudio(blob: Blob, name: string) {
    let audioObj = {
      blob: blob,
      name: name
    };
    return this.storage.addOrUpdate(tableNames.audio, audioObj);
  }

  getNameAudio(arg0: string) {
    return this.storage.get(tableNames.audio, arg0);
  }
}
