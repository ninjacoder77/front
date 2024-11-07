// Libs
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

// Services
import { LayoutService } from '../../services/layout.service';

/**
 * LayoutComponent
 *
 * Componente de layout principal da tela do administrador.
 *
 * Controla o layout e algumas configurações responsivas, como detecção do modo mobile.
 */
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, OnDestroy {
  /**
   * Observable utilizado apenas para controlar o ciclo de vida
   * dos outros observables ao destruir o componente.
   */
  private _destroy$ = new Subject<void>();

  /**
   * Indica se a aplicação está sendo exibida em uma viewport menor que 598px.
   *
   * @defaultValue `false`
   */
  public isMobile = false;

  /**
   * Indica se a barra lateral está aberta ou fechada.
   *
   * @defaultValue `true`
   */
  public isSidenavOpen = true;

  constructor(private _layoutService: LayoutService) {}

  /**
   * Esse método é executado durante a inicialização do componente.
   * Estamos criando duas inscrições para observar se estamos no modo mobile ou se a sidebar está ou não aberta.
   *
   * Os valores recebidos são armazenados nas propriedades `isMobile` e `isSidenavOpen`.
   */
  public ngOnInit(): void {
    this._layoutService.isMobile$
      .pipe(takeUntil(this._destroy$))
      .subscribe((isMobile) => {
        this.isMobile = isMobile;
      });

    this._layoutService.isSidenavOpen$
      .pipe(takeUntil(this._destroy$))
      .subscribe((isOpen) => {
        this.isSidenavOpen = isOpen;
      });
  }

  /**
   * Esse método é chamado antes de destruir o componente.
   *
   * Envia um valor de finalização `next` e completa o Subject, garantindo
   * que todas as subscrições baseadas em `takeUntil` sejam encerradas, evitando memory leaks.
   */
  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  /**
   * toggleSidenav
   *
   * Inverte o valor de abertura da sidenav. Se era `false` fica `true` e vice-versa.
   */
  public toggleSidenav(): void {
    this._layoutService.toggleSidenav();
  }

  /**
   * handleSidenavClose
   *
   * Responsável por fechar a sidenav quando estiver no modo mobile.
   */
  public handleSidenavClose(): void {
    if (this.isMobile) this._layoutService.closeSidenav();
  }
}
