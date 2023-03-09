import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as config from 'src/config'
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  spinner = false
  eventData = this.commonService.eventData

  formData = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    event: new FormControl(this.eventData.name, Validators.required)
  })

  constructor(private httpClient: HttpClient, private router: Router, private commonService: CommonService) { }

  login() {
    if (!this.formData.valid) return
    this.spinner = true
    this.httpClient.post(config.endpoint + '/login', this.formData.getRawValue()).subscribe({
      next: (res: any) => {
        localStorage.setItem('userdata', JSON.stringify(res))
        this.router.navigate([this.eventData.name + '/dashboard'])
        this.spinner = false
      },
      error: (e) => {
        alert(e.error)
        this.spinner = false
      }
    })
  }



}
