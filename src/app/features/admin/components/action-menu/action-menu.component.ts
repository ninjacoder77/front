// Libs
import { Component, Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

// Components
import { ActionDialogComponent } from '../action-dialog/action-dialog.component';

// Services
import { ActionMenuService } from '../../services/action-menu.service';

/**
 * ActionMenuComponent
 *
 * Componente responsável por abrir um menu de ações para editar ou excluir um item.
 *
 * Ao selecionar "editar", um evento de edição é emitido e irá redirecionar para tela de editar um aluno.
 * Ao selecionar "excluir", abre um diálogo de confirmação. Se confirmado, emite um evento de exclusão.
 */
@Component({
  selector: 'app-action-menu',
  templateUrl: './action-menu.component.html',
  styleUrls: ['./action-menu.component.scss'],
})
export class ActionMenuComponent implements OnDestroy {
  /**
   * Utilizada para cancelar a inscrição quando o componente for destruído.
   */
  private _dialogSubscription: Subscription = Subscription.EMPTY;

  /**
   * ID do item associado a este menu.
   *
   * @defaultValue -1
   */
  @Input() public itemId = -1;

  constructor(
    private _dialogRef: MatDialog,
    private _actionMenuService: ActionMenuService
  ) {}

  /**
   * onEdit
   *
   * Esta função emite um evento de edição para o item atual.
   */
  // public onEdit(): void {
  //   this._actionMenuService.emitEdit(this.itemId);
  // }

  /**
   * onDelete
   *
   * Abre o diálogo de confirmação para exclusão do item atual.
   * Após o diálogo ser fechado, verifica a confirmação do usuário e, se confirmada, emite o evento de exclusão.
   *
   * @remarks
   * Por padrão, desativa o foco no botão quando o modal abre.
   */
  public onDelete(): void {
    const dialogRef = this._dialogRef.open(ActionDialogComponent, {
      autoFocus: false,
    });

    this._dialogSubscription = dialogRef
      .afterClosed()
      .subscribe((confirmed) => {
        if (confirmed) {
          this._actionMenuService.emitDelete(this.itemId);
        }
      });
  }

  /**
   * ngOnDestroy
   *
   * Limpa as inscrições para evitar vazamentos de memória quando o componente for destruído.
   */
  public ngOnDestroy(): void {
    this._dialogSubscription.unsubscribe();
  }
}
