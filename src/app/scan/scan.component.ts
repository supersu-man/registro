import { Component } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.scss']
})
export class ScanComponent {

  allowedFormats = [BarcodeFormat.QR_CODE]
  userdata = this.commonService.userData
  eventData = this.commonService.eventData

  constructor(private commonService: CommonService) { }

  scanSuccessHandler(qr: string) {
    if (!qr.includes('|')) {
      alert('Invalid QR')
      return
    } else if (qr.split('|')[0] != this.eventData.slug) {
      alert('Mismatched events')
      return
    }
    const reg = qr.split('|')[1]
    if (this.eventData.reg.includes(reg)) alert('Registerd')
    else alert('Not register for the event')
  }

}


