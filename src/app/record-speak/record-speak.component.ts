import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AudioSpeakService, StreamState  } from '../services/audio-speak.service';

@Component({
  selector: 'app-record-speak',
  templateUrl: './record-speak.component.html',
  styleUrls: ['./record-speak.component.scss'],
  providers: [AudioSpeakService]
})
export class RecordSpeakComponent implements OnInit, OnChanges {

  @Input() url!: string;
  @Input() allowDelete: boolean = true;
  state?: StreamState;
  @Output() onDelete = new EventEmitter();

  constructor(
    private audioService: AudioSpeakService,) 
    
    {
    this.audioService.getState().subscribe(state => {
      this.state = state;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['url'].previousValue !== changes['url'].currentValue) {
      this.url = changes['url'].currentValue;
      this.loadStream(this.url);
    }
  }

  ngOnInit(): void {
    this.loadStream(this.url);
  }

  loadStream(url : any) {
    this.audioService.loadStream(url).subscribe(events => {
    });
  }

  pause() {
    this.audioService.pause();
  }

  play() {
    this.audioService.play();
  }

  stop() {
    this.audioService.stop();
  }

  onSliderChangeEnd(change : any) {
    this.audioService.seekTo(change.value);
  }

  deleteRecording() {
    this.onDelete.emit('OnDelete');
  }

}

