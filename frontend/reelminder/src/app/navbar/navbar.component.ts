import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { AuthService } from '../authentication/auth.service';
import { Subscription } from 'rxjs';
import { ModalService } from '../shared/modal.service';
import { ModalComponent } from '../modal/modal.component';
import { BuyCofeeComponent } from '../buy-cofee/buy-cofee.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  isAuthenticated = false;
  username: string;
  userSub = new Subscription();
  @ViewChild('modal', { read: ViewContainerRef })
  entry!: ViewContainerRef;
  sub!: Subscription;

  constructor(
    private authService: AuthService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
      this.username = !!user ? user.username : null;
    });
  }

  onLogout() {
    this.authService.logout();
  }

  buyCofee(params: any) {
    this.sub = this.modalService
      .openModal(this.entry, params, BuyCofeeComponent)
      .subscribe((v) => {});
  }
}
