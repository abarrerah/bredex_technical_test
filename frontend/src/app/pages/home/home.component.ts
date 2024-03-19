import {Component, OnInit} from '@angular/core';
import {TeamsService} from "../../services/teams.service";
import {Team} from "../../auth/interface/team";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  protected teams:Team[] = [];
  constructor(protected teamService: TeamsService) {
  }
  ngOnInit() {
    this.teamService.teams().subscribe(
      (response) => {
        this.teams = response;
      }
    );
  }
}
