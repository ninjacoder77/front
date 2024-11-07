import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/**
 * ReturnButtonComponent
 *
 * Componente que exibe um botão de retorno.
 *
 * @example
 * ```html
 * <app-return-button routerLink="/administrador" />
 * ```
 */
@Component({
  selector: 'app-return-button',
  templateUrl: './return-button.component.html',
  styleUrls: ['./return-button.component.scss'],
})
export class ReturnButtonComponent implements OnInit {
  /**
   * O link de navegação do botão.
   *
   * Define o destino para onde o botão irá redirecionar o usuário quando clicado.
   *
   * @defaultValue `'..'` (página anterior)
   */
  @Input() public routerLink = '..';

  /**
   * Se for a pagina inicial, não deve mostrar o botão.
   */
  public isHomePage = false;

  constructor(private _router: Router) {}

  /**
   * Invoca o método para verificar se estamos ou não na Homepage quando o componente é inicializado.
   */
  public ngOnInit(): void {
    this.checkHomePage();
  }

  /**
   * Verifica se a rota atual é a pagina inicial.
   */
  private checkHomePage(): void {
    this.isHomePage = this._router.url === '/';
  }
}
