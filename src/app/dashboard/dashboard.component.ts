import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  uiData = {
    fullname: '',
    regnumber: '',
    firstname: '',
    eventpass: '',
    spinner: false,
    time: '',
    dev: false
  }

  constructor(private router: Router, private httpClient: HttpClient, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getUserData()
    setInterval(() => {
      this.uiData.time = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    }, 1000)
  }

  getUserData() {
    this.httpClient.post(environment.endpoint + '/get-user-data', { auth: localStorage.getItem('auth') }).subscribe((res: any) => {
      if (!res.error) {
        if(res.dev) this.uiData.dev = true
        if (res.data.epass) this.uiData.eventpass = res.data.epass
        this.uiData.fullname = res.data.fullname
        this.uiData.firstname = res.data.fullname.split(' ')[0]
        console.log(res)
      } else {
        console.log(res.message)
      }
    })
  }

  goToScan() {
    this.router.navigate(['scan'])
  }


  logout() {
    localStorage.removeItem('auth')
    this.router.navigate(['login'])
  }

}
