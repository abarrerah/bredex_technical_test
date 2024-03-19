import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {TeamsService} from "../../services/teams.service";
import {Team} from "../../auth/interface/team";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {TeamRequest} from "../../auth/interface/team-request";

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent implements OnInit, OnDestroy{
  private routeSub: Subscription | undefined;
  private objectId:number = 0;
  protected team: Team | undefined;

  teamForm = this.formBuilder.group(this.getFormBuilderParameters());

  constructor(private route: ActivatedRoute, private teamService: TeamsService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(
      params => {
        this.objectId = params['id'];
        this.teamService.team(this.objectId).subscribe(
          (response) => {
            this.team = response;
          }
        );
      }
    );
  }

  modify() {
    if(this.teamForm.valid && !this.allNullValues(this.teamForm.value)) {
      this.teamService.modifyTeam(this.teamForm.value as unknown as Team);
    } else {
      alert("Nothing has been modified");
    }
  }

  private allNullValues(obj: { [key: string]: any }): boolean {
    return Object.values(obj).every(value => value === null);
  }

  private getFormBuilderParameters():any {
    return {
      name: [this.team?.name, [Validators.maxLength(25), Validators.minLength(4)]],
      foundationYear: [this.team?.foundationYear],
      champions: [this.team?.champions],
      paidEntryFee: [this.team?.paidEntryFee]
    }
  }

  ngOnDestroy() {
    this.routeSub?.unsubscribe();
  }

}
