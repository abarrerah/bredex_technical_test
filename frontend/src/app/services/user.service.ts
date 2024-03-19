import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {User} from "../auth/interface/user";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  getUser(id:number):Observable<User>{
    return this.http.get<User>(environment.urlApi + "user/1").pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('There is an error', error.error);
    }
    else{
      console.error('Backend returned  ', error.status, error.error);
    }
    return throwError(()=> new Error('Something went wrong. Retry it later'));
  }
}
