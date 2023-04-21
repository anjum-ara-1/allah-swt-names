import { Component, OnInit } from '@angular/core';
import { TransliterationService } from './Transliteration.service';
import { Transliteration } from './Transliteration.model';


@Component({
  selector: 'app-names-of-allah',
  templateUrl: './names-of-allah.component.html',
  styleUrls: ['./names-of-allah.component.scss']
})
export class NamesOfAllahComponent implements OnInit {

  displayedColumns: string[] = ['name', 'Transliteration', 'Meaning'];
  dataSource: Transliteration[] = [];
  

  constructor( private service:TransliterationService) { }

  ngOnInit(): void {
    this.getDataList();
  }
  
  getDataList(){
    this.service.getData().subscribe({
      next:(res)=> {
        this.dataSource = res;
      },
      error:(err)=> {
        "something went worng"
      }
    })
  }

  playSound(filename: string){
    const path = `/assets/sound/${filename}`;
    const audio = new Audio();
    audio.src = path;
    audio.load();
    audio.play();
  }
   
  
}
