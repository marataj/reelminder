import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../authentication/auth.service';
import { SharedService } from '../shared.service';
import { createErrorMessage } from '../shared/utils';
import { ModalService } from '../shared/modal.service';
import { ModalComponent } from '../modal/modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css',
})
export class FeedbackComponent implements OnInit, OnDestroy {
  @ViewChild('f') feedbackForm: NgForm;
  @ViewChild('modal', { read: ViewContainerRef })
  entry!: ViewContainerRef;
  sub!: Subscription;

  isAuthenticated = false;
  user_email = null;
  userSub = new Subscription();
  errors: string = '';
  content: string = '';

  constructor(
    private authService: AuthService,
    private shared: SharedService,
    private modalService: ModalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
      this.user_email = !!user ? user.email : null;
    });
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }

  courseFormSubmit() {
    this.errors = '';

    let feedback = {
      email: this.feedbackForm.form.value.email,
      content: this.content,
    };

    this.shared.sendFeedback(feedback).subscribe(
      (res) => {
        this.content = '';
        let params = {
          title:
            'Thanks for your feedback! We really appreciate it and will use it to improve.',
          body_icone: 'check',
          timeout_ms: 5000,
        };
        this.sub = this.modalService
          .openModal(this.entry, params, ModalComponent)
          .subscribe((v) => {
            this.router.navigate(['']);
          });
      },
      (e) => {
        this.errors = createErrorMessage(e);
      }
    );
  }
}
