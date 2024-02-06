import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-group-thumbnail',
  templateUrl: './group-thumbnail.component.html',
  styleUrl: './group-thumbnail.component.css'
})
export class GroupThumbnailComponent implements OnInit {
  

@Input() group: any;
@Output() refreshGroups = new EventEmitter<any>();
video_num:number =0
constructor(private shared: SharedService) {}

ngOnInit(): void {
  this.shared.getCourseListByGroupId(this.group.id).subscribe(res=>{
    this.video_num=res.length
  })
}

deleteGroup(){
  this.shared.deleteGroup(this.group.id).subscribe(res => {
    this.refreshGroups.emit();
  })
}
}
