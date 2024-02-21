import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { SharedService } from '../shared.service';
import { ModalService } from '../shared/modal.service';
import { Subscription } from 'rxjs';
import { AddEditGroupComponent } from '../add-edit-group/add-edit-group.component';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-group-thumbnail',
  templateUrl: './group-thumbnail.component.html',
  styleUrl: './group-thumbnail.component.css',
})
export class GroupThumbnailComponent implements OnInit {
  @Input() group: any;
  @Output() refreshGroups = new EventEmitter<any>();
  video_num: number = 0;
  @ViewChild('modal', { read: ViewContainerRef })
  entry!: ViewContainerRef;
  sub!: Subscription;
  constructor(
    private shared: SharedService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.shared.getCourseListByGroupId(this.group.id).subscribe((res) => {
      this.video_num = res.length;
    });
  }

  deleteGroup() {
    this.shared.deleteGroup(this.group.id).subscribe((res) => {
      this.refreshGroups.emit();
    });
  }

  deleteGroupeModal() {
    let params = {
      title: 'Are you sure?',
      body: `Are you sure to delete group "${this.group.title}"?`,
      confirm_text: `Delete`,
    };
    this.sub = this.modalService
      .openModal(this.entry, params, ModalComponent)
      .subscribe((v) => {
        this.deleteGroup();
      });
  }

  createGroupModal(params: any) {
    this.sub = this.modalService
      .openModal(this.entry, params, AddEditGroupComponent)
      .subscribe((v) => {
        setTimeout(() => {
          this.refreshGroups.emit();
        }, 100);
      });
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}
