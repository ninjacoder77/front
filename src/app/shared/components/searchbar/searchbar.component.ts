import { Component, EventEmitter, Output } from '@angular/core';

/**
 * SearchbarComponent
 *
 * Barra de pesquisa para o usuário buscar algum item.
 *
 * @example
 * ```html
 * <app-searchbar (search)="onSearch($event)"></app-searchbar>
 * ```
 */
@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent {
  /**
   * Evento emitido quando uma pesquisa é realizada.
   */
  @Output() public search = new EventEmitter<string>();

  /**
   * O termo de pesquisa inserido pelo usuário
   */
  public searchTerm = '';

  /**
   * Controla a visibilidade da barra de pesquisa no mobile.
   */
  public toggleSearch = false;

  /**
   * openSearchbar
   *
   * Abre a barra de pesquisa definindo a flag toggleSearch como `true`.
   *
   * @remarks
   * Alterando toggleSearch para `true`, faz com que a barra de pesquisa
   * ocupe todo o espaço disponível em tela (no modo mobile).
   */
  public openSearchbar(): void {
    this.toggleSearch = true;
  }

  /**
   * closeSearchbar
   *
   * Fecha a barra de pesquisa definindo a flag toggleSearch como `false`.
   *
   * @remarks
   * Fechando a barra de pesquisa, o termo também é reinicializado para o valor padrão.
   */
  public closeSearchbar(): void {
    this.searchTerm = '';
    this.toggleSearch = false;
  }

  /**
   * onSearch
   *
   * Emite o termo de pesquisa.
   */
  public onSearch(): void {
    this.search.emit(this.searchTerm.trim());
  }
}
