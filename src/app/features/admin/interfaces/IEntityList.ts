/**
 * Interface genérica para listagem das entidades, contendo informações da página e um array de dados.
 *
 * @typeParam T - Tipo da entidade incluída no array de dados.
 */
export interface IEntityList<T> {
  /**
   * Número da página atual
   */
  page: number;

  /**
   * Quantidade de itens por página
   */
  perPage: number;

  /**
   *  Total de itens no banco de dados
   */
  total: number;

  /**
   * Array de entidades do tipo especificado
   */
  data: Array<T>;
}
