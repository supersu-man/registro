import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEventComponent } from './add-event/add-event.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventsComponent } from './events/events.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegistrationsComponent } from './registrations/registrations.component';
import { ScanComponent } from './scan/scan.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add-event', component: AddEventComponent },
  { path: 'events', component: EventsComponent },
  { path: ':event/login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: ':event/dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: ':event/scan', component: ScanComponent, canActivate: [AuthGuard] },
  { path: ':event/register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: ':event/registrations', component: RegistrationsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
