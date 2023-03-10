import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as config from 'src/config'

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent {

  stall: string[] = []
  spinner = false

  formData = new FormGroup({
    name: new FormControl('', Validators.required),
    desc: new FormControl('', Validators.required),
    club_name: new FormControl('', Validators.required),
    stall: new FormControl(this.stall),
    date: new FormControl('', Validators.required),
    cost: new FormControl('', Validators.required),
    reg: new FormControl([]),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(private httpClient: HttpClient) { }

  add_account(target: any) {
    if (this.stall.length == 5) alert('Only 5 Admin accounts allowed')
    else if (target.value.trim() == '') alert('Admin account cannot be empty')
    else this.stall.push(target.value.trim())
    target.value = ''
  }

  add_event() {
    if (!this.formData.valid) {
      alert('Fill the form')
      return
    }
    this.spinner = true
    this.httpClient.post(config.endpoint + '/add-event', this.formData.getRawValue()).subscribe({
      next: (res) => {
        this.spinner = false
        this.formData.reset()
        alert('Event added successfully')
      },
      error: (err) => {
        this.spinner = false
        alert(err.error)
      }
    })
  }

}
