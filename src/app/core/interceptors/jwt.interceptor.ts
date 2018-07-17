import { HttpErrorResponse, HttpEvent, HttpResponse } from '@angular/common/http/src/response';
import { AuthService } from '../authentication/auth.service';
import { Observable } from 'rxjs/Observable';
import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';


export class JwtInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        throw new Error('Method not implemented.');
    }

    // constructor(public auth: AuthService) { }
    // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //     return next.handle(request).then((event: HttpEvent<any>) => {
    //         if (event instanceof HttpResponse) {
    //             // do stuff with response if you want
    //         }
    //     }, (err: any) => {
    //         if (err instanceof HttpErrorResponse) {
    //             if (err.status === 401) {
    //                 // redirect to the login route
    //                 // or show a modal
    //             }
    //         }
    //     });
    // }
}
