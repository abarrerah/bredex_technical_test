import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError, map, Observable, tap, throwError} from "rxjs";
import {Team} from "../auth/interface/team";
import {AuthService} from "./auth.service";
import {TeamRequest} from "../auth/interface/team-request";

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  teamModel: Team | undefined;
  private teamId: number = 0;

  constructor(private http: HttpClient) { }

  teams():Observable<Team[]>{
    return this.http.get(environment.urlApi + "team/all")
      .pipe(
        map(response => {
          return Object.values(response);
        }),
        catchError(this.handleError)
      );
  }

  team(id:number): Observable<Team> {
    this.teamId = id;
    return this.http.get<Team>(environment.urlApi + "team/" + id) ;
  }

  modifyTeam(team: Team) {
    this.teamModel = team;
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const body = new HttpParams();
    body.set('id', this.teamId);
    if (this.teamModel.name != null) {
      body.set('name', this.teamModel.name.toString())
    }
    if (this.teamModel.champions != null) {
      body.set('champions', this.teamModel.champions.toString())
    }
    if (this.teamModel.foundationYear != null) {
      body.set('foundationYear', this.teamModel.foundationYear.toString())
    }
    if (this.teamModel.paidEntryFee != null) {
      body.set('paidEntryFee', this.teamModel.paidEntryFee.toString())
    }

    return this.http.post<any>(environment.urlApi + "team/update",
      body, { headers: headers});
  }

  createTeam(credentials: TeamRequest): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    let body = {
        "name" : credentials.name,
        "foundationYear": credentials.foundationYear,
        "champions": credentials.foundationYear,
        "paidEntryYear": credentials.entryPaidFee
    };
    return this.http.post<any>(environment.urlApi + "team/create", body, { headers: headers} )
      .pipe(
        catchError(this.handleError)
      );
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
