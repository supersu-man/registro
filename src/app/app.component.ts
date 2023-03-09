import { Component, OnInit } from '@angular/core';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'register-easy';
  eventData = {}

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    this.commonService.eventDataUpdated.subscribe({
      next: (eventData) => {
        this.eventData = eventData
        console.log(eventData)
      }
    })
  }

}
