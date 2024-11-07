import { Component, Input } from '@angular/core';

/**
 * ImageActionPanelComponent
 *
 * Componente para exibir uma imagem à esquerda e um painel de ações à direita.
 *
 * @example
 * ```html
 * <app-image-action-panel
 *   imageUrl="/assets/img.webp"
 *   imageDescription="descrição da imagem">
 *
 *   <!-- Inserir componente para descrição do painel de ações, ex:-->
 *   <p>...</p>
 *
 *   <!-- Inserir componente com atributo `panel` para representar as ações -->
 *   <div panel>
 *     <app-button label="Ação 1" />
 *     <app-button label="Ação 2" />
 *   </div>
 * </app-image-action-panel>
 * ```
 */
@Component({
  selector: 'app-image-action-panel',
  templateUrl: './image-action-panel.component.html',
  styleUrls: ['./image-action-panel.component.scss'],
})
export class ImageActionPanelComponent {
  /**
   * Caminho ou URL da imagem que será utilizada no atributo `src` do elemento `<img />`.
   */
  @Input() public imageUrl = '';

  /**
   * Descrição da imagem que será utilizada no atributo `alt` do elemento `<img />`.
   *
   * Esta descrição melhora a acessibilidade e é exibida quando a imagem não pode ser carregada.
   */
  @Input() public imageDescription = '';
}
