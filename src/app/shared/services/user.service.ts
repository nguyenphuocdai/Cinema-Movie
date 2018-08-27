import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '../../../../node_modules/@angular/http';
import { Observable } from '../../../../node_modules/rxjs';
import { appConfig } from '../../app.config';
import { UserNormal } from '../models/user-normal.model';
import { DTO } from '../models/sitDTO.model';
import 'rxjs/add/observable/of';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  text: String = '';
  possible: String = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

  @Output() userLoggedAdmin: EventEmitter<any> = new EventEmitter();

  @Output() secretKey: EventEmitter<any> = new EventEmitter();

  constructor(private http: Http) { }


  registerUser(body: Object): Observable<UserNormal> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(appConfig.registerUser, body, options)
      .map(this.parseData)
      .catch(this.handleErrorObservable);
  }
  getAllSit(id: number): Observable<DTO> {
    return this.http.get(appConfig.getSitShowRoom + 'MaLichChieu=' + id)
      .map(this.parseData)
      .catch(this.handleErrorObservable);
  }


  getHistoryUserTicket(account: string): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(appConfig.historyPutTicket + 'TaiKhoan=' + account, null, options)
      .map(this.parseData)
      .catch(this.handleErrorObservable);
  }
  updateUser(body: Object) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(appConfig.updateUser, body, options)
      .map(this.parseData)
      .catch(this.handleErrorObservable);
  }

  putTicket(body: Object): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(appConfig.putTicket, body, options)
      .map(this.parseData)
      .catch(this.handleErrorObservable);
  }
  getUserGP07(): Observable<UserNormal> {
    return this.http.get(appConfig.getUser)
      .map(this.parseData)
      .catch(this.handleErrorObservable);
  }
  getUser(): Observable<UserNormal> {
    return this.http.get(appConfig.getListMovie)
      .map(this.parseData)
      .catch(this.handleErrorObservable);
  }

  loginUser(account: String, password: String) {
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(appConfig.loginUser + `taikhoan=${account}&matkhau=${password}`, null, options)
      .map(this.parseData)
      .catch(this.handleErrorObservable);
  }

  loginUserBody(obj: Object) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(appConfig.loginUser, obj, options)
      .map(this.parseData)
      .catch(this.handleErrorObservable);
  }

  deleteUser(account: string) {
    return this.http.delete(appConfig.deleteUser + `TaiKhoan=${account}`)
      .map(this.parseData)
      .catch(this.handleErrorObservable);
  }


  saveSecretKey(secretKey: String) {
    if (!secretKey) {
      return;
    } else {
      this.secretKey.emit(secretKey);
      return secretKey;
    }
  }

  public makeid() {
    this.text = '';
    for (let i = 0; i < 32; i++) {
      this.text += this.possible.charAt(Math.floor(Math.random() * this.possible.length));
    }
    return this.text;
  }
  displayNameUser(user: String) {
    this.getLoggedInName.emit(user);
    return user;
  }
  displayLoggedAdmin(user: string) {
    this.userLoggedAdmin.emit(user);
    return user;
  }

  private parseData(res: Response) {
    return res.json() || [];
  }

  private handleErrorObservable(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }
}
