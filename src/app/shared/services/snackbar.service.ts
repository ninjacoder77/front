import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private _snackBar: MatSnackBar) {}

  /**
   * Abre uma Snackbar com uma mensagem, podendo ter um botão para fechar ou uma duração específica.
   *
   * @param message - Uma `string` que representa a mensagem para exibir na Snackbar.
   * @param action - (Opcional) Uma `string` que será usado dentro do botão. Se fornecido a `action`, a Snackbar permanecerá aberta indefinidamente até que o botão seja clicado.
   * @param duration - (Opcional) Um `number` que indica a duração em milissegundos para a Snackbar ficar visível. Se `action` for definida, então o valor de `duration` será ignorado.
   */
  public openSnackBar(
    message: string,
    action?: string,
    duration = 2000
  ): void {
    this._snackBar.open(message, action, {
      horizontalPosition: 'right',
      duration: action ? Infinity : duration,
      panelClass: ['custom-snackbar'],
    });
  }
}
