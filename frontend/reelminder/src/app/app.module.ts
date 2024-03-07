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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupThumbnailComponent } from './group-thumbnail/group-thumbnail.component';
import { AddEditGroupComponent } from './add-edit-group/add-edit-group.component';
import { ModalComponent } from './modal/modal.component';
import { FooterComponent } from './footer/footer.component';
import { RegistrationComponent } from './authentication/registration/registration.component';
import { LoginComponent } from './authentication/login/login.component';
import { AuthenticateComponent } from './authentication/authenticate/authenticate.component';

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
    AddEditGroupComponent,
    ModalComponent,
    FooterComponent,
    RegistrationComponent,
    LoginComponent,
    AuthenticateComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
