import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

import * as moment from 'moment-timezone';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  year;

  constructor(public authService: AuthService, private router: Router) {
    moment.tz.link('America/Argentina/Buenos_Aires|America/Buenos_Aires');
   }

  ngOnInit() {
    this.year = moment().year();
  }
  logOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
