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
    const eventSlug = route.paramMap.get('event') as string

    //if user is not signed in, redirects to login
    if (state.url != `/${eventSlug}/login` && !userdata) {
      alert('User not signed in')
      this.router.navigate([`${eventSlug}/login`])
      return false
    }

    this.httpClient.post(config.endpoint + '/event-info', { $slug: eventSlug, $username: userdata?.username || '' }).subscribe({
      next: (event: any) => {
        if (!event.slug) this.router.navigate([`/events`])
        else if (state.url.endsWith('login')) { }
        else if (!state.url.endsWith(`dashboard`) && event.admin != userdata?.username)
          this.router.navigate([`${event.slug}/dashboard`])
        else if (event.admin != userdata?.username && event.username != userdata?.username) {
          alert('User not registered for the event, register at stall')
          this.router.navigate([`${event.slug}/login`])
        }
        this.commonService.updateEvent(event)
      },
      error: (err) => {
        alert(err.error)
        this.router.navigate([''])
      }
    })
    return true
  }
}
