import { Component } from '@angular/core';
import {User} from "../../auth/interface/user";
import {NgIf} from "@angular/common";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './personal.component.html',
  styleUrl: './personal.component.css'
})
export class PersonalComponent {
  errorMessage: String = "";
  user?: User;

  constructor(private userService: UserService) {
    this.userService.getUser(1).subscribe({
      next: (userData) => {
        this.user = userData;
      },
      error: (errorData) => {
        this.errorMessage = errorData;
    },
      complete: () => {
        console.info("user Data ok");
    }
    });
  }

}
