import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { BodyIcone, ButtonIcone, ModalModel } from './modal.model';

let BODY_ICONES = {
  created: `<i class="bi bi-bookmark-check"></i>`,
  question: `<i class="bi bi-question-circle"></i>`,
  info: `<i class="bi bi-info-circle"></i>`,
  stop: `<i class="bi bi-exclamation-triangle"></i>`,
  check: `<i class="bi bi-check-circle"></i>`,
};

let BUTTON_ICONES = {
  play: `<i class="bi bi-play-circle"></i>`,
  openGroup: `<i class="bi bi-collection-play"></i>`,
  delete: `<i class="bi bi-trash"></i>`,
  confirm: `<i class="bi bi-check-circle"></i>`,
};

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent implements OnInit, OnDestroy {
  constructor() {}

  @Input() params: ModalModel;

  body: string;
  title: string;
  timeout_ms: number;
  confirm_text: string;
  body_icone: BodyIcone;
  button_icone: ButtonIcone;
  timeout_id: any;

  @Output() closeMeEvent = new EventEmitter();
  @Output() confirmEvent = new EventEmitter();
  ngOnInit(): void {
    this.body = this.params.body;
    this.title = this.params.title;
    this.timeout_ms = this.params.timeout_ms;
    this.confirm_text = this.params.confirm_text
      ? this.params.confirm_text
      : 'confirm';
    this.body_icone = this.params.body_icone
      ? BODY_ICONES[this.params.body_icone]
      : null;
    this.button_icone = this.params.button_icone
      ? BUTTON_ICONES[this.params.button_icone]
      : null;
    if (this.timeout_ms) {
      this.timeout_id = setTimeout(() => {
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

  ngOnDestroy(): void {
    if (this.timeout_id) {
      clearTimeout(this.timeout_id);
    }
  }
}
