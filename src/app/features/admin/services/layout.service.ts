import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * LayoutService
 *
 * Serviço responsável pela gestão do layout da aplicação.
 *
 * Este serviço gerencia estados relacionados ao layout, como se o usuário está em um dispositivo móvel
 * e o estado de visibilidade do menu lateral (sidenav) e toolbar (navbar).
 */
@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private _isMobile = new BehaviorSubject<boolean>(false);
  private _isSidenavOpen = new BehaviorSubject<boolean>(false);

  /**
   * `Observable<boolean>` que emite um valor `boolean` indicando se a aplicação está em modo mobile.
   * O valor é atualizado sempre que a viewport passa do breakpoint (598px)
   */
  isMobile$ = this._isMobile.asObservable();

  /**
   * `Observable<boolean>` que emite um valor `boolean` indicando se a sidenav está aberta ou não.
   * O valor é atualizado sempre que o estado da sidenav muda.
   */
  isSidenavOpen$ = this._isSidenavOpen.asObservable();

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      // TODO: utilizar breakpoint global
      .observe(`(max-width: 598px)`)
      .subscribe(({ matches }) => {
        this._isMobile.next(matches);
        this._isSidenavOpen.next(!matches);
      });
  }

  /**
   * toggleSidenav
   *
   * Inverte o estado da sidenav e notifica todos os componentes inscritos.
   */
  public toggleSidenav(): void {
    const currentState = this._isSidenavOpen.value;
    this._isSidenavOpen.next(!currentState);
  }

  /**
   * closeSidenav
   *
   * Altera o estado da sidenav para fechada `false` e notifica todos os componentes que dependem desse estado.
   */
  public closeSidenav(): void {
    this._isSidenavOpen.next(false);
  }
}
