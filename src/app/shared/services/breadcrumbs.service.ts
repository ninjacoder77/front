//Libs
import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

// Interfaces
import { IBreadCrumbs } from '../interfaces/IBreadCrumbs';

/**
 * BreadcrumbsService
 *
 * Serviço que gera a lista de breadcrumbs com base nas rotas da aplicação.
 *
 * @remarks
 * Esse serviço utiliza o evento `NavigationEnd` do `Router` para rastrear alterações
 * nas rotas e construir a lista de breadcrumbs usando os dados das rotas ativadas.
 */
@Injectable({
  providedIn: 'root',
})
export class BreadcrumbsService {
  /**
   * Lista de breadcrumbs que representa o caminho atual da navegação.
   */
  public breadcrumbs: IBreadCrumbs[] = [];

  /**
   * Inicializa o serviço e se inscreve para receber eventos de navegação para atualizar os breadcrumbs.
   *
   * @param _router - Instância do `Router` para monitorar eventos de navegação.
   * @param _activatedRoute - Instância do `ActivatedRoute` para acessar as rotas ativas.
   *
   * @remarks
   * Estamos filtrando os eventos de navegação somente para usar o `NavigationEnd` que indica que
   * é um evento disparado somente quando a navegação termina com sucesso.
   */
  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this._router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbs = this._createBreadcrumbs(this._activatedRoute.root);
      });

    this.breadcrumbs = this._createBreadcrumbs(this._activatedRoute.root);
  }

  /**
   * _createBreadcrumbs
   *
   * Cria a lista de breadcrumbs recursivamente com base nas rotas ativadas.
   *
   * @param activatedRoute - A rota ativada atual para processar.
   * @param breadcrumbs - Lista de breadcrumbs que será incrementada a cada chamada.
   * @param url - Uma `string` que representa a URL que será incrementada a cada chamada.
   * @returns Array atualizado de `IBreadCrumbs` representando todos os links para navegação do usuário.
   */
  private _createBreadcrumbs(
    activatedRoute: ActivatedRoute,
    breadcrumbs: IBreadCrumbs[] = [],
    url = ''
  ): IBreadCrumbs[] {
    const childrenRoutes: ActivatedRoute[] = activatedRoute.children;
    if (childrenRoutes.length === 0) return breadcrumbs;

    for (const childRoute of childrenRoutes) {
      const urlSegments = childRoute.snapshot.url
        .map((segment) => segment.path)
        .join('/');

      if (urlSegments) {
        url += `/${urlSegments}`;
        breadcrumbs.push({
          label: childRoute.snapshot.data['breadcrumbs'],
          url,
        });
      }

      this._createBreadcrumbs(childRoute, breadcrumbs, url);
    }

    return breadcrumbs;
  }
}
