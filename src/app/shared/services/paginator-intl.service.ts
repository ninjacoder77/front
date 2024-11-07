import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

/**
 * PaginatorIntlService
 *
 * Serviço personalizado para sobrescrever as mensagens do
 * componente de paginação padrão do Angular Material.
 */
@Injectable({
  providedIn: 'root',
})
export class PaginatorIntlService extends MatPaginatorIntl {
  public override itemsPerPageLabel = 'Itens por página';
  public override firstPageLabel = 'Primeira página';
  public override lastPageLabel = 'Última página';
  public override nextPageLabel = 'Próxima página';
  public override previousPageLabel = 'Página anterior';

  /**
   * getRangeLabel
   *
   * Função que altera a label padrão do Angular material do intervalo de páginas.
   *
   * @param page - Número da página atual, tipo `number`.
   * @param pageSize - Tamanho/Número de itens exibidos para cada página, tipo `number`.
   * @param length - Número do total de itens, tipo `number`.
   * @returns Uma `string` formatada com o número da página atual e o total de páginas.
   *
   * @example
   * ```ts
   * // Saída = "Página 1 de 5"
   * getRangeLabel(0, 10, 50);
   * ```
   */
  public override getRangeLabel = (
    page: number,
    pageSize: number,
    length: number
  ): string => {
    if (length === 0 || pageSize === 0) return '';
    const totalPages = Math.ceil(length / pageSize);

    return `Página ${page + 1} de ${totalPages}`;
  };
}
