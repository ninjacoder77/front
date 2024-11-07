// Libs
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

// Components
import { VideoDialogComponent } from '../../components/video-dialog/video-dialog.component';

/**
 * DashboardComponent
 *
 * Componente que representa a página que exibe o painel principal da aplicação do administrador.
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  constructor(private _dialog: MatDialog) {}

  /**
   * openDialog
   *
   * Responsável por abrir o modal do componente `VideoDialogComponent`.
   */
  public openDialog(): void {
    this._dialog.open(VideoDialogComponent);
  }
}
