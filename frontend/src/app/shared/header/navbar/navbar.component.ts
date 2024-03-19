import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {AuthService} from "../../../services/auth.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  protected userLogged:boolean = false;

  constructor(protected authService: AuthService) {
  }

  ngOnInit(): void  {
    this.authService.currentUserLoginOn
      .subscribe({
        next:(userLoginOn) => {
          this.userLogged = userLoginOn;
        }
    });
  }

  protected readonly AuthService = AuthService;
}
