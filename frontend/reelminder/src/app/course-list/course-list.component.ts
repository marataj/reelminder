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
  group:any;
  courseList: any[]
  groups:any={};

  ngOnInit(): void {
    if(this.route.snapshot.params["groupId"]){
      this.groupId = this.route.snapshot.params["groupId"]
      this.http.getGroupById(this.groupId).subscribe(res => {
        this.group = res;
        this.groups[this.group.id]=this.group
      })
    }
    else{
      this.http.getGroupList().subscribe(res=>{
        res.forEach(elem=>{
          this.groups[elem.id]=elem
        })
      })
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
      this.http.getCourseListByGroupId(group_id).subscribe((data) => {
        this.courseList = data
      })
    }
    
  }

}
