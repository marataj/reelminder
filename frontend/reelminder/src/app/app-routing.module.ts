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
import {
  isAuthenticated,
  isNotAuthenticated,
} from './authentication/auth-guard';
import { ChangePasswordComponent } from './authentication/change-password/change-password.component';
import { FeedbackComponent } from './feedback/feedback.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'feedback', component: FeedbackComponent },
  {
    path: 'courses',
    component: CourseListComponent,
    canActivate: [isAuthenticated],
  },
  {
    path: 'courses/:groupId',
    component: CourseListComponent,
    canActivate: [isAuthenticated],
  },
  {
    path: 'groups',
    component: GroupListComponent,
    canActivate: [isAuthenticated],
  },
  {
    path: 'course',
    canActivate: [isAuthenticated],
    children: [
      {
        path: 'add',
        component: AddEditCourseComponent,
      },
      {
        path: 'add/:defaultGroupId',
        component: AddEditCourseComponent,
      },
      {
        path: ':id',
        component: CourseComponent,
      },
      {
        path: ':id/edit',
        component: AddEditCourseComponent,
      },
    ],
  },
  {
    path: 'group',
    canActivate: [isAuthenticated],
    children: [
      {
        path: 'add',
        component: AddEditGroupComponent,
      },
      {
        path: ':id/edit',
        component: AddEditGroupComponent,
      },
    ],
  },

  {
    path: 'auth',
    children: [
      {
        path: 'auth',
        component: AuthenticateComponent,
        canActivate: [isNotAuthenticated],
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
        canActivate: [isAuthenticated],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
