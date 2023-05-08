import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'

@Component({
  selector: 'app-recording',
  templateUrl: './recording.component.html',
  styleUrls: ['./recording.component.scss']
})
export class RecordingComponent implements OnInit {

  constructor( private location: Location) { }

  ngOnInit(): void {
  }
  back(): void {
    this.location.back()
  } 
}
