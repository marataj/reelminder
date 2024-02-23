import {
  Component,
  EventEmitter,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Input } from '@angular/core';
import { SharedService } from '../shared.service';
import { Subscription } from 'rxjs';
import { ModalService } from '../shared/modal.service';
import { AddEditCourseComponent } from '../add-edit-course/add-edit-course.component';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-course-thumbnail',
  templateUrl: './course-thumbnail.component.html',
  styleUrl: './course-thumbnail.component.css',
})
export class CourseThumbnailComponent {
  @Input() course: any;
  @Output() refreshCourse = new EventEmitter<any>();
  @Input() groupsNames: any;
  @ViewChild('modal', { read: ViewContainerRef })
  entry!: ViewContainerRef;
  sub!: Subscription;
  constructor(
    private shared: SharedService,
    private modalService: ModalService
  ) {}

  deleteCourse() {
    this.shared.deleteCourse(this.course.id).subscribe((res) => {
      this.refreshCourse.emit();
    });
  }

  deleteCourseModal() {
    let params = {
      title: `Are you sure to delete course "${this.course.title}"?`,
      body_icone: 'question',
      button_icone: `delete`,
    };
    this.sub = this.modalService
      .openModal(this.entry, params, ModalComponent)
      .subscribe((v) => {
        this.deleteCourse();
      });
  }

  editCourseModal(params: any) {
    this.sub = this.modalService
      .openModal(this.entry, params, AddEditCourseComponent)
      .subscribe((v) => {
        setTimeout(() => {
          this.refreshCourse.emit();
        }, 100);
      });
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}
