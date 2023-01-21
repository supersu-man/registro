import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  spinner = false

  formData = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(private httpClient: HttpClient, private router: Router) { }
  
  ngOnInit(): void {
  }

  register() {
    if (!this.formData.valid) return
    this.spinner = true
    const data = {
      auth: localStorage.getItem('auth'),
      s_username: this.formData.controls.username.value as string,
      s_password: this.formData.controls.password.value as string,
    }
    this.httpClient.post(environment.endpoint + '/register', data).subscribe({
      next: (res: any) => {
        if (!res.error) {
          alert('Registration successful')
          this.router.navigate(['dashboard'])
        } else {
          alert(res.message)
        }
        this.spinner = false
      },
      error: (e) => {
        alert('Error occured')
        this.spinner = false
      }
    })
  }


}
