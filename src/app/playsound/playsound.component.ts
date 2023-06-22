import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { Observable, tap } from 'rxjs';
import { NameInfo } from '../models/name-info.model';

@Component({
  selector: 'app-playsound',
  templateUrl: './playsound.component.html',
  styleUrls: ['./playsound.component.scss'],
})
export class PlaysoundComponent implements OnInit {
  @Input() nameInfo!: NameInfo;
  selectedAudio: any;
  playbackRate: number = 1.0;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.appService.getSelectedAudio().subscribe((x) => {
      this.selectedAudio = x;
    });
  }

  playSound() {
    const path = `/assets/sound/${this.selectedAudio.path}/${this.nameInfo.Audio}`;
    const audio = new Audio();
    audio.playbackRate = this.playbackRate;
    audio.src = path;
    audio.load();
    audio.play();
  }
 
}
