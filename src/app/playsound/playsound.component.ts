import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-playsound',
  templateUrl: './playsound.component.html',
  styleUrls: ['./playsound.component.scss'],
})
export class PlaysoundComponent implements OnInit {
  playbackRate: number = 1.0;
  audioOptions$!: Observable<any>;
  selectedAudio: any;
  selectedSound: any;

  constructor(private appService: AppService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.audioOptions$ = this.appService
      .getAudioOptions()
      .pipe(tap((x) => this.appService.setSelectedAudio(x[0])));

    this.appService.getSelectedAudio().subscribe((x) => {
      this.selectedAudio = x;
      this.cdr.detectChanges();
    });

    this.appService.getAudioOptions().subscribe((x) =>{
      this.selectedSound = x.Audio!;
    })
  }

  play(filename: string) {
    const path = `/assets/sound/${this.selectedAudio.path}/${filename}`;
    const audio = new Audio();
    audio.playbackRate = this.playbackRate;
    audio.src = path;
    audio.load();
    audio.play();
  }

  onAudioChange(option: any) {
    this.appService.setSelectedAudio(option);
  }
}
