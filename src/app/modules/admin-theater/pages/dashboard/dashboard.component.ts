import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ScriptService } from 'ngx-script-loader';
import { AuthGuardService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewChecked {

  constructor(private scriptService: ScriptService,
    private _authGuardService: AuthGuardService
  ) {
    // tslint:disable-next-line:prefer-const
    let headerFlagSubj = this._authGuardService.getHeaderFlag();
    headerFlagSubj.next(false);
  }

  ngOnInit() {
  }
  ngAfterViewChecked(): void {

  }
}
