import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrl: './note.component.css'
})
export class NoteComponent {

  @Input() note: any;
  @Output() videoTimeSet = new EventEmitter<{time_s: number}>();

  emitTimeSetter(time: number){
    this.videoTimeSet.emit({time_s: time})
  }

}
