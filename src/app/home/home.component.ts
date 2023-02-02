import { Component } from '@angular/core';
import * as config from 'src/config'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  config = config
  open() {
    window.open('https://www.instagram.com/github.gitam/')
  }
}
