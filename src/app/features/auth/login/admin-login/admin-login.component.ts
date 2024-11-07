// Libs
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Services
import { StorageService } from 'src/app/shared/services/storage.service';
import { AuthService } from '../../services/auth.service';

// Interfaces
import { ILoginRequest } from '../../interfaces/ILoginRequest';
import { ILoginResponse } from '../../interfaces/ILoginResponse';

/**
 * AdminLoginComponent
 *
 * Componente que representa a página que exibe o login para administradores.
 *
 * Este componente gerencia a interface e a lógica de autenticação de administradores.
 */
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent {
  /**
   * Indica se ocorreu um erro durante o processo de login.
   *
   * Utilizada para controlar a exibição de mensagens de erro para o usuário.
   */
  public loginFailed = false;

  /**
   * Formulário de login do administrador com as devidas validações.
   */
  public loginForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    },
    { updateOn: 'submit' }
  );

  constructor(
    private _authService: AuthService,
    private _storageService: StorageService,
    private _router: Router
  ) {}

  /**
   * onSubmit
   *
   * Lida com o evento de submissão do formulário de login do administrador.
   *
   * @param $event - Evento do tipo `SubmitEvent` de envio de um formulário no browser
   * @returns Uma `Promise` vazia que é resolvida após o processo de login ser concluído.
   * @remarks
   * Responsável por todo o processo de login, incluindo validação do formulário,
   * envio das credenciais para autenticação e tratamento de respostas de sucesso ou erro.
   */
  public async onSubmit($event: SubmitEvent): Promise<void> {
    $event.preventDefault();

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loginForm.markAsPending();
    const credentials = this.loginForm.value as ILoginRequest;

    try {
      const response = await this._authService.login(credentials);
      this._handleLoginSuccess(response);
    } catch (error) {
      this._handleLoginError(error as HttpErrorResponse);
    }
  }

  /**
   * _handleLoginSuccess
   *
   * Trata o sucesso do login
   *
   * Realiza as ações necessárias, como salvar o token de autenticação e redirecionar o usuário.
   *
   * @param response - A resposta do servidor contendo o token de autenticação.
   * @remarks
   * - Utiliza o serviço do token para armazenar ele no localStorage.
   * - Redireciona o usuário para a página inicial após o login bem-sucedido.
   */
  private _handleLoginSuccess(response: ILoginResponse): void {
    const { token } = response;
    if (token) {
      this._storageService.saveItem('jwtToken', token);
      this._router.navigate(['/administrador']);
    }
  }

  /**
   * _handleLoginError
   *
   * Trata erros ocorridos durante o processo de login.
   *
   * @param error - Objeto de resposta do erro HTTP `HttpErrorResponse`
   * @remarks
   * Marca que o login como falhou e define erros apropriados no formulário de login com base no status do erro.
   * - Se o status do erro for `401` (Não autorizado) - define um erro de "não autorizado" no formulário
   * - Se o status do erro for `0` (Sem conexão), define um erro de "sem conexão" no formulário
   * - Para outros status de erro,define um erro genérico de "erro do servidor" no formulário
   */
  private _handleLoginError(error: HttpErrorResponse): void {
    this.loginFailed = true;
    this.loginForm.updateValueAndValidity();

    switch (error.status) {
      case 400:
      case 401:
        this.loginForm.setErrors({ unauthorized: true });
        break;

      case 0 && error.error instanceof ProgressEvent:
        this.loginForm.setErrors({ noConnection: true });
        break;

      default:
        this.loginForm.setErrors({ serverError: true });
    }
  }
}
