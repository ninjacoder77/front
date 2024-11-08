// Libs
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Services
import { StorageService } from 'src/app/shared/services/storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private _storageService: StorageService) {}

  /**
   * intercept
   *
   * É a implementação do método intercept da interface `HttpInterceptor`.
   * @param req Representa o `request` HTTP original
   * @param next Invoca o próximo interceptor/manipulador na fila
   * @returns `Observable` contendo o evento HTTP com ou sem token
   *
   * @remarks
   * Esse interceptor verifica se o token JWT existe no localStorage, e se encontrado,
   * inclui o cabeçalho `Authorization` com o token em cada requisição.
   */
  public intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this._storageService.getItem('jwtToken');
    const request = req.clone({
      setHeaders: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        'ngrok-skip-browser-warning': 'true',
      },
    });

    return next.handle(request);
  }
}
