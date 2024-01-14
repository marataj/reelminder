import { getLocaleDateTimeFormat } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-course',
  templateUrl: './add-edit-course.component.html',
  styleUrl: './add-edit-course.component.css'
})
export class AddEditCourseComponent {

  constructor(private shared:SharedService, private router:Router) {}
  img_id:string

  @ViewChild('f') courseForm: NgForm

  courseFormSubmit(){
    
    let course_title = this.courseForm.form.value.course_title;
    let course_description = this.courseForm.form.value.course_description;
    let course_author = this.courseForm.form.value.course_author;
    let course_video_link = this.courseForm.form.value.course_video_link;
    let creation_date = new Date();

    let course ={
      "title": course_title,
      "description": course_description,
      "author": course_author,
      "movie_id": course_video_link.split("v=")[1].substring(0, 11),
      "creation_date": creation_date,
      "is_public": true,
      "progress_sec": 0,
      "group": null
    }

    this.shared.createCourse(course).subscribe(res=>{
      this.router.navigate(["course", res.id])
    })

  }

  videoLinkChanged(){
    this.img_id=this.courseForm.form.value.course_video_link.split("v=")[1].substring(0, 11);
  }
}
