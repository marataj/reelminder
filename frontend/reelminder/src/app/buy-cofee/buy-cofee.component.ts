import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-buy-cofee',
  templateUrl: './buy-cofee.component.html',
  styleUrl: './buy-cofee.component.css',
})
export class BuyCofeeComponent {
  @Output() closeMeEvent = new EventEmitter();
  @Output() confirmEvent = new EventEmitter();
}
