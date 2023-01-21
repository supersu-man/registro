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

  constructor(private httpClient: HttpClient) { }



  scanSuccessHandler(qr: string) {
    this.spinner = true
    if(!qr.startsWith('eyJ1c2Vybm')){
      this.spinner = false
      alert('Invalid E-Pass')
      return
    }
    const body = {
      auth: qr
    }
    this.httpClient.post(environment.endpoint + '/scan', body).subscribe({
      next: (res: any) => {
        this.spinner = false
        alert(res.message)
      },
      error: (err) => {
        this.spinner = false
        alert('Error has occured')
      }
    })
  }
}


