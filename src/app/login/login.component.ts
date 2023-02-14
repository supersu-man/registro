import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import * as config from 'src/config'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  spinner = false
  config = config

  formData = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit(): void { }

  login() {
    if (!this.formData.valid) return
    this.spinner = true
    const username = this.formData.controls.username.value?.toLowerCase()
    const password = this.formData.controls.password.value?.toString()
    this.httpClient.post(environment.endpoint + '/login', { 'username': username, 'password': password }).subscribe({
      next: (res: any) => {
        localStorage.setItem('userdata', JSON.stringify(res))
        this.router.navigate(['dashboard'])
        this.spinner = false
      },
      error: (e) => {
        alert(e.error)
        this.spinner = false
      }
    })
  }

 

}
