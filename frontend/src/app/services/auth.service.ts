import { Injectable } from '@angular/core';
import {LoginRequest} from "../auth/interface/login-request";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError, BehaviorSubject, tap, map} from "rxjs";
import {User} from "../auth/interface/user";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private static loggedUser: boolean = false;

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<String> = new BehaviorSubject<String>("");
  constructor(private http: HttpClient) {
    this.currentUserLoginOn = new BehaviorSubject<boolean>(sessionStorage.getItem("token") != null);
    this.currentUserData = new BehaviorSubject<String>(sessionStorage.getItem("token") || "");
  }

  static isAuthorized() {
    return AuthService.loggedUser;
  }

  login(credentials: LoginRequest): Observable<any> {
    return this.http.post<any>(environment.urlHost + "auth/login", credentials)
      .pipe(
        tap( (userData) => {
          sessionStorage.setItem("token", userData.token);
          this.currentUserData.next(userData);
          this.currentUserLoginOn.next(true);
        }),
        map((userData) => userData.token),
        catchError(this.handleError)
      );
  }

  logout():void {
    sessionStorage.removeItem("token");
    this.currentUserLoginOn.next(false);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
        console.error("Something went wrong " + error.error);
    } else {
      console.error("Error " + error.status + " " + error.error);
    }

    return throwError(() => new Error("Something went wrong. Try it again."));
  }

  get userData(): Observable<String> {
    return this.currentUserData.asObservable();
  }

  get userLoginOn(): Observable<boolean> {
    return this.currentUserLoginOn.asObservable();
  }
}
