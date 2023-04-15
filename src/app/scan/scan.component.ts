import { Component, OnInit } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { CommonService } from '../services/common.service';
import { HttpClient } from '@angular/common/http';
import * as config from 'src/config'


@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.scss']
})
export class ScanComponent implements OnInit {

  allowedFormats = [BarcodeFormat.QR_CODE]
  registrations: any
  eventData = this.commonService.eventData

  constructor(private commonService: CommonService, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.post(`${config.endpoint}/get-registrations`, { $eid: this.eventData.eid }).subscribe({
      next: (res: any) => {
        this.registrations = res
      },
      error: (err) => {
        alert(err.error)
      }
    })
  }

  scanSuccessHandler(qr: string) {
    if (!qr.includes('|'))
      return alert('Invalid QR')
    else if (qr.split('|')[0] != this.eventData.slug)
      return alert('Mismatched events')
    const username = qr.split('|')[1]
    const result = this.registrations.filter((registration: any) => { return registration.username == username })
    if (result.length == 1) alert('Registerd')
    else alert('Not register for the event')
  }

}


