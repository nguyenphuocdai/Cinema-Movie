import { Component, OnInit, Input } from '@angular/core';
import { NgxZaloService } from '../../shared/services/ngx-zalo.service';
import { User } from '../../shared/models/user.model';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogin: Boolean = false;
  user: User;
  constructor(
    private _ngxZaloService: NgxZaloService,

  ) {
    this.isLogin = localStorage.getItem('isLogin') === 'true';
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.user);
  }

  ngOnInit() {
  }

}
