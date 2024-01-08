import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit {

  constructor(private http: SharedService) {}

  courseList: any[]

  ngOnInit(): void {
    this.http.getCourseList().subscribe((data) => {
      this.courseList = data
      console.log(this.courseList)
    })
  }

}
