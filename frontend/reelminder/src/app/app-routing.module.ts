import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseComponent } from './course/course.component';
import { HomeComponent } from './home/home.component';
import { AddEditCourseComponent } from './add-edit-course/add-edit-course.component';
import { GroupListComponent } from './group-list/group-list.component';
import { AddEditGroupComponent } from './add-edit-group/add-edit-group.component';
import { RegistrationComponent } from './authentication/registration/registration.component';
import { LoginComponent } from './authentication/login/login.component';
import { AuthenticateComponent } from './authentication/authenticate/authenticate.component';
import { isAuthenticated } from './authentication/auth-guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'courses/:groupId', component: CourseListComponent },
  {
    path: 'courses',
    component: CourseListComponent,
    canActivate: [isAuthenticated],
  },
  { path: 'groups', component: GroupListComponent },
  { path: 'course/add', component: AddEditCourseComponent },
  { path: 'course/add/:defaultGroupId', component: AddEditCourseComponent },
  { path: 'course/:id', component: CourseComponent },
  { path: 'course/:id/edit', component: AddEditCourseComponent },
  { path: 'group/add', component: AddEditGroupComponent },
  { path: 'group/:id/edit', component: AddEditGroupComponent },
  { path: 'auth/auth', component: AuthenticateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
