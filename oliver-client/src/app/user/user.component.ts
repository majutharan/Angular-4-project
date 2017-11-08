import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../_models/user';
import {UserService} from '../_services/user.service';
import {Router} from '@angular/router';
import {ModalDirective} from 'ngx-bootstrap';
import {Project} from '../_models/Project';
import {ProjectService} from '../_services/project.service';
import {forEach} from '@angular/router/src/utils/collection';
import {UsersearchPipe} from './usersearch.pipe';
import {window} from 'rxjs/operator/window';
import {Location} from '@angular/common';

@Component({
  templateUrl: 'user.component.html',
  styleUrls: ['user.style.css'],
  providers: [UserService, ProjectService],
})

export class UserComponent implements OnInit {
  model: User = new User();
  allUser: User [];
  isCreateUser = false;
  isUpdateUser = false;
  isBackUser = false;
  allProjects: Project[] = [];
  alerts: any = [];

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  roledropdownSettings = {};
  checked = false;

  @ViewChild('dangerModal') public dangerModal: ModalDirective;
  @ViewChild('staticModal') public staticModal: ModalDirective;

  constructor(private router: Router,
              private userService: UserService,
              private projectService: ProjectService,
              private location: Location) {
  }

  ngOnInit() {
    this.loadAllUser();
    this.loadAllProjects();
    this.dropdownSettings = {
      singleSelection: false,
      text: 'Select Project',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'form-control'
    };
    this.roledropdownSettings = {
      singleSelection: false,
      placeholder: 'Select Role',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'form-control'
    };


  }

  onItemSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }

  OnItemDeSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }

  onSelectAll(items: any) {
    console.log(items);
  }

  onDeSelectAll(items: any) {
    console.log(items);
  }

  loadAllUser() {
    this.userService.getAll().subscribe(data => {
      console.log('user_details');
      console.log(data);
      this.allUser = data;
    });
  }

  loadAllProjects() {
    this.projectService.getAll().subscribe(data => {
      this.allProjects = data;
      let i: number;
      for (i = 0; i < this.allProjects.length; i++) {
        this.dropdownList.push({
          'id': this.allProjects[i].pid,
          'itemName': this.allProjects[i].name,
          'pid': this.allProjects[i].pid
        });
      }
    });
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(data => {
        this.loadAllUser();
      },
      error => {
        console.log('error');
        console.log(error);
      });
    this.dangerModal.hide();
  }
  openAddNewWindow() {
    this.model = new User();
    this.staticModal.show();
    this.isCreateUser = false;
    this.isBackUser = false;
    this.isUpdateUser = true;
    this.checked = false;
  }


  update() {

    console.log('modal.................');
    console.log(this.model);
    this.userService.update(this.model)
      .subscribe(
        data => {
          // set success message and pass true paramater to persist the message after redirecting to the login page
          /*this.router.navigate(['/login']);*/
          console.log('data');
          this.loadAllUser();
          this.staticModal.hide();
          this.userAlertUpdate();
        },
        error => {
          console.log('error.................');
          console.log(error);
          this.userError();
        });
  }

  register() {
    this.model.projects = this.selectedItems;
    this.model.role = 'SUPER_ADMIN';

    console.log('modal.................');
    console.log(this.model);
    this.userService.create(this.model, '0')
      .subscribe(
        data => {
          console.log('data');
          this.loadAllUser();
          this.staticModal.hide();
        },
        error => {
          console.log('error.................');
          console.log(error);
        });
  }

  back() {
    this.staticModal.hide();
  }

  updateUser(user: User) {
    this.model = user;
    this.staticModal.show();
    this.isCreateUser = true;
    this.isBackUser = true;
    this.isUpdateUser = false;
  }

  userAlert() {
    this.alerts.push({
      type: 'info',
      msg: `Super_Admin Successfully Created`,
      timeout: 1500
    });
  }

  userError() {
    this.alerts.push({
      type: 'danger',
      msg: `User Server ERROR`,
      timeout: 1500
    });
  }

  userAlertUpdate() {
    this.alerts.push({
      type: 'info',
      msg: `successfully Updated`,
      timeout: 1500
    });
  }
}
