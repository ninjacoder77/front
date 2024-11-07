// Libs
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

// Services
import { PaginationService } from 'src/app/shared/services/pagination.service';
import { ActionMenuService } from '../../services/action-menu.service';
import { EntityService } from '../../services/entity.service';

// Interfaces
import { IPaginatedItems } from '../../interfaces/IPaginatedItems';

/**
 * EntityListComponent
 *
 * Componente para exibir uma lista paginada de entidades com funcionalidades de edição e exclusão.
 *
 * @remarks
 * Utiliza serviços para carregar entidades paginadas, e permite ações de edição e exclusão de itens.
 * @typeParam T - Tipo genérico para as entidades a serem listadas.
 */
@Component({
  selector: 'app-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.scss'],
})
export class EntityListComponent<T> implements OnInit, OnDestroy {
  /**
   * Representa todas as inscrições ativas acumuladas dentro do componente.
   */
  private _subscriptions: Subscription = new Subscription();

  /**
   * Endpoint da API de onde os dados serão carregados e enviados.
   */
  @Input() public endpoint = '';

  /**
   * Título da seção exibido acima da lista de entidades.
   */
  @Input() public sectionTitle = '';

  /**
   * Função que transforma os itens do tipo genérico `T` para o formato `IPaginatedItems`.
   */
  @Input() public mapItem!: (item: T) => IPaginatedItems;

  /**
   * Array dos itens paginados a serem exibidos na interface.
   */
  public paginatedItems: IPaginatedItems[] = [];

  /**
   * Número total de itens que correspondem aos filtros presentes na query.
   *
   * @defaultValue `0`
   */
  public totalItems = 0;

  /**
   * Página atual da lista.
   *
   * @defaultValue `1`
   */
  public currentPage = 1;

  /**
   * Indica se os dados estão sendo carregados.
   *
   * @defaultValue `false`
   */
  public isLoading = false;

  public searchTerm = '';

  constructor(
    private _actionMenuService: ActionMenuService,
    private _activatedRoute: ActivatedRoute,
    private _entityService: EntityService,
    private _paginationService: PaginationService,
    private _router: Router
  ) {}

  /**
   * ngOnInit
   *
   * Inicializa o componente e realiza as inscrições aos eventos de edição, exclusão e paginação.
   * Faz o primeiro carregamento dos dados ao inicializar.
   */
  public ngOnInit(): void {
    this._subscribeToEditEvent();
    this._subscribeToDeleteEvent();
    this._subscribeToPagination();
    this._subscribeToSearch();
    this._getEntityPage();
  }

  /**
   * onSearch
   *
   * Realiza a pesquisa com o termo fornecido e atualiza a URL com o parâmetro de pesquisa.
   *
   * @param searchTerm - `string` que representa o termo de pesquisa inserido pelo usuário.
   */
  public onSearch(searchTerm: string): void {
    this.currentPage = 1;
    this._paginationService.setCurrentPage(this.currentPage);
    this.searchTerm = searchTerm;

    this._router.navigate([], {
      queryParams: { page: 1, searchTerm },
      queryParamsHandling: 'merge',
    });
    this._getEntityPage();
  }

  /**
   * _getEntityPage
   *
   * Busca uma determinada página no endpoint especificado e atualiza a lista `paginatedItems`.
   */
  private async _getEntityPage(): Promise<void> {
    this.isLoading = true;

    try {
      const { total, data } = await this._entityService.getEntities<T>({
        endpoint: this.endpoint,
        page: this.currentPage,
        searchTerm: this.searchTerm,
      });

      this.totalItems = total;
      this.paginatedItems = data.map(this.mapItem);
    } catch (error) {
      // TODO: mostrar snackbar de erro
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * _subscribeToEditEvent
   *
   * Inscrição ao evento de edição. Redireciona para a rota de edição do item selecionado.
   */
  private _subscribeToEditEvent(): void {
    this._subscriptions.add(
      this._actionMenuService.editEvent$.subscribe((id: number) => {
        this._router.navigate([`administrador/editar/${this.endpoint}`, id]);
      })
    );
  }

  /**
   * _subscribeToDeleteEvent
   *
   * Inscrição ao evento de exclusão. Chama o serviço para excluir o item e atualiza a lista.
   */
  private _subscribeToDeleteEvent(): void {
    this._subscriptions.add(
      this._actionMenuService.deleteEvent$.subscribe(async (id: number) => {
        try {
          await this._entityService.deleteEntity(id, this.endpoint);
          // TODO: mostrar snackbar de sucesso
          this._getEntityPage();
        } catch (error) {
          console.error('Erro:', error);
          // TODO: mostrar snackbar de erro
        }
      })
    );
  }

  /**
   * _subscribeToPagination
   *
   * Inscrição ao serviço de paginação, atualiza `currentPage` e recarrega a lista ao mudar a página.
   */
  private _subscribeToPagination(): void {
    this.currentPage = this._paginationService.getCurrentPage();

    this._subscriptions.add(
      this._paginationService.currentPage$.subscribe((page) => {
        this.currentPage = page;
        this._getEntityPage();
      })
    );
  }

  /**
   * _subscribeToSearch
   *
   * Inscrição aos parâmetros de pesquisa na url para atualizar a lista quando a busca é realizada.
   */
  private _subscribeToSearch(): void {
    this._subscriptions.add(
      this._activatedRoute.queryParams.subscribe((params) => {
        this.searchTerm = params['searchTerm'];
        this._getEntityPage();
      })
    );
  }

  /**
   * ngOnDestroy
   *
   * Limpa as inscrições para evitar vazamentos de memória quando o componente for destruído.
   */
  public ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }
}
