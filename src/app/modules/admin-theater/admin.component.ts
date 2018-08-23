import { Component, OnInit, HostListener } from '@angular/core';
import { AuthGuardService } from '../../shared/services/auth.service';
import { ScriptService } from 'ngx-script-loader';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
    screenHeight: number;
    constructor(private scriptService: ScriptService,
        private _authGuardService: AuthGuardService) {
        // tslint:disable-next-line:prefer-const
        let headerFlagSubj = this._authGuardService.getHeaderFlag();
        headerFlagSubj.next(false);

        this.screenHeight = window.innerHeight;
    }

    ngOnInit() {
    }

    onResize(event) {
        // tslint:disable-next-line:no-unused-expression
        this.screenHeight = event.target.innerHeight;
    }

}
