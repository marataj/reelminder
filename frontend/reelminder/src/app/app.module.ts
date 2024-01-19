import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CourseComponent } from './course/course.component';
import { SharedService } from './shared.service';
import { HttpClientModule } from '@angular/common/http';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseThumbnailComponent } from './course-thumbnail/course-thumbnail.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { NoteComponent } from './note/note.component';
import { AddEditCourseComponent } from './add-edit-course/add-edit-course.component';
import { FormsModule } from '@angular/forms';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupThumbnailComponent } from './group-thumbnail/group-thumbnail.component';
import { AddEditGroupComponent } from './add-edit-group/add-edit-group.component';

@NgModule({
  declarations: [
    AppComponent,
    CourseComponent,
    CourseListComponent,
    CourseThumbnailComponent,
    NavbarComponent,
    HomeComponent,
    NoteComponent,
    AddEditCourseComponent,
    GroupListComponent,
    GroupThumbnailComponent,
    AddEditGroupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
