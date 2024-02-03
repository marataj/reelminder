import { Component } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrl: './group-list.component.css'
})
export class GroupListComponent {
  constructor(private http: SharedService) {}

  groupList: any[]

  ngOnInit(): void {
    this.getGroups()
  }

  getGroups() {
    this.http.getGroupList().subscribe((data) => {
      this.groupList = data
    })
  }

}
