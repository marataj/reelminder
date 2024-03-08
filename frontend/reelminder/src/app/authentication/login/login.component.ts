import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ModalModel } from '../../modal/modal.model';
import { Router } from '@angular/router';
import { exhaustMap, take } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  @Output() notificationEvent = new EventEmitter<ModalModel>();
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
    });
  }

  login() {
    this.authService.login(this.loginForm.getRawValue()).subscribe(
      (res) => {
        this.loginForm.reset();
        this.authService.handleAuthentication(res);
        this.router.navigate(['courses']);
      },
      (error) => {
        this.loginForm.reset();
        if (error.statusText == 'Unauthorized') {
          this.notificationEvent.emit({
            title: 'Wrong credentials',
            body_icone: 'stop',
            timeout_ms: 5000,
          });
        } else {
          this.notificationEvent.emit({
            title: 'Login error',
            body_icone: error.error.detail,
            timeout_ms: 5000,
          });
        }
      }
    );
  }
}
