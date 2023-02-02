import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.scss']
})
export class ScanComponent {

  allowedFormats = [BarcodeFormat.QR_CODE]
  spinner = false
  checkin = true
  userdata = JSON.parse(localStorage.getItem('userdata')!)

  constructor(private httpClient: HttpClient) { }

  scanSuccessHandler(qr: string) {
    this.spinner = true
    const body = {
      qr: qr,
      checkin: this.checkin,
      username: this.userdata.username,
      password: this.userdata.password
    }
    this.httpClient.post(environment.endpoint + '/scan', body).subscribe({
      next: (res: any) => {
        this.spinner = false
        alert(res.message)
      },
      error: (e) => {
        this.spinner = false
        alert(e.error)
      }
    })
  }

}


