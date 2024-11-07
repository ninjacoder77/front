/**
 * IBreadCrumbs
 *
 * Interface que representa um item de breadcrumb.
 */
export interface IBreadCrumbs {
  /**
   * O texto que será exibido para o usuário clicar e navegar para outra página.
   */
  label: string;

  /**
   * O link/caminho de navegação para o qual o usuário será direcionado ao clicar.
   */
  url: string;
}
