import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  userData: any
  eventDataUpdated: Subject<any> = new EventEmitter()
  eventData: any

  updateEvent(eventData: any) {
    this.eventData = eventData
    this.eventDataUpdated.next(eventData)
  }

}
