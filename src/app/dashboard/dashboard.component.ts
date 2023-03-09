import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  loading = true
  time = ''

  userdata = this.commonService.userData
  eventData = this.commonService.eventData

  constructor(private router: Router, private commonService: CommonService) { }

  ngOnInit(): void {
    setInterval(() => {
      this.time = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    }, 1000)
  }

  logout() {
    localStorage.removeItem('userdata')
    this.router.navigate([this.eventData.name+'/login'])
  }

}
