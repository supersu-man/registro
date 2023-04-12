import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as config from 'src/config'
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.scss']
})
export class RegistrationsComponent implements OnInit {

  registrations: any
  searchKey = ''

  eventData = this.commonService.eventData

  constructor(private httpClient: HttpClient, private commonService: CommonService) { }

  ngOnInit() {
    this.httpClient.post(`${config.endpoint}/get-registrations`, { $eid: this.eventData.eid }).subscribe({
      next: (res: any) => {
        console.log(res)
        this.registrations = res
      },
      error: (err) => {
        alert(err.error)
      }
    })
  }

}
