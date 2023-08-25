import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NgAudioRecorderService {
  private _chunks: Array<any> = [];
  protected recorderEnded = new EventEmitter();
  public recorderError = new EventEmitter<ErrorCase>();
  private _recorderState = RecorderState.INITIALIZING;
  private recorder?: MediaRecorder;

  constructor() {}

  get recorderState() {
    return this._recorderState;
  }

  get chunksAsBlob() {
    return new Blob(this._chunks, { type: 'audio/webm' });
  }

  isSupportMediaDevices() {
    return !!navigator.mediaDevices;
  }

  private static guc() {
    return navigator.mediaDevices.getUserMedia({ audio: true });
  }

  getUserContent() {
    return NgAudioRecorderService.guc();
  }

  startRecording() {
    if (this._recorderState === RecorderState.RECORDING) {
      this.recorderError.emit(ErrorCase.ALREADY_RECORDING);
    }
    if (this._recorderState === RecorderState.PAUSED) {
      this.resume();
      return;
    }
    this._recorderState = RecorderState.INITIALIZING;
    NgAudioRecorderService.guc().then((mediaStream) => {
      this.recorder = new MediaRecorder(mediaStream);
      this._recorderState = RecorderState.INITIALIZED;
      this.addListeners();
      this.recorder.start();
      this._recorderState = RecorderState.RECORDING;
    });
  }

  pause() {
    if (this._recorderState === RecorderState.RECORDING) {
      this.recorder?.pause();
      this._recorderState = RecorderState.PAUSED;
    }
  }

  resume() {
    if (this._recorderState === RecorderState.PAUSED) {
      this._recorderState = RecorderState.RECORDING;
      this.recorder?.resume();
    }
  }

  async stopRecording(outputFormat: OutputFormat) {
    this._recorderState = RecorderState.STOPPING;
    return new Promise((resolve, reject) => {
      this.recorderEnded.subscribe(
        (blob) => {
          this._recorderState = RecorderState.STOPPED;
          if (outputFormat === OutputFormat.WEBM_BLOB) {
            resolve(blob);
          }
          if (outputFormat === OutputFormat.WEBM_BLOB_URL) {
            const audioURL = URL.createObjectURL(blob);
            resolve(audioURL);
          }
        },
        (_) => {
          this.recorderError.emit(ErrorCase.RECORDER_TIMEOUT);
          reject(ErrorCase.RECORDER_TIMEOUT);
        }
      );
      this.recorder?.stop();
    }).catch(() => {
      this.recorderError.emit(ErrorCase.USER_CONSENT_FAILED);
    });
  }

  getRecorderState() {
    return this._recorderState;
  }

  private addListeners() {
    if (this.recorder) {
      this.recorder.ondataavailable = this.appendToChunks;
      this.recorder.onstop = this.recordingStopped;
    }
  }

  private appendToChunks = (event: any) => {
    this._chunks.push(event.data);
  };

  private recordingStopped = (event: any) => {
    const blob = new Blob(this._chunks, { type: 'audio/webm' });
    this._chunks = [];
    this.recorderEnded.emit(blob);
    this.clear();
  };

  private clear() {
    this.recorder = undefined;
    this._chunks = [];
  }

  async getConnectedDevices(type: any) {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.filter((device) => device.kind === type);
  }
}

export enum OutputFormat {
  WEBM_BLOB_URL,
  WEBM_BLOB,
}

export enum ErrorCase {
  USER_CONSENT_FAILED,
  RECORDER_TIMEOUT,
  ALREADY_RECORDING,
}

export enum RecorderState {
  INITIALIZING = 1,
  INITIALIZED = 2,
  RECORDING = 3,
  PAUSED = 4,
  STOPPING = 5,
  STOPPED = 6,
}
