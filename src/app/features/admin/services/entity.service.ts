// Libs
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

// Interfaces
import { IEntityList } from '../interfaces/IEntityList';

// Environment Variables
import { environment } from 'src/environments/environment';

interface IEntityListParams {
  endpoint: string;
  page: number;
  searchTerm: string;
}

/**
 * Serviço responsável por realizar operações CRUD com as entidades.
 */
@Injectable({
  providedIn: 'root',
})
export class EntityService {
  constructor(private _http: HttpClient) {}

  /**
   * getEntities
   *
   * Busca uma lista de uma determinada entidade paginada no endpoint especificado.
   *
   * @typeParam T - Tipo da entidade.
   * @param params - Objeto do tipo {@link IEntityListParams}
   * @returns Um `Promise` com a lista de entidades paginadas.
   */
  public getEntities<T>({
    endpoint,
    page,
    searchTerm,
  }: IEntityListParams): Promise<IEntityList<T>> {
    return firstValueFrom(
      this._http.get<IEntityList<T>>(`${environment.apiUrl}/${endpoint}`, {
        params: {
          page: page.toString(),
          searchTerm: searchTerm || '',
        },
      })
    );
  }

  /**
   * deleteEntity
   *
   * Exclui uma entidade com o ID especificado no endpoint fornecido.
   *
   * @param id - Um `number` que representa o ID da entidade a ser excluído.
   * @param endpoint - `string` que representa o endpoint onde a entidade será excluída.
   * @returns Uma `Promise` com o objeto da resposta.
   */
  public deleteEntity(id: number, endpoint: string): Promise<unknown> {
    return firstValueFrom(
      this._http.delete(`${environment.apiUrl}/${endpoint}/${id}`)
    );
  }
}
