import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }
  registerUser() {
    console.log('Register');
  }
}
