import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as config from 'src/config'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  spinner = false
  userdata = JSON.parse(localStorage.getItem('userdata')!)
  config = config

  formData = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(private httpClient: HttpClient, private router: Router) { }

  register() {
    if (!this.formData.valid) return
    this.spinner = true
    const data = {
      username: this.userdata.username,
      password: this.userdata.password,
      s_username: this.formData.controls.username.value?.toLowerCase(),
      s_password: this.formData.controls.password.value?.toString(),
    }
    this.httpClient.post(config.endpoint + '/register', data).subscribe({
      next: (res: any) => {
        alert('Registration successful')
        this.spinner = false
        this.router.navigate(['dashboard'])
      },
      error: (e) => {
        alert(e.error)
        this.spinner = false
      }
    })
  }


}
