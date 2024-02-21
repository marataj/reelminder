import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';

declare var window: any;

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private componentRef!: ComponentRef<any>;
  private componentSubscriber!: Subject<any>;
  modal: any;

  constructor() {}

  openModal(entry: ViewContainerRef, params: object, component: any) {
    this.componentRef = entry.createComponent(component);
    this.componentRef.instance.params = params;
    this.componentRef.instance.closeMeEvent.subscribe(() => this.closeModal());
    this.componentRef.instance.confirmEvent.subscribe(($event) =>
      this.confirm($event)
    );
    this.componentSubscriber = new Subject<any>();
    this.modal = new window.bootstrap.Modal(
      document.getElementById('exampleModal')
    );
    this.modal.show();
    return this.componentSubscriber.asObservable();
  }

  closeModal() {
    this.modal.hide();
    this.componentSubscriber.complete();
    this.componentRef.destroy();
  }

  confirm(event) {
    this.componentSubscriber.next({ type: 'confirm', event: event });
    this.closeModal();
  }
}
