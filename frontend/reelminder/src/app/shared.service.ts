import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {

// TODO: add type of course and note 
  constructor(private httpClient: HttpClient) {
    
   }
   readonly APIUrl = "http://127.0.0.1:8000";

  getCourseList():Observable<any[]>{
    return this.httpClient.get<any[]>(this.APIUrl+"/course/");
  };
  getCourseListByGroupId(group_id: number):Observable<any[]>{
    return this.httpClient.get<any[]>(this.APIUrl+"/courses-by-group/"+group_id+"/");
  };

  createCourse(val: any):Observable<any>{
    return this.httpClient.post<any>(this.APIUrl+"/course/", val);
  }

  getCourseById(id: number):Observable<any[]>{
    return this.httpClient.get<any[]>(this.APIUrl+"/course/"+id+"/");
  };

  updateCourse(id: number, course: any):Observable<any[]>{
    return this.httpClient.put<any[]>(this.APIUrl+"/course/"+id+"/", course);
  };

  deleteCourse(id: number, ):Observable<any[]>{
    return this.httpClient.delete<any[]>(this.APIUrl+"/course/"+id+"/");
  };

  getNotesListByCourseId(course_id: number):Observable<any[]>{
    return this.httpClient.get<any[]>(this.APIUrl+"/note/"+course_id+"/");
  };

  createNote(course_id: number, note: any):Observable<any[]>{
    return this.httpClient.post<any[]>(this.APIUrl+"/note/"+course_id+"/", note);
  };

  deleteNote(id: number, ):Observable<any[]>{
    return this.httpClient.delete<any[]>(this.APIUrl+"/note/handle/"+id+"/");
  };

  getGroupList():Observable<any[]>{
    return this.httpClient.get<any[]>(this.APIUrl+"/group-list/");
  };

  createGroup(val: any):Observable<any>{
    return this.httpClient.post<any>(this.APIUrl+"/group/", val);
  }

  getGroupById(id: number):Observable<any[]>{
    return this.httpClient.get<any[]>(this.APIUrl+"/group/"+id+"/");
  };

  updateGroup(id: number, group: any):Observable<any[]>{
    return this.httpClient.put<any[]>(this.APIUrl+"/group/"+id+"/", group);
  };

  deleteGroup(id: number, ):Observable<any[]>{
    return this.httpClient.delete<any[]>(this.APIUrl+"/group/"+id+"/");
  };

}
