import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterLink } from '@angular/router';
import { ModalModel } from '../../modal/modal.model';

import { createErrorMessage } from '../../shared/utils';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  @Output() notificationEvent = new EventEmitter<ModalModel>();
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      password2: new FormControl(),
    });
  }
  registerUser() {
    this.authService.register(this.registerForm.getRawValue()).subscribe(
      (res) => {
        this.registerForm.reset();
        this.notificationEvent.emit({
          title: 'Registered successfully !',
          body_icone: 'created',
          timeout_ms: 5000,
        });
      },
      (e) => {
        
        let err_msg = createErrorMessage(e);
        if (e.statusText != 'Bad Request') {
          err_msg = e.name;
        }
        this.notificationEvent.emit({
          title: 'Error during registration!',
          body: err_msg,
          timeout_ms: 5000,
        });
      }
    );
  }
}
