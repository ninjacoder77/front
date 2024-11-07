import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  /**
   * getItem
   *
   * Busca o item no localStorage do browser.
   *
   * @param key - Uma `string` que representa  a chave do item que estamos buscando no localStorage
   * @returns Uma `string` que representa o valor associado à `key` no localStorage, ou null se o item não existir
   *
   * @example
   * ```typescript
   * const token = storageService.getItem('jwtToken');
   * console.log(token); // Exibe o valor associado à chave 'jwtToken', ou null se não existir.
   * ```
   */
  public getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  /**
   * saveItem
   *
   * Salva um item no localStorage do browser.
   *
   * @param key - Uma `string` que representa a chave do item que iremos salvar no localStorage
   * @param value - Uma `string` que representa o valor do item que iremos salvar associado à `key`
   *
   * @example
   * ```typescript
   * storageService.saveItem('jwtToken', 'token...');
   * ```
   */
  public saveItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  /**
   * removeItem
   *
   * Remove um item do localStorage do navegador utilizando a chave fornecida.
   *
   * @param key - Uma `string` que representa a chave do item que iremos remover do localStorage
   *
   * @example
   * ```typescript
   * storageService.removeItem('jwtToken');
   * ```
   */
  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
