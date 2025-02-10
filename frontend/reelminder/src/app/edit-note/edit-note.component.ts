import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { SharedService } from '../shared.service';
import { createErrorMessage } from '../shared/utils';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrl: './edit-note.component.css',
})
export class EditNoteComponent implements AfterViewInit, OnInit {
  @Output() closeMeEvent = new EventEmitter();
  @Output() confirmEvent = new EventEmitter();
  @Input() params: any;
  private editor;
  private note;
  errors = '';

  constructor(private shared: SharedService) {}

  ngOnInit(): void {
    this.note = this.params.note;
  }

  ngAfterViewInit(): void {
    // @ts-ignore
    this.editor = $('#note_editor');
    this.editor.summernote({
      height: 100,
      toolbar: [
        ['style', ['bold', 'italic', 'underline', 'clear']],
        ['font', ['strikethrough']],
      ],
    });
    this.editor.summernote('code', this.note.content);
  }

  saveNote() {
    this.note.content = this.editor.summernote('code');
    this.shared.updateNote(this.note.id, this.note).subscribe(
      (res) => {
        this.confirmEvent.emit();
        this.closeMeEvent.emit();
      },
      (e) => {
        this.errors = createErrorMessage(e);
      }
    );
  }
}
