// Libs
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

// Interfaces
import { ISelectOptions } from '../../interfaces/ISelectOptions';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SelectComponent {
  /**
   * Referência ao `FormControl` associado ao select.
   *
   * @example
   * O select será vinculado ao `FormControl` `name` do formulário `form`
   * ```html
   * <app-select [control]="form.controls.name"></app-select>
   * ```
   */
  @Input() control!: FormControl;
  /** Texto que será exibido na label, valor opcional.  */
  @Input() label = '';
  /** Opções que serão mostradas dentro de cada elemento de `select`.  */
  @Input() options: ISelectOptions[] = [];
  /** Texto que será exibido no Select como placeholder.  */
  @Input() placeholder = '';

  /**
   * getErrorMessage
   *
   * Retorna a mensagem de erro correspondente ao primeiro erro que encontrar no input.
   *
   * @remarks
   * As mensagens são genéricas, pois este input será reutilizado em toda a aplicação.
   * Se houver um erro, esta função deve retornar a mensagem de erro correspondente para o usuário.
   * Apenas um erro é exibido por vez.
   *
   * @returns Retorna uma `string` correspondente ao primeiro erro encontrado no input.
   */
  getErrorMessage(): string {
    const errorMessages = {
      required: 'Este campo é obrigatório.',
    };

    for (const [key, message] of Object.entries(errorMessages))
      if (this.control?.hasError(key)) return message;

    return '';
  }
}
