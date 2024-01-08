import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-course-thumbnail',
  templateUrl: './course-thumbnail.component.html',
  styleUrl: './course-thumbnail.component.css'
})
export class CourseThumbnailComponent {
@Input() course: any;
}
