import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../shared/services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserNormal } from '../../../../shared/models/user-normal.model';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss']
})
export class UserManagerComponent implements OnInit {
  collection = [];
  listUser: UserNormal;
  selectedUSer : UserNormal;
  showDialog: Boolean = false;
  constructor(
    private _userService: UserService,

  ) {
    for (let i = 1; i <= 100; i++) {
      this.collection.push(`item ${i}`);
    }
  }

  ngOnInit() {
    this.getUser();
  }
  getUser() {
    this._userService.getUserGP07()
      .subscribe((result) => { this.listUser = result})
  }
  onSelectUser(user: UserNormal): void {
    this.selectedUSer = user;
    this.showDialog = true;
    console.log(this.selectedUSer);
  }
}
