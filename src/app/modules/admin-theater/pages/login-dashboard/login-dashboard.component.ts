import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ScriptService } from 'ngx-script-loader';
import { AuthGuardService } from '../../../../shared/services/auth.service';

declare var $: any;
@Component({
  selector: 'app-login-dashboard',
  templateUrl: './login-dashboard.component.html',
  styleUrls: ['./login-dashboard.component.scss']
})
export class LoginDashboardComponent implements OnInit, AfterViewInit {

  constructor(
    private scriptService: ScriptService,
    private _authGuardService: AuthGuardService

  ) {
    // tslint:disable-next-line:prefer-const
    let headerFlagSubj = this._authGuardService.getHeaderFlag();
    headerFlagSubj.next(false);
  }

  ngOnInit() {
    this.scriptService.loadScript('../../../../../assets/js/lightning-engraving.js').subscribe(() => {
    }, (error) => {
      console.log('Failed to load script main js');
    });

  }
  ngAfterViewInit() {
    $('input[type="password"]').on('focus', function () {
      $('*').addClass('password');
    }).on('focusout', function () {
      $('*').removeClass('password');
    });
  }
}
