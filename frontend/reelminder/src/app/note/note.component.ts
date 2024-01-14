import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SharedService } from '../shared.service';
import { share } from 'rxjs';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrl: './note.component.css'
})
export class NoteComponent {

  constructor(private shared: SharedService) {}

  @Input() note: any;
  @Output() videoTimeSet = new EventEmitter<{time_s: number}>();
  @Output() refreshNotes = new EventEmitter<any>();

  emitTimeSetter(time: number){
    this.videoTimeSet.emit({time_s: time})
  }

  deleteNote(){
    this.shared.deleteNote(this.note.id).subscribe(res => {
      this.refreshNotes.emit();
    });
  }
  
}
