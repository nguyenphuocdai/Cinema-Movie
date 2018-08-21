import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor() { }

  private showOrHideHeader = new BehaviorSubject<boolean>(true); // First
  // This method returns a BehaviorSubject that you can subscribe to, or emit new value from.
  getHeaderFlag() {
    return this.showOrHideHeader;
  }
}
