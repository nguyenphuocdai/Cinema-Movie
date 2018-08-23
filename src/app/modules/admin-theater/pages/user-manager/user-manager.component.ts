import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../shared/services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss']
})
export class UserManagerComponent implements OnInit {


  constructor(
    private _userService: UserService,

  ) { }

  ngOnInit() {

  }

}
