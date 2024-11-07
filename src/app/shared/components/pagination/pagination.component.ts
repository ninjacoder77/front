// Libs
import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subject, takeUntil } from 'rxjs';

// Services
import { PaginationService } from '../../services/pagination.service';

/**
 * PaginationComponent
 *
 * Componente que gerencia a paginação de uma lista de items.
 *
 * @example
 * ```html
 * <app-pagination
 *   [length]="totalItems"
 *   [pageSize]="itemsPerPage"
 * ></app-pagination>
 * ```
 */
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  /**
   * Utilizado com o operador `takeUntil` para cancelar a inscrição no observable.
   */
  private _destroy$ = new Subject<void>();

  constructor(private _paginationService: PaginationService) {}

  /**
   * Tamanho total dos itens a ser exibido.
   *
   * @defaultValue `0`
   *
   * @remarks
   * Caso o valor permaneça `0`, uma mensagem informando a ausência de itens será exibida.
   */
  @Input() public length = 0;

  /**
   * Quantidade de itens exibido por página.
   *
   * * @defaultValue `5`
   */
  @Input() public pageSize = 5;

  /**
   * Índice da página atual (baseado em zero por conta do componente do Angular Material).
   *
   * @defaultValue `0`
   */
  @Input() public pageIndex = 0;

  /**
   * ngOnInit
   *
   * Este método define a página atual com base no valor do PaginationService
   * e se inscreve para observar as mudanças
   * O índice da página é ajustado para ser baseado em zero, compatível com o componente paginator.
   */
  public ngOnInit(): void {
    this.pageIndex = this._paginationService.getCurrentPage() - 1;

    this._paginationService.currentPage$
      .pipe(takeUntil(this._destroy$))
      .subscribe((page) => {
        this.pageIndex = page - 1;
      });
  }

  /**
   * onPageChange
   *
   * Responsável por trocar a página no serviço de paginação.
   *
   * @param event - O evento de paginação contendo o novo índice da página.
   */
  public onPageChange($event: PageEvent): void {
    this._paginationService.setCurrentPage($event.pageIndex + 1);
  }
}
