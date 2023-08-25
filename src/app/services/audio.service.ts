import { Injectable } from '@angular/core';
import { StorageService, tableNames } from './storage.service';
import { Observable, map } from 'rxjs';
import { BlobAudioModel } from '../models/blob-audio.model';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  constructor(private storage: StorageService) {}

  addNameAudio(blob: Blob, name: string, inUse: boolean) {
    let audioObj = {
      blob: blob,
      name: name,
      inUse: inUse,
    };
    return this.storage.addOrUpdate(tableNames.audio, audioObj);
  }

  getNameAudio(name: string) {
    return this.storage.get<BlobAudioModel>(tableNames.audio, name);
  }

  safePlay(ele: HTMLAudioElement, src: string, retryCounter = 1) {
    if (ele) {
      ele.src = src;
      // ele.load();
      ele.onloadeddata = () => {
        ele.play().catch((err) => this.errorHandling(err, ele));
      };

      ele.onerror = (x) => {
        // this.logger.error('Could not safe play', x);
        if (retryCounter == 1) {
          this.safePlay(ele, src, ++retryCounter);
        }
      };
    }
  }

  /**
   * Error handling of Audio play
   * @param err DOMException
   */
  errorHandling(err: DOMException, context?: any) {
    if (err && err.code == 9) {
      // // err.name == 'NotSupportedError
      // // do nothing as audio is interpted
      // let x = this.noty.info('Could not play audio.', 'Play');
      // if (context) {
      //   x.onAction().subscribe(_ => {
      //     context.load();
      //     context.play();
      //   })
      // }
      // this.logger.error('Could not play this audio', { err, context });
      // // this.noty.error('Audio paused: Could not play this audio.', 'Change Audio');
    } else if (err && err.code == 20) {
      // err.name == 'AbortError
      // do nothing as audio is interpted
      // this.logger.error('Audio paused: Could not play this audio', { err, context });
    } else {
      // this.logger.error('Could not play this audio', { err, context });
      // this.noty.error('Could not play this audio.', 'Change Audio');
    }
  }

  /**
   * Get Speaker name from Storage
   * @returns Speaker name as Observable
   */
  deleteAudio(item: any) {
    return this.storage.deleteRecord(tableNames.audio, item);
  }

  getSpeakerName(): Observable<string> {
    return this.storage.getByKey<any>(tableNames.misc, 'speakerName').pipe(
      // tap(x => console.warn(x)),
      map((x) => x?.value)
    );
  }

  /**
   * Add or Update Speaker name in Storage
   * @param speakerName
   */
  setSpeakerName(speakerName: any) {
    let obj = {
      date: new Date(),
      tag: 'speakerName',
      name: 'speakerName',
      value: speakerName,
    };
    this.storage.addOrUpdateName(tableNames.misc, obj).subscribe((res: any) => {
      console.log(res);
    });
  }
}
