// Libs
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable, tap } from 'rxjs';

// Interfaces
import { ILoginRequest } from '../interfaces/ILoginRequest';
import { ILoginResponse } from '../interfaces/ILoginResponse';

// Env variables
import { environment } from 'src/environments/environment';

// Services
import { StorageService } from 'src/app/shared/services/storage.service';

/**
 * AuthService
 *
 * Serviço de autenticação da aplicação.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * Será utilizado em toda a aplicação como um broadcast para monitorar o status de autenticação do usuário.
   */
  public isAuthenticated$ = new BehaviorSubject(false);

  constructor(
    private _http: HttpClient,
    private _storageService: StorageService
  ) {}

  /**
   * login
   *
   * Autentica um usuário enviando suas credenciais de login para o backend.
   *
   * @param credentials - Objeto do tipo {@link ILoginRequest}
   * @remarks Após a autenticação com o back, marca `isAuthenticated$` como `true`
   * para indicar que o usuário está autenticado.
   * @returns Uma `Promise` contendo a resposta, que inclui um `token` se a autenticação
   * for bem-sucedida.
   */
  public login(credentials: ILoginRequest): Promise<ILoginResponse> {
    return firstValueFrom(
      this._http
        .post<ILoginResponse>(`${environment.apiUrl}/admin/login`, {
          email: credentials.email,
          senha: credentials.password,
        })
        .pipe(
          tap(() => {
            this.isAuthenticated$.next(true);
          })
        )
    );
  }

  /**
   * checkAuthenticationStatus
   *
   * Verifica o status de autenticação do usuário atual fazendo uma requisição para o backend.
   * Atualiza o observable<boolean> `isAuthenticated$` com base na resposta.
   *
   * @returns Um Observable que emite o objeto de resposta contendo o status:
   * * authenticated: `true` para autenticado
   * * authenticated: `false` para não autenticado
   */
  public checkAuthenticationStatus(): Observable<{ authenticated: boolean }> {
    return this._http
      .get<{ authenticated: boolean }>(`${environment.apiUrl}/membros/status`)
      .pipe(
        tap(({ authenticated }) => this.isAuthenticated$.next(authenticated))
      );
  }

  /**
   * purgeAuth
   *
   * Remove o token JWT do localStorage e redefine o estado de autenticação do usuário.
   *
   * @remarks
   * Utilizado para realizar o processo de logout do usuário.
   */
  public purgeAuth(): void {
    this._storageService.removeItem('jwtToken');
    this.isAuthenticated$.next(false);
  }
}
