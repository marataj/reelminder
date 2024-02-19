import { getLocaleDateTimeFormat } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { SharedService } from '../shared.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { share } from 'rxjs';

@Component({
  selector: 'app-add-edit-course',
  templateUrl: './add-edit-course.component.html',
  styleUrl: './add-edit-course.component.css',
})
export class AddEditCourseComponent implements OnInit {
  constructor(
    private shared: SharedService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  img_id: string;
  groups: any[] = [];
  edited_course: any;
  defaultGroup: any;
  meta: any;
  @Output() closeMeEvent = new EventEmitter();
  @Output() confirmEvent = new EventEmitter();
  @Input() params: any;

  @ViewChild('f') courseForm: NgForm;
  // TODO: change form binding type. Now default values, during course editing are related to the this.edited_course object. If the page is showed in the `new course` context, the this.edited_course is undefined
  ngOnInit(): void {
    let defaultGroupId = this.params['defaultGroupId'];
    if (defaultGroupId) {
      this.shared.getGroupById(defaultGroupId).subscribe((res) => {
        this.defaultGroup = res;
      });
    } else {
      this.shared.getGroupList().subscribe((res) => {
        this.groups = res;
      });
    }
    let edited_course_id = this.params['id'];
    if (edited_course_id) {
      this.shared.getCourseById(edited_course_id).subscribe((res) => {
        this.edited_course = res;
        this.img_id = this.edited_course.movie_id;
      });
    }
  }

  courseFormSubmit() {
    let course_title = this.courseForm.form.value.course_title;
    let course_description = this.courseForm.form.value.course_description;
    let course_author = this.courseForm.form.value.course_author;
    let course_video_link = this.courseForm.form.value.course_video_link;
    let group = this.defaultGroup
      ? this.defaultGroup.id
      : this.courseForm.form.value.assigned_group;
    let creation_date = new Date();

    let course = {
      title: course_title,
      description: course_description,
      author: course_author,
      movie_id: course_video_link.split('v=')[1].substring(0, 11),
      creation_date: this.edited_course
        ? this.edited_course.creation_date
        : creation_date,
      is_public: true,
      progress_sec: this.edited_course ? this.edited_course.progress_sec : 0,
      group: group,
    };
    if (this.edited_course) {
      this.shared
        .updateCourse(this.edited_course.id, course)
        .subscribe((res) => {
          this.router.navigate(['course', res.id]);
        });
    } else {
      this.shared.createCourse(course).subscribe((res) => {
        this.router.navigate(['course', res.id]);
      });
    }
    this.confirmEvent.emit();
    this.closeMeEvent.emit();
  }

  videoLinkChanged() {
    this.img_id = this.retrieveVideoId(
      this.courseForm.form.value.course_video_link
    );
  }

  generate_yt_link(movie_id: string) {
    return `https://www.youtube.com/watch?v=${movie_id}`;
  }

  getVideoMeta() {
    let id = this.retrieveVideoId(this.courseForm.form.value.course_video_link);
    this.shared.getYtVideoMeta(id).subscribe((res) => {
      let meta = JSON.parse(res);
      this.courseForm.form.controls.course_title.setValue(meta.title);
      this.courseForm.form.controls.course_description.setValue(
        meta.description
      );
    });
  }

  retrieveVideoId(link: string) {
    return link.split('v=')[1].substring(0, 11);
  }
}
