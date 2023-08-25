import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { Observable, tap } from 'rxjs';
import { NameInfo } from '../models/name-info.model';
import { AudioService } from '../services/audio.service';

@Component({
  selector: 'app-playsound',
  templateUrl: './playsound.component.html',
  styleUrls: ['./playsound.component.scss'],
})
export class PlaysoundComponent implements OnInit {
  @Input() nameInfo!: NameInfo;
  selectedAudio: any;
  playbackRate: number = 1.0;
  recordedAudioUrl?: string;
  speakerName?: string;
  recordedAudioInUse?: boolean;

  constructor(
    private appService: AppService,
    private audioService: AudioService
  ) {}

  ngOnInit(): void {
    this.appService.getSelectedAudio().subscribe((x) => {
      this.selectedAudio = x;
    });

    this.getRecordedAudio();
    this.audioService
    .getSpeakerName()
    .subscribe((x) => (this.speakerName = x));
  }

  getRecordedAudio() {
    this.audioService
      .getNameAudio(this.nameInfo.Transliteration!)
      .subscribe((x) => {
        if (x) {
          let recordedAudio = x.blob;
          this.recordedAudioUrl = URL.createObjectURL(recordedAudio);
          this.recordedAudioInUse = x.inUse;
        }
      });
  }

  playSound() {
    const audio = new Audio();
    if (this.recordedAudioUrl && this.recordedAudioInUse && this.selectedAudio?.isCustom ) {
      audio.src= this.recordedAudioUrl;
    } else {
      const path = `/assets/sound/${this.selectedAudio.path}/${this.nameInfo.Audio}`;
      audio.src = path;
    }

    audio.playbackRate = this.playbackRate;
    audio.load();
    audio.play();
  }
}
