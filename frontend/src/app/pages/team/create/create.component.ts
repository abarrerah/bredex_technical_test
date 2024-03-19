import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TeamsService} from "../../../services/teams.service";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TeamRequest} from "../../../auth/interface/team-request";

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {

  isChecked : boolean = false;
  createError: string = "";
  createTeamForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    foundationYear: new FormControl("", [Validators.required]),
    champions: new FormControl("", [Validators.required]),
    example: new FormControl(false),
  });
  constructor(private teamService: TeamsService, private router: Router, private formBuilder: FormBuilder) {
  }

  submit() {
    console.log(this.createTeamForm.value.example as unknown as TeamRequest);
    if (this.createTeamForm.valid) {
      console.log( this.createTeamForm.value.example);
      this.teamService.createTeam(this.createTeamForm.value as unknown as TeamRequest)
        .subscribe({
          next: (teamData) => {
          },
          error: (error) => {
            this.createError = error;
          },
          complete: () => {
            this.router.navigate(['home']);
            this.createTeamForm.reset();
          }
        });
    }
  }

}
