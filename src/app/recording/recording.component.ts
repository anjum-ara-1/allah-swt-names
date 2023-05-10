import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {
  NgAudioRecorderService,
  OutputFormat,
} from '../services/audio-recorder.service';

import { AudioService } from '../services/audio.service';

@Component({
  selector: 'app-recording',
  templateUrl: './recording.component.html',
  styleUrls: ['./recording.component.scss'],
})
export class RecordingComponent implements OnInit {
  outputFormat: OutputFormat = OutputFormat.WEBM_BLOB;

  constructor(
    private location: Location,
    private audioRecorderService: NgAudioRecorderService,
    private audioService: AudioService
  ) {}

  ngOnInit(): void {

    this.audioService.getNameAudio('AD-DHARR').subscribe(x =>{
      console.log(x);
    })

  }

  back(): void {
    this.location.back();
  }

  startRecording() {
    this.audioRecorderService.startRecording();
  }

  stopRecording() {
    this.audioRecorderService
      .stopRecording(this.outputFormat)
      .then((output) => {
        console.log(output);
        if (output) {
          this.audioService
            .addNameAudio(output as Blob, 'AD-DHARR')
            .subscribe((x) => {
              console.log(x);
            });
        }
      });
  }

  pause() {
    this.audioRecorderService.pause();
  }

  resume() {
    this.audioRecorderService.resume();
  }

  getUserConsent() {
    this.audioRecorderService.getUserContent();
  }

  get recorderState() {
    return this.audioRecorderService.recorderState;
  }
}
