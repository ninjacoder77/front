import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * ActionMenuService
 *
 * Serviço responsável por emitir eventos de ação de edição e exclusão para que outros componentes respondam a essas ações.
 */
@Injectable({
  providedIn: 'root',
})
export class ActionMenuService {
  private _editEvent = new Subject<number>();
  private _deleteEvent = new Subject<number>();

  /**
   * Observable para o evento de edição.
   * Outros componentes podem se inscrever para receber o ID do item a ser editado.
   */
  public editEvent$ = this._editEvent.asObservable();

  /**
   * Observable para o evento de exclusão.
   * Outros componentes podem se inscrever para receber o ID do item a ser excluído.
   */
  public deleteEvent$ = this._deleteEvent.asObservable();

  /**
   * emitEdit
   *
   * Emite um evento de edição, enviando o ID do item a ser editado.
   *
   * @param id - Um `number` que representa o ID do item a ser editado.
   */
  public emitEdit(id: number): void {
    this._editEvent.next(id);
  }

  /**
   * emitDelete
   *
   * Emite um evento de exclusão, enviando o ID do item a ser excluído.
   *
   * @param id - Um `number` que representa o ID do item a ser excluído.
   */
  public emitDelete(id: number): void {
    this._deleteEvent.next(id);
  }
}
