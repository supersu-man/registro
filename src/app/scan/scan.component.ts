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
    if (!qr.startsWith('stall')) {
      alert('Invalid QR')
    } else {
      const body = {
        username: localStorage.getItem('username'),
        password: localStorage.getItem('password'),
        amt: 25,
        stall_id: qr
      }
      this.httpClient.post(environment.endpoint + '/scan', body).subscribe({
        next: (value: any) => {
          if (value.error == true) {
            alert(value.message)
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

  test() {
    const body = {
      username: localStorage.getItem('username'),
      password: localStorage.getItem('password'),
      amt: 25,
      stall_id: 'stall_1001'
    }
    this.httpClient.post(environment.endpoint + '/scan', body).subscribe({
      next: (value: any) => {
        if (value.error == true) {
          alert(value.message)
        } else {
          alert('Transfer success')
        }
      },
      error: (err) => {
        alert('Error has occured')
      },
      complete: () => {

      }
    })
  }

}
