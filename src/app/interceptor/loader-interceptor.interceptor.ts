import { Injectable } from '@angular/core';
import { LoaderServiceService } from 'src/app/service/loader-service.service'
import { finalize } from 'rxjs/operators';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, delay } from 'rxjs';

@Injectable()
export class LoaderInterceptorInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoaderServiceService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.loading();
    return next.handle(request).pipe(
      delay(1000),
      finalize(()=>{
        this.loadingService.idle();
      })
    );
  }
}
