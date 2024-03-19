import { Routes } from '@angular/router';
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {HomeComponent} from "./pages/home/home.component";
import {authGuard} from "./guard/auth.guard";
import {PersonalComponent} from "./pages/personal/personal.component";
import {TeamComponent} from "./pages/team/team.component";
import {CreateComponent} from "./pages/team/create/create.component";

export const routes: Routes = [
  { path: '', component: DashboardComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'home', component: HomeComponent, canActivate: [authGuard]},
  { path: 'team/:id', component: TeamComponent, canActivate: [authGuard]},
  { path: 'home/create', component: CreateComponent, canActivate: [authGuard]}
];
