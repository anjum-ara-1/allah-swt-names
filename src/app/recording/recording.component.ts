import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {
  NgAudioRecorderService,
  OutputFormat,
} from '../services/audio-recorder.service';

import { AudioService } from '../services/audio.service';
import { TransliterationService } from '../names-of-allah/Transliteration.service';
import { ActivatedRoute, Data, Router } from '@angular/router';

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

  constructor(
    private location: Location,
    private audioRecorderService: NgAudioRecorderService,
    private audioService: AudioService,
    private namesOfAllah: TransliterationService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.router.queryParamMap.subscribe((x) => {
      console.log(x);
      this.voiceName = x.get('Transliteration') ;
      this.voiceAudio = x.get ('Audio')
    });

    this.getNamesOfAllah();
    this.audioService.getNameAudio('AD-DHARR').subscribe((x) => {
      console.log(x);
    });
  }

  getNamesOfAllah() {
    this.namesOfAllah.getData().subscribe({
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

  playSound(filename: string) {
    const path = `/assets/sound/1/${filename}`;
    const audio = new Audio();
    audio.src = path;
    audio.load();
    audio.play();
  }

  

}
