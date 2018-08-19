import { Component, OnInit, OnDestroy, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CacheService } from '../../../../shared/services/cache.service';
import { UserService } from '../../../../shared/services/user.service';
import { Subject } from 'rxjs';
import { ScriptService } from '../../../../../../node_modules/ngx-script-loader';
import { SimpleCrypt } from '../../../../../../node_modules/ngx-simple-crypt';
import { LocalKey } from '../../../../app.config';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit, OnDestroy, AfterViewInit {
  currentUser: any;
  historyTicket: any;
  isVerify: Boolean = false;
  isHistoryTicket: Boolean = false;
  today: number = Date.now();
  // tslint:disable-next-line:no-input-rename
  @ViewChild('secret') myInput: ElementRef;
  constructor(
    private _cacheService: CacheService,
    private _userService: UserService,
    private scriptService: ScriptService,
    private _el: ElementRef
  ) {
    this.scriptService.loadScript('../../../../../assets/js/sha.js').subscribe(() => {
    }, (error) => {
      console.log('Failed to load script sha js');
    });
  }

  ngOnInit() {
    this.currentUser = this._cacheService.get('CurrentUser');
    if (this.currentUser.SecretKey) {
      this.isVerify = true;
    } else {
      this.isVerify = false;
    }
    if (this.currentUser) {
      this.getHistory();
    }

  }
  getHistory() {
    this._userService.getHistoryUserTicket(this.currentUser.TaiKhoan)
      .subscribe((result) => {
        this.historyTicket = result;
        if (this.historyTicket.DanhSachVeDaDat.length > 0) {
          this.isHistoryTicket = true;
        } else {
          this.isHistoryTicket = false;
        }
      });

  }
  ngOnDestroy(): void {
  }
  ngAfterViewInit() {
    this.scriptService.loadScript('../../../../../assets/js/authenticator.js').subscribe(() => {
    }, (error) => {
      console.log('Failed to load script authenticator js');
    });
    this.myInput.nativeElement.value = this.currentUser.SecretKey;
  }
}
