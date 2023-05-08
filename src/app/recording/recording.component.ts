import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {
  NgAudioRecorderService,
  OutputFormat,
} from '../services/audio-recorder.service';

@Component({
  selector: 'app-recording',
  templateUrl: './recording.component.html',
  styleUrls: ['./recording.component.scss'],
})
export class RecordingComponent implements OnInit {
  outputFormat: OutputFormat = OutputFormat.WEBM_BLOB;

  constructor(
    private location: Location,
    private audioRecorderService: NgAudioRecorderService
  ) {}

  ngOnInit(): void {}
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
