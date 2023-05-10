import { Component, OnInit } from '@angular/core';
import { TransliterationService } from '../names-of-allah/Transliteration.service';
import { Transliteration } from '../names-of-allah/Transliteration.model';

@Component({
  selector: 'app-my-voice',
  templateUrl: './my-voice.component.html',
  styleUrls: ['./my-voice.component.scss']
})
export class MyVoiceComponent implements OnInit {
  names:any;
  dataSource: Transliteration[] = [];
  constructor(private namesOfAllah:TransliterationService) { }

  ngOnInit(): void {
    this.namesOfAllah.getData();
  }

  getNamesAllah(){
    this.namesOfAllah.getData().subscribe({
      next : (res) => {
        this.names = res;
      },
      error : (err) => {
        alert("something went wrong!")
      }
    })
  }

}
