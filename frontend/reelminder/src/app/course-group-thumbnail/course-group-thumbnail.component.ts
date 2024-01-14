import { Component, EventEmitter, Output } from '@angular/core';
import { Input } from '@angular/core';
import { SharedService } from '../shared.service';
import { share } from 'rxjs';

@Component({
  selector: 'app-course-group-thumbnail',
  templateUrl: './course-group-thumbnail.component.html',
  styleUrl: './course-group-thumbnail.component.css'
})
export class CourseGroupThumbnailComponent {
@Input() course: any;
@Output() refreshCourse = new EventEmitter<any>();

constructor(private shared: SharedService) {}

deleteCourse(){
  this.shared.deleteCourse(this.course.id).subscribe(res => {
    this.refreshCourse.emit();
  })
}
}
