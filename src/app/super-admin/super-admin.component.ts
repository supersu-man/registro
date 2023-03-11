import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as config from 'src/config';

@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.scss']
})
export class SuperAdminComponent implements OnInit {

  events: undefined
  admins: undefined
  loggedin = false

  formData = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  adminForm = new FormGroup({
    username: new FormControl('', Validators.required),
    club: new FormControl('', Validators.required)
  })

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void { }

  login() {
    if (!this.formData.valid) return
    this.httpClient.post(config.endpoint + '/super-admin', this.formData.getRawValue()).subscribe({
      next: (res: any) => {
        this.getEvents()
        this.getAdmins()
        this.loggedin = true
      },
      error: (e) => {
        alert(e.error)
      }
    })
  }

  addAdmin() {
    this.httpClient.post(config.endpoint + '/add-admin', this.adminForm.getRawValue()).subscribe({
      next: (res) => this.getAdmins(),
      error: (err) => alert(err.error)
    })
  }

  getEvents() {
    this.httpClient.get(config.endpoint + '/events').subscribe({
      next: (events: any) => this.events = events,
      error: (err) => alert(err.error)
    })
  }

  getAdmins() {
    this.httpClient.get(config.endpoint + '/admins').subscribe({
      next: (admins: any) => this.admins = admins,
      error: (err) => alert(err.error)
    })
  }

  removeEvent(event: any) {
    this.httpClient.post(config.endpoint + '/remove-event', { event: event }).subscribe({
      next: (res) => this.getEvents(),
      error: (err) => alert(err.error)
    })
  }

  removeAdmin(admin: any) {
    this.httpClient.post(config.endpoint + '/remove-admin', { admin: admin }).subscribe({
      next: (res) => this.getAdmins(),
      error: (err) => alert(err.error)
    })
  }

}
