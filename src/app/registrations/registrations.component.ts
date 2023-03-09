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

  reg: any
  stall: any
  searchKey = ''

  eventData = this.commonService.eventData

  constructor(private httpClient: HttpClient, private commonService: CommonService) { }

  ngOnInit() {
    this.httpClient.post(`${config.endpoint}/registrations`, { event: this.eventData.name }).subscribe({
      next: (res: any) => {
        this.reg = res.reg
        this.stall = res.stall
      },
      error: (err) => {
        alert(err.error)
      }
    })
  }

}
