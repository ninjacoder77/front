// Libs
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { AuthService } from 'src/app/features/auth/services/auth.service';

interface IMenuItem {
  label: string;
  link: string;
  icon: string;
}

/**
 * SidebarComponent
 *
 * Componente que controla a sidebar da aplicação.
 */
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  constructor(private _authService: AuthService, private _router: Router) {}

  /**
   * Define o modo da sidenav, podendo ser `over`, `push` ou `side`.
   *
   * @defaultValue `side`
   */
  @Input() public mode: 'over' | 'side' | 'push' = 'side';

  /**
   * Define se a sidenav está aberta ou fechada.
   *
   * @defaultValue `true`
   */
  @Input() public isSidenavOpen = true;

  /**
   * Emite um evento chamado `closeSidenav` quando a barra lateral deve ser fechada.
   */
  @Output() public closeSidenav = new EventEmitter<void>();

  /**
   * Lista de itens de navegação exibidos na sidenav.
   *
   * Cada item contém uma `label`, um `link` de navegação e um `icon`.
   */
  public menuItems: IMenuItem[] = [
    {
      label: 'Alunos',
      link: '/administrador/alunos',
      icon: 'contact_page',
    },
  ];

  /**
   * onOpenedChange
   *
   * É chamado sempre que o estado de abertura da sidenav é alterado.
   *
   * @param opened - Valor `boolean` que indica se a sidenav está aberta ou fechada.
   * @remarks
   * Se a sidenav estiver fechada (`opened` é `false`) e estiver no modo `over`,
   * então emitimos um evento para notificar o componente pai sobre o fechamento da sidenav.
   */
  public onOpenedChange(opened: boolean): void {
    if (!opened && this.mode === 'over') this.closeSidenav.emit();
  }

  /**
   * logout
   *
   * Realiza o logout do usuário, removendo o token de autenticação e redirecionando para a página de login.
   */
  public logout(): void {
    this._authService.purgeAuth();
    this._router.navigate(['auth/administrador']);
  }
}
