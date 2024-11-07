// Libs
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

// Services
import { StorageService } from 'src/app/shared/services/storage.service';

// Enum
import { EnumRoles } from 'src/app/shared/enums/EnumRoles';

interface IJwtPayload {
  tipoConta: string;
}

/**
 * adminGuard
 *
 * Responsável por verificar se o token é válido e se o usuário tem permissão de administrador.
 *
 * @returns `true` se o usuário for um administrador, senão retorna `false` e redireciona o usuário.
 * @remarks
 * Essa guarda deve ser aplicada em rotas que exigem autenticação de administrador.
 */
export const adminGuard: CanActivateFn = () => {
  const router = inject(Router);
  const storageService = inject(StorageService);

  const token = storageService.getItem('jwtToken');
  if (token) {
    try {
      const user = jwtDecode<IJwtPayload>(token);
      if (user.tipoConta === EnumRoles.ADMIN) return true;
    } catch (error) {
      console.error(error);
    }
  }

  router.navigate(['auth/administrador']);
  return false;
};
