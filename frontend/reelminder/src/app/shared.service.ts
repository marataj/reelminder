import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {

 
  constructor(private httpClient: HttpClient) {
    
   }
   readonly APIUrl = "http://127.0.0.1:8000";

  getCourseList():Observable<any[]>{
    return this.httpClient.get<any[]>(this.APIUrl+"/course/");
  };

  


}
