import {
  Component,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ModalService } from '../../shared/modal.service';
import { Subscription } from 'rxjs';
import { ModalComponent } from '../../modal/modal.component';
import { ModalModel } from '../../modal/modal.model';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrl: './authenticate.component.css',
})
export class AuthenticateComponent implements OnDestroy {
  constructor(private modalService: ModalService) {}
  @ViewChild('modal', { read: ViewContainerRef })
  entry!: ViewContainerRef;
  sub!: Subscription;

  registerModal(event: ModalModel) {
    console.log('lalal');
    let params = event;
    this.sub = this.modalService
      .openModal(this.entry, params, ModalComponent)
      .subscribe((v) => {});
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}
