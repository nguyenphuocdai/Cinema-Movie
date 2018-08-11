import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '../../../../node_modules/@angular/http';
import { Observable } from '../../../../node_modules/rxjs';
import { appConfig } from '../../app.config';
import { UserNormal } from '../models/user-normal.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  text: String = '';
  possible: String = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

  constructor(private http: Http) { }


  registerUser(body: Object): Observable<UserNormal> {
    // tslint:disable-next-line:prefer-const
    // let bodyString = JSON.stringify(body);
    // tslint:disable-next-line:prefer-const
    let headers = new Headers({ 'Content-Type': 'application/json' });
    // tslint:disable-next-line:prefer-const
    let options = new RequestOptions({ headers: headers });

    return this.http.post(appConfig.registerUser, body, options)
      .map(this.parseData)
      .catch(this.handleErrorObservable);
  }

  getUser(): Observable<UserNormal> {
    return this.http.get(appConfig.getListMovie)
      .map(this.parseData)
      .catch(this.handleErrorObservable);
  }
  loginUser(account: String, password: String) {
    // tslint:disable-next-line:prefer-const
    // let bodyString = JSON.stringify(body);
    // tslint:disable-next-line:prefer-const
    let headers = new Headers({ 'Content-Type': 'application/json' });
    // tslint:disable-next-line:prefer-const
    let options = new RequestOptions({ headers: headers });
    return this.http.post(appConfig.loginUser + `taikhoan=${account}&matkhau=${password}`, null, options)
      .map(this.parseData)
      .catch(this.handleErrorObservable);
  }

  private parseData(res: Response) {
    return res.json() || [];
  }

  private handleErrorObservable(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }
  public makeid() {
    this.text = '';
    for (let i = 0; i < 32; i++) {
      this.text += this.possible.charAt(Math.floor(Math.random() * this.possible.length));
    }
    return this.text;
  }
}
