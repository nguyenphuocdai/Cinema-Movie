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
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(
    private _cacheService: CacheService,
    private _userService: UserService
  ) { }

  ngOnInit() {
    this.currentUser = this._cacheService.get('CurrentUser');
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };
    if (this.currentUser) {
      this.getHistory();
    }
  }
  getHistory() {
    this._userService.getHistoryUserTicket(this.currentUser.TaiKhoan)
      .subscribe((result) => {

        this.historyTicket = result;
        this.dtTrigger.next();
        console.log(this.historyTicket);
      });
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
