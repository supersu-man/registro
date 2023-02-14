import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as config from 'src/config'

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.scss']
})
export class RegistrationsComponent implements OnInit {

  data: undefined
  searchKey = ''

  userdata = JSON.parse(localStorage.getItem('userdata')!)

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.httpClient.post(`${config.endpoint}/registrations`, { username: this.userdata.username, password: this.userdata.password }).subscribe({
      next: (res: any) => {
        this.data = res
      },
      error: (err) => {
        alert(err.error)
      }
    })
  }

}
