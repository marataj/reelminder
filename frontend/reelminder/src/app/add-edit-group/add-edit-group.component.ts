import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { SharedService } from '../shared.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-group',
  templateUrl: './add-edit-group.component.html',
  styleUrl: './add-edit-group.component.css',
})
export class AddEditGroupComponent implements OnInit {
  courseList: any[] = [];
  pickedCourses: number[] = [];
  edited_group: any;
  @Output() closeMeEvent = new EventEmitter();
  @Output() confirmEvent = new EventEmitter();
  @Input() params: any;

  @ViewChild('f') groupForm: NgForm;

  constructor(
    private shared: SharedService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let groupId = this.params['id'];
    if (groupId) {
      this.shared.getGroupById(groupId).subscribe((res) => {
        this.edited_group = res;
      });
    }

    this.shared.getCourseList().subscribe((res) => {
      res.forEach((elem) => {
        if (elem.group == null) {
          this.courseList.push(elem);
        }
        if (this.edited_group && elem.group == this.edited_group.id) {
          this.courseList.push(elem);
          this.pickedCourses.push(elem.id);
        }
      });
    });
  }

  pickCourse(event: any, course: any) {
    if (event.target.checked) {
      this.pickedCourses.push(course.id);
    } else {
      this.pickedCourses.splice(this.pickedCourses.indexOf(course.id), 1);
    }
  }

  groupFormSubmit() {
    let formData = {
      group: {
        title: this.groupForm.form.value.group_title,
        description: this.groupForm.form.value.group_description,
        is_public: true,
        author: this.groupForm.form.value.group_author,
      },
      picked_courses: this.pickedCourses,
    };

    if (this.edited_group) {
      this.shared
        .updateGroup(this.edited_group.id, formData)
        .subscribe((res) => {
          this.confirmEvent.emit();
          this.closeMeEvent.emit();
          this.router.navigate(['groups']);
        });
    } else {
      this.shared.createGroup(formData).subscribe((res) => {
        this.confirmEvent.emit();
        this.closeMeEvent.emit();
        this.router.navigate(['groups']);
      });
    }
  }
}
