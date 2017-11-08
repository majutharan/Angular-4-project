import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {AuthenticationService} from '../_services/index';


@Component({
  templateUrl: 'login.component.html',
  providers: [AuthenticationService],
  styleUrls: ['login.style.css']
})


export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  public alerts: any = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(
        data => {
          console.log(data);
          this.check(data);
          /*this.router.navigate([this.returnUrl]);*/
          // this.router.navigate([this.returnUrl]);
        },
        error => {
          console.log('error');
          console.log(error);
          if (error.status === 0) {
            this.alerts.push({
              type: 'danger',
              msg: 'Oops! Server Down!. Please try again later.',
              timeout: 2000
            });
          } else {
            this.loadError();
          }
          this.loading = false;
        });
  }

  loadError() {
    this.alerts.push({
      type: 'danger',
      msg: `Login Failed. Username and password is wrong`,
      timeout: 2000
    });

  }

  check(data) {
    if (data.username == null) {
      console.log('mandin');
      this.loadError();
      this.loading = false;
    }
    this.router.navigate([this.returnUrl]);
  }
}


