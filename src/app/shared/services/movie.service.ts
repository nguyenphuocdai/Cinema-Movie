import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { appConfig } from '../../app.config';
import { ListMovie } from '../models/list-movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: Http) { }


  getListMovie(): Observable<ListMovie> {
    return this.http.get(appConfig.getListMovie)
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

}
