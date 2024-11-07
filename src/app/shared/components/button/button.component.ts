import { Component, Input } from '@angular/core';

/**
 * ButtonComponent
 *
 * Componente personalizado de botão.
 */
@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  /**
   * Define a cor a ser utilizada no componente.
   *
   * **Valores possíveis** pelo tema do Angular Material são:
   * - `primary` - cor primária do tema
   * - `accent` - cor secundária do tema
   * - `warn` - cor utilizada para indicar alertas ou erros
   * @example
   * ```html
   * <app-button color="primary">Texto</app-button>
   * ```
   */
  @Input() color: 'primary' | 'accent' | 'warn' = 'primary';

  /** Indica se o botão está desabilitado. */
  @Input() disabled = false;

  /**
   * Indica se o botão está atualmente executando uma operação assíncrona.
   *
   * @example
   * ```html
   * <app-button [isLoading]="form.pending">Enviar</app-button>
   * ```
   * @remarks
   * Aparece um spinner enquanto o valor for `true`.
   */
  @Input() isLoading = false;

  /** `string` que será mostrada dentro do botão */
  @Input() label = '';

  /**
   * O `type` controla o comportamento do botão quando ativado.
   *
   * **Valores possíveis:**
   * - `submit`	Envia um formulário
   * - `reset`	Limpa um formulário
   * - `button`	Comportamento padrão de um botão
   *
   * @see {@link https://html.spec.whatwg.org/multipage/form-elements.html#attr-button-type}
   *
   * @defaultValue `button`
   */
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
}
