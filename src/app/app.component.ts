//Libs
import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Services
import { AuthService } from './features/auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  /**
   * Indica se o usuário está autenticado ou não.
   */
  public isAuthenticated$: BehaviorSubject<boolean>;

  constructor(private _authService: AuthService) {
    this.isAuthenticated$ = this._authService.isAuthenticated$;
  }
}
