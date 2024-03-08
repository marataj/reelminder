import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authentication/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  isAuthenticated = false;
  username: string;
  userSub = new Subscription();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
      this.username = user.username;
    });
  }
}
