import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from '../shared.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-group',
  templateUrl: './add-edit-group.component.html',
  styleUrl: './add-edit-group.component.css'
})
export class AddEditGroupComponent implements OnInit {
  
  @ViewChild('f') groupForm: NgForm;

  constructor(private shared: SharedService, private router: Router){}

  courseList : any[] = [];
  pickedCourses: number[] = [];

  ngOnInit(): void {
    this.shared.getCourseList().subscribe(res=>{
      res.forEach(elem => {
        if(elem.group == null){
          this.courseList.push(elem);
        }
      })
    })
  }
  
  pickCourse(event:any, course:any){
    if(event.target.checked){
      this.pickedCourses.push(course.id);
    }
    else{
      this.pickedCourses.splice(this.pickedCourses.indexOf(course.id))
    }
  }

  groupFormSubmit(){
    let formData = {"group": {
      "title": this.groupForm.form.value.group_title,
      "description": this.groupForm.form.value.group_description,
      "is_public": true,
      "author": this.groupForm.form.value.group_author
    },
    "picked_courses": this.pickedCourses}

    this.shared.createGroup(formData).subscribe(res=>{
      this.router.navigate(["groups"]);
    })
  }
}
