import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as config from 'src/config'
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  spinner = false
  userdata = this.commonService.eventData
  eventData = this.commonService.eventData

  formData = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(private httpClient: HttpClient, private router: Router, private commonService: CommonService) { }

  register() {
    if (!this.formData.valid) return
    this.spinner = true
    const data = {
      stall: this.userdata.username,
      username: this.formData.controls.username.value,
      password: this.formData.controls.password.value,
      event: this.eventData.name
    }
    this.httpClient.post(config.endpoint + '/register', data).subscribe({
      next: (res: any) => {
        alert('Registration successful')
        this.spinner = false
        this.router.navigate([this.eventData.name + '/dashboard'])
      },
      error: (e) => {
        alert(e.error)
        this.spinner = false
      }
    })
  }


}
