import { Component, OnInit, HostListener, AfterViewInit } from '@angular/core';
import { AuthGuardService } from '../../shared/services/auth.service';
import { ScriptService } from 'ngx-script-loader';
import { WOW } from 'wowjs/dist/wow.min';
import { UserService } from '../../shared/services/user.service';
import { CacheService } from '../../shared/services/cache.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, AfterViewInit {
    screenHeight: number;
    currentAdmin: any;
    displayName: String = '';
    isLogined: Boolean = false;
    subscription: Subscription;
    constructor(private scriptService: ScriptService,
        private _authGuardService: AuthGuardService,
        private _userService: UserService,
        private _cacheService: CacheService,
        private _router: Router
    ) {
        // tslint:disable-next-line:prefer-const
        let headerFlagSubj = this._authGuardService.getHeaderFlag();
        headerFlagSubj.next(false);

        this.screenHeight = window.innerHeight;
        this._userService.userLoggedAdmin.subscribe(user => this.showNameLoginned(user));
        console.log(this.displayName);
    }

    ngOnInit() {
        this.currentAdmin = this._cacheService.get('CurrentUserAdmin');
        if (this.currentAdmin) {
            this.showNameLoginned(this.currentAdmin.HoTen);
            return;
        } else {
            this._router.navigate(['/admin/login-dashboard']);
            return;
        }
    }

    onResize(event) {
        // tslint:disable-next-line:no-unused-expression
        this.screenHeight = event.target.innerHeight;
    }
    ngAfterViewInit(): void {
        new WOW().init();
    }
    private showNameLoginned(user: any): void {
        // tslint:disable-next-line:prefer-const
        let data: any | null = this._cacheService.get('CurrentUserAdmin');
        if (user === null) {
            this.isLogined = false;
            return;
        }
        this.isLogined = true;
        if (typeof user === 'object') {
            this.displayName = user.name;
        } else {
            this.displayName = user;
        }

    }
}
