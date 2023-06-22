import { Component, OnInit } from '@angular/core';
import { NamesService } from '../services/names.service';
import { NameInfo } from '../models/name-info.model';
import { Router } from '@angular/router';
import { AudioService } from '../services/audio.service';

@Component({
  selector: 'app-my-voice',
  templateUrl: './my-voice.component.html',
  styleUrls: ['./my-voice.component.scss'],
})
export class MyVoiceComponent implements OnInit {
  names: any;
  dataSource: NameInfo[] = [];
  speakerName?: string;

  constructor(
    private namesOfAllah: NamesService,
    private router: Router,
    private audioService: AudioService
  ) {}

  ngOnInit(): void {
    this.getNamesAllah();

    this.audioService
      .getSpeakerName()
      .subscribe((x) => (this.speakerName = x || ''));
  }

  getNamesAllah() {
    this.namesOfAllah.getGodNames().subscribe({
      next: (res) => {
        this.dataSource = res;
      },
      error: (err) => {
        alert('something went wrong!');
      },
    });
  }

  goToRecording(data: any) {
    this.router.navigate(['/recording'], { queryParams: data });
  }

  saveSpeakerName(event: any) {
    this.speakerName = event.target.value;
    this.audioService.setSpeakerName(this.speakerName);
  }
}
