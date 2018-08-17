import { Component, OnInit, OnDestroy } from '@angular/core';
import { CacheService } from '../../../../shared/services/cache.service';
import { UserService } from '../../../../shared/services/user.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit, OnDestroy {
  currentUser: any;
  historyTicket: any;
  constructor(
    private _cacheService: CacheService,
    private _userService: UserService
  ) { }

  ngOnInit() {
    this.currentUser = this._cacheService.get('CurrentUser');
    if (this.currentUser) {
      this.getHistory();
    }
  }
  getHistory() {
    this._userService.getHistoryUserTicket(this.currentUser.TaiKhoan)
      .subscribe((result) => {

        this.historyTicket = result;
        console.log(this.historyTicket);
      });
  }
  ngOnDestroy(): void {
  }

}
