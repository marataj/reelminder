import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseComponent } from './course/course.component';
import { HomeComponent } from './home/home.component';
import { AddEditCourseComponent } from './add-edit-course/add-edit-course.component';
import { GroupListComponent } from './group-list/group-list.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'courses', component:CourseListComponent},
  {path:'groups', component:GroupListComponent},
  {path:'course/add', component:AddEditCourseComponent},
  {path:'course/:id', component:CourseComponent}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 



}
