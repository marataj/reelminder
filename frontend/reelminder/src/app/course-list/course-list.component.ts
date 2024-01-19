import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from '../shared.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit {

  constructor(private http: SharedService, private route: ActivatedRoute) {}

  groupId: number = null;

  courseList: any[]

  ngOnInit(): void {
    if(this.route.snapshot.params["groupId"]){
      this.groupId = this.route.snapshot.params["groupId"]
    }
    this.getCourses()
  }

  getCourses() {
    if(!this.groupId){
      this.http.getCourseList().subscribe((data) => {
        this.courseList = data
      })
    }else{      
      let group_id = this.groupId;
      console.log(group_id);
      this.http.getCourseListByGroupId(group_id).subscribe((data) => {
        this.courseList = data
      })
    }
    
  }

}
