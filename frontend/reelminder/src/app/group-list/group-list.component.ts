import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { SharedService } from '../shared.service';
import { Subscription } from 'rxjs';
import { ModalService } from '../shared/modal.service';
import { AddEditGroupComponent } from '../add-edit-group/add-edit-group.component';
import { ModalComponent } from '../modal/modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrl: './group-list.component.css',
})
export class GroupListComponent implements OnInit, OnDestroy {
  constructor(
    private http: SharedService,
    private modalService: ModalService,
    private router: Router
  ) {}
  @ViewChild('modal', { read: ViewContainerRef })
  entry!: ViewContainerRef;
  sub!: Subscription;
  groupList: any[];

  ngOnInit(): void {
    this.getGroups();
  }

  getGroups() {
    this.http.getGroupList().subscribe((data) => {
      this.groupList = data;
    });
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }

  createGroupModal(params: any) {
    this.sub = this.modalService
      .openModal(this.entry, params, AddEditGroupComponent)
      .subscribe((v) => {
        this.getGroups();
        setTimeout(() => {
          this.CreatedGroupModal(v.event.group);
        }, 100);
      });
  }

  CreatedGroupModal(group) {
    let params = {
      title: `Group created succesfully! Click button to open!`,
      body_icone: 'created',
      button_icone: 'openGroup',
      timeout_ms: 5000,
    };
    this.sub = this.modalService
      .openModal(this.entry, params, ModalComponent)
      .subscribe((v) => {
        this.router.navigate(['courses', group.id]);
      });
  }
}
