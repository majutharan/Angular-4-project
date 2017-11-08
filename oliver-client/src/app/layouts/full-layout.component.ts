import {Component, OnInit} from '@angular/core';
import {User} from '../_models/user';
import {UserService} from '../_services/user.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html',
  providers: [UserService]

})
export class FullLayoutComponent implements OnInit {
  currentUser: User;
  public disabled = false;
  public status: { isopen: boolean } = {isopen: false};

  constructor(private userService: UserService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  ngOnInit(): void {
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
}
