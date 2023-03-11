import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ScanComponent } from './scan/scan.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { QrCodeModule } from 'ng-qrcode';
import { RegisterComponent } from './register/register.component';
import { RegistrationsComponent } from './registrations/registrations.component';
import { AddEventComponent } from './add-event/add-event.component';
import { EventsComponent } from './events/events.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    HomeComponent,
    ScanComponent,
    RegisterComponent,
    RegistrationsComponent,
    AddEventComponent,
    EventsComponent,
    SuperAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ZXingScannerModule,
    QrCodeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
