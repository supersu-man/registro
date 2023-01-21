import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.scss']
})
export class ScanComponent implements OnInit {
  allowedFormats = [BarcodeFormat.QR_CODE]

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  scanSuccessHandler(qr: string) {
    const body = {
      auth: localStorage.getItem('auth'),
      data: qr
    }
    this.httpClient.post(environment.endpoint + '/scan', body).subscribe({
      next: (res: any) => {
        if (res.error) {
          alert(res.message)
        } else {
          alert('Transfer success')
        }
      },
      error: (err) => {
        alert('Error has occured')
      }
    })
  }
}


