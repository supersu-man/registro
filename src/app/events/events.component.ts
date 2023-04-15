import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as config from 'src/config'

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  events: undefined
  spinner = true
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get(config.endpoint + '/get-events').subscribe({
      next: (events: any) =>{
       this.events = events
       this.spinner = false
      },
      error: (err) => { 
        this.spinner = false
        alert(err.error) 
      }
    })
  }
}
