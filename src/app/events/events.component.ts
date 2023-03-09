import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import * as config from 'src/config'

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent {
  events: undefined
  constructor(private httpClient: HttpClient) {
    this.httpClient.get(config.endpoint + '/events').subscribe({
      next: (events: any) => this.events = events,
      error: (err) => { alert(err.error) }
    })
  }
}
