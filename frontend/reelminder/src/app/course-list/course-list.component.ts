import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { SharedService } from '../shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ModalService } from '../shared/modal.service';
import { ModalComponent } from '../modal/modal.component';
import { AddEditCourseComponent } from '../add-edit-course/add-edit-course.component';
@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css',
})
export class CourseListComponent implements OnInit, OnDestroy {
  constructor(
    private http: SharedService,
    private route: ActivatedRoute,
    private modalService: ModalService,
    private router: Router
  ) {}

  groupId: number = null;
  group: any;
  courseList: any[];
  groups: any = {};
  @ViewChild('modal', { read: ViewContainerRef })
  entry!: ViewContainerRef;
  sub!: Subscription;

  ngOnInit(): void {
    if (this.route.snapshot.params['groupId']) {
      this.groupId = this.route.snapshot.params['groupId'];
      this.http.getGroupById(this.groupId).subscribe((res) => {
        this.group = res;
        this.groups[this.group.id] = this.group;
      });
    } else {
      this.http.getGroupList().subscribe((res) => {
        res.forEach((elem) => {
          this.groups[elem.id] = elem;
        });
      });
    }

    this.getCourses();
  }

  getCourses() {
    if (!this.groupId) {
      this.http.getCourseList().subscribe((data) => {
        this.courseList = data;
      });
    } else {
      let group_id = this.groupId;
      this.http.getCourseListByGroupId(group_id).subscribe((data) => {
        this.courseList = data;
      });
    }
  }

  createCourseModal(params: any) {
    this.sub = this.modalService
      .openModal(this.entry, params, AddEditCourseComponent)
      .subscribe((v) => {
        this.getCourses();
        setTimeout(() => {
          this.CreatedCourseModal(v.event.course);
        }, 100);
      });
  }

  CreatedCourseModal(course) {
    let params = {
      title: `Course created succesfully! Click button to open!`,
      body_icone: 'created',
      button_icone: 'play',
      timeout_ms: 5000,
    };
    this.sub = this.modalService
      .openModal(this.entry, params, ModalComponent)
      .subscribe((v) => {
        this.router.navigate(['course', course.id]);
      });
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}
