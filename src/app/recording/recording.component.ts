import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {
  NgAudioRecorderService,
  OutputFormat,
} from '../services/audio-recorder.service';

import { AudioService } from '../services/audio.service';
import { NamesService } from '../services/names.service';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { NameInfo } from '../models/name-info.model';

@Component({
  selector: 'app-recording',
  templateUrl: './recording.component.html',
  styleUrls: ['./recording.component.scss'],
})
export class RecordingComponent implements OnInit {
  dataSource: any;
  outputFormat: OutputFormat = OutputFormat.WEBM_BLOB;
  voiceName: any;
  voiceAudio: any;
  recordedAudio: any;
  recordedAudioUrl?: string;
  recordedAudioInUse: boolean = false;
  voiceAudioUrl: any;

  constructor(
    private location: Location,
    private audioRecorderService: NgAudioRecorderService,
    private audioService: AudioService,
    private namesOfAllah: NamesService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getDefaultAudio();
    this.getNamesOfAllah();
    this.getRecordedAudio();
  }

  getNamesOfAllah() {
    this.namesOfAllah.getGodNames().subscribe({
      next: (res) => {
        this.dataSource = res;
      },
      error: (err) => {
        alert('something went worng!');
      },
    });
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
            .addNameAudio(output as Blob, this.voiceName, false)
            .subscribe((x) => {
              console.log(x);
              this.getRecordedAudio();
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

  getRecordedAudio() {
    this.audioService.getNameAudio(this.voiceName).subscribe((x: any) => {
      if (x) {
        this.recordedAudio = x.blob;
        this.recordedAudioUrl = URL.createObjectURL(this.recordedAudio);
        this.recordedAudioInUse = x.inUse;
      }
    });
  }

  getDefaultAudio() {
    this.router.queryParamMap.subscribe((x) => {
      console.log(x);
      this.voiceName = x.get('Transliteration');
      this.voiceAudio = x.get('Audio');
      this.voiceAudioUrl = `/assets/sound/1/${this.voiceAudio}`;
    });
  }

  trackByFn(index: number, item: any) {
    return item.id;
  }

  deleteRecording() {
    this.audioService.deleteAudio(this.voiceName).subscribe((x) => {
      this.recordedAudioUrl = '';
    });
  }

  inUseChecked(event: boolean) {
    this.audioService
      .addNameAudio(this.recordedAudio, this.voiceName, event)
      .subscribe((x) => {
        console.log(x);
      });
    return false;
  }
}
