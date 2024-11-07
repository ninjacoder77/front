import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

/**
 * ActionDialogComponent
 *
 * Componente responsável por abrir um diálogo de ação para confirmar ou cancelar uma operação.
 */
@Component({
  selector: 'app-action-dialog',
  templateUrl: './action-dialog.component.html',
  styleUrls: ['./action-dialog.component.scss'],
})
export class ActionDialogComponent {
  constructor(public dialogRef: MatDialogRef<ActionDialogComponent>) {}
}
