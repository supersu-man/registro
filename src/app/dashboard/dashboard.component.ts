import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  spinner = false
  time = ''

  userdata = JSON.parse(localStorage.getItem('userdata')!)

  constructor(private router: Router) { }

  ngOnInit(): void {
    setInterval(() => {
      this.time = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    }, 1000)
  }

  logout() {
    localStorage.removeItem('userdata')
    this.router.navigate(['login'])
  }

}
