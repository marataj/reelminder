import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-group-thumbnail',
  templateUrl: './group-thumbnail.component.html',
  styleUrl: './group-thumbnail.component.css'
})
export class GroupThumbnailComponent {
  

@Input() group: any;
@Output() refreshGroup = new EventEmitter<any>();

constructor(private shared: SharedService) {}

deleteGroup(){
  this.shared.deleteGroup(this.group.id).subscribe(res => {
    this.refreshGroup.emit();
  })
}
}
