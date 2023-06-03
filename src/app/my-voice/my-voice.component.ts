import { Component, OnInit } from '@angular/core';
import { TransliterationService } from '../names-of-allah/Transliteration.service';
import { Transliteration } from '../names-of-allah/Transliteration.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-voice',
  templateUrl: './my-voice.component.html',
  styleUrls: ['./my-voice.component.scss'],
})
export class MyVoiceComponent implements OnInit {
  names: any;
  dataSource: Transliteration[] = [];
  constructor(
    private namesOfAllah: TransliterationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getNamesAllah();
  }

  getNamesAllah() {
    this.namesOfAllah.getData().subscribe({
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
}
