// Libs
import { Component, OnInit } from '@angular/core';

// Interfaces
import { IBreadCrumbs } from '../../interfaces/IBreadCrumbs';

// Services
import { BreadcrumbsService } from '../../services/breadcrumbs.service';

/**
 * BreadcrumbsComponent
 *
 * Este componente exibe uma lista de links para navegação do usuário com base na url atual.
 *
 * @remarks
 * Utiliza o `BreadcrumbsService` para obter os dados de breadcrumbs durante a inicialização.
 * @example
 * ```html
 * <app-breadcrumbs></app-breadcrumbs>
 * ```
 */
@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnInit {
  /**
   * Array de itens de breadcrumbs.
   *
   * Array do tipo {@link IBreadCrumbs}
   */
  public breadcrumbs: IBreadCrumbs[] = [];

  /**
   * Inicializa o componente e injeta o `BreadcrumbsService` para criar os breadcrumbs.
   *
   * @param _breadcrumbsService - Serviço que fornece informações de breadcrumb.
   */
  constructor(private _breadcrumbsService: BreadcrumbsService) {}

  /**
   * ngOnInit
   *
   * Método de inicialização do componente.
   *
   * @remarks
   * Define `breadcrumbs` para o caminho atual de navegação montado pelo serviço `_breadcrumbsService`.
   */
  public ngOnInit(): void {
    this.breadcrumbs = this._breadcrumbsService.breadcrumbs;
  }
}
