import { Component, OnInit, AfterViewChecked, AfterViewInit } from '@angular/core';
import { ScriptService } from 'ngx-script-loader';
import { AuthGuardService } from '../../../../shared/services/auth.service';
import { WOW } from 'wowjs/dist/wow.min';
import { UserService } from '../../../../shared/services/user.service';
import { CacheService } from '../../../../shared/services/cache.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  constructor(private scriptService: ScriptService,
    private _authGuardService: AuthGuardService,


  ) {
    // tslint:disable-next-line:prefer-const
    let headerFlagSubj = this._authGuardService.getHeaderFlag();
    headerFlagSubj.next(false);


  }

  ngOnInit() {

  }
  ngAfterViewInit(): void {
    new WOW().init();
  }

}
