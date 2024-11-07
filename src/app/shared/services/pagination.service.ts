import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

/**
 * PaginationService
 *
 * Serviço responsável pela gestão da paginação na aplicação.
 */
@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  private _currentPage = 1;
  public currentPage$ = new Subject<number>();

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this._activatedRoute.queryParams.subscribe((params) => {
      this._currentPage = params['page'] ? Number(params['page']) : 1;
      this.currentPage$.next(this._currentPage);
    });
  }
  /**
   * setCurrentPage
   *
   * Define a página atual e atualiza a URL com o novo número de página.
   *
   * @param page `number` que representa o número da página a ser definida como a página atual.
   * @remarks
   * Esse método altera a página atual e emite o novo número da página. A URL será
   * atualizada para refletir a página atual, sem substituir outros parâmetros existentes.
   */
  public setCurrentPage(page: number): void {
    this._currentPage = page;
    this._router.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams: { page: this._currentPage },
      queryParamsHandling: 'merge',
    });

    this.currentPage$.next(this._currentPage);
  }

  /**
   * getCurrentPage
   *
   * Este método retorna o número da página atual armazenada no serviço.
   *
   * @returns O número da página atual.
   */
  public getCurrentPage(): number {
    return this._currentPage;
  }
}
