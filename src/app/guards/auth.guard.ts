import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import * as config from 'src/config'
import { CommonService } from '../services/common.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private httpClient: HttpClient, private commonService: CommonService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const userdata: any = JSON.parse(localStorage.getItem('userdata')!) || undefined
    this.commonService.userData = userdata

    this.commonService.updateEvent(undefined)
    const event_name = route.paramMap.get('event') as string

    if (decodeURI(state.url) != `/${event_name}/login` && !userdata) {
      alert('User not signed in')
      this.router.navigate([`${event_name}/login`])
      return false
    }


    this.httpClient.post(config.endpoint + '/event', { event: event_name }).subscribe({
      next: (event: any) => {
        if (decodeURI(state.url) != `/${event.name}/login`) {
          if (decodeURI(state.url) != `/${event.name}/dashboard` && !event.stall.includes(userdata.username)) {
            alert('Only stall accounts are permitted')
            this.router.navigate([`${event.name}/dashboard`])
          } else if (!event.reg.includes(userdata.username) && !event.stall.includes(userdata.username)) {
            alert('User not registered for the event, register at stall')
            this.router.navigate([`${event.name}/login`])
          }
        }
        this.commonService.updateEvent(event)
      },
      error: (err) => {
        alert('Event doesnt exist')
        this.router.navigate([''])
      }
    })

    return true

  }
}
