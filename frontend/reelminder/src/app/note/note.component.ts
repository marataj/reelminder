import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SharedService } from '../shared.service';
import { share } from 'rxjs';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrl: './note.component.css',
})
export class NoteComponent {
  constructor(private shared: SharedService) {}

  @Input() note: any;
  @Output() videoTimeSet = new EventEmitter<{ time_s: number }>();
  @Output() refreshNotes = new EventEmitter<any>();

  emitTimeSetter(time: number) {
    this.videoTimeSet.emit({ time_s: time });
  }

  deleteNote() {
    this.shared.deleteNote(this.note.id).subscribe((res) => {
      this.refreshNotes.emit();
    });
  }

  secondsToTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    } else {
      return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
        .toString()
        .padStart(2, '0')}`;
    }
  }
}
