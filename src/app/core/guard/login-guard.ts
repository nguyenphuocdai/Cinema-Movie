// import { Injectable } from '@angular/core';
// import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import { UserService } from '../../shared/services/user.service';

// @Injectable()
// export class LoginAuthGuard implements CanActivate {
//     constructor(private router: Router,
//         private _userService: UserService
//     ) { }
//     canActivate(): boolean {
//         if (localStorage.getItem('currentUser')) {
//             // logged in so return true
//             return true;
//         }

//         // not logged in so redirect to login page with the return url and return false
//         this.router.navigate(['login'], { queryParams: { returnUrl: this._userService.makeid() } });
//         return false;
//     }
// }
