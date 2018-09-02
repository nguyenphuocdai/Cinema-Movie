// import { Injectable } from '@angular/core';
// import { Router, CanActivate } from '@angular/router';
// import { UserService } from '../../shared/services/user.service';
// import { Location } from '@angular/common';

// @Injectable()
// export class SuccessAuthGuard implements CanActivate {
//     constructor(private router: Router,
//         private _userService: UserService,
//         private _location: Location
//     ) { }
//     canActivate(): boolean {
//         if (localStorage.getItem('currentUser')) {
//             // logged in so return true
//             return true;
//         }

//         // not logged in so redirect to login page with the return url and return false
//         this._location.back(), { queryParams: { returnUrl: this._userService.makeid() } };
//         return false;
//     }
// }
