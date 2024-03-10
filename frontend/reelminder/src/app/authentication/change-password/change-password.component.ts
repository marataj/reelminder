import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ModalModel } from '../../modal/modal.model';
import { ModalComponent } from '../../modal/modal.component';
import { ModalService } from '../../shared/modal.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent {
  changePasswordForm: FormGroup;

  @ViewChild('modal', { read: ViewContainerRef })
  entry!: ViewContainerRef;
  sub!: Subscription;

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
  constructor(
    private authService: AuthService,
    private router: Router,
    private modalService: ModalService
  ) {}
  ngOnInit(): void {
    this.changePasswordForm = new FormGroup({
      new: new FormControl(),
      new2: new FormControl(),
      old: new FormControl(),
    });
  }
  registerModal(event: ModalModel) {
    let params = event;
    this.sub = this.modalService
      .openModal(this.entry, params, ModalComponent)
      .subscribe((v) => {});
  }
  changePassword() {
    this.changePasswordForm.reset();
    this.authService
      .changePassword(this.changePasswordForm.getRawValue())
      .subscribe(
        (res) => {
          this.registerModal({
            title: 'Password changed',
            body_icone: 'check',
            timeout_ms: 5000,
          });
        },
        (error) => {
          this.registerModal({
            title: 'Error',
            body_icone: 'stop',
            timeout_ms: 5000,
          });
        }
      );
  }
}
