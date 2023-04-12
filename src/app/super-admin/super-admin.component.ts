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
  users: undefined
  clubs: undefined
  loggedin = true

  formData = new FormGroup({
    $username: new FormControl('', Validators.required),
    $password: new FormControl('', Validators.required)
  })

  clubForm = new FormGroup({
    $name: new FormControl('', Validators.required),
    $campus: new FormControl('All', Validators.required),
    $username: new FormControl('', Validators.required)
  })

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getUsers()
   }

  login() {
    if (!this.formData.valid) return
    this.httpClient.post(config.endpoint + '/super-admin', this.formData.getRawValue()).subscribe({
      next: (res: any) => {
        this.getEvents()
        this.getClubs()
        this.loggedin = true
      },
      error: (e) => {
        alert(e.error)
      }
    })
  }


  getUsers() {
    this.httpClient.get(config.endpoint + '/get-users').subscribe({
      next: (users: any) => {
        this.users = users;
        console.log(users);
      },
      error: (err) => alert(err.error)
    })
  }

  getEvents() {
    this.httpClient.get(config.endpoint + '/get-events').subscribe({
      next: (events: any) => this.events = events,
      error: (err) => alert(err.error)
    })
  }

  removeEvent(eid: any) {
    this.httpClient.post(config.endpoint + '/remove-event', { $eid: eid }).subscribe({
      next: (res) => this.getEvents(),
      error: (err) => alert(err.error)
    })
  }

  addClub() {
    this.httpClient.post(config.endpoint + '/add-club', this.clubForm.getRawValue()).subscribe({
      next: (res) => this.getClubs(),
      error: (err) => alert(err.error)
    })
  }

  getClubs() {
    this.httpClient.get(config.endpoint + '/get-clubs').subscribe({
      next: (clubs: any) => {
        this.clubs = clubs
        console.log(clubs)
      },
      error: (err) => alert(err.error)
    })
  }

  removeClub(cid: any) {
    this.httpClient.post(config.endpoint + '/remove-club', { $cid: cid }).subscribe({
      next: (res) => this.getClubs(),
      error: (err) => alert(err.error)
    })
  }

}
