import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent implements OnInit, OnDestroy {
  constructor() {}

  @Input() params: any;
  body: string;
  title: string;
  timeout_ms: number;
  confirm_text: string;
  @Output() closeMeEvent = new EventEmitter();
  @Output() confirmEvent = new EventEmitter();
  ngOnInit(): void {
    this.body = this.params.body;
    this.title = this.params.title;
    this.timeout_ms = this.params.timeout_ms;
    this.confirm_text = this.params.confirm_text
      ? this.params.confirm_text
      : 'confirm';

    if (this.timeout_ms) {
      setTimeout(() => {
        this.closeMe();
      }, this.timeout_ms);
    }
  }

  closeMe() {
    this.closeMeEvent.emit();
  }
  confirm() {
    this.confirmEvent.emit();
  }

  ngOnDestroy(): void {}
}
