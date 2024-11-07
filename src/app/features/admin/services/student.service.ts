// Libs
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

// Interfaces
import { IClassesResponse } from '../interfaces/IClassesResponse';
import { IStudentCreateRequest } from '../interfaces/IStudentCreateRequest';
import { IStudentCreateResponse } from '../interfaces/IStudentCreateResponse';

// Environment Variables
import { environment } from 'src/environments/environment';

/**
 * StudentService
 *
 * Serviço responsável por gerenciar as operações relacionadas aos estudantes,
 * incluindo o acesso à lista de turmas.
 */
@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private _http: HttpClient) {}

  /**
   * register
   *
   * Registra um aluno enviando suas informações para o backend.
   *
   * @param student - objeto do tipo {@link IStudentCreateRequest}
   * @returns Uma `Promise` contendo a resposta do backend do tipo {@link IStudentCreateResponse}.
   */
  public register(
    student: IStudentCreateRequest
  ): Promise<IStudentCreateResponse> {
    return firstValueFrom(
      this._http.post<IStudentCreateResponse>(`${environment.apiUrl}/alunos`, {
        nomeCompleto: student.studentName,
        rg: student.studentRG,
        numeroMatricula: student.enrollmentNumber,
        turmaId: student.studentClass,
        responsavelCpf: student.guardianCPF,
      })
    );
  }

  /**
   * getClasses
   *
   * Realiza uma requisição HTTP `GET` à API para obter os dados das turmas.
   *
   * @returns `Promise` que resolve para um array contendo objetos do tipo {@link IClassesResponse}
   */
  public getClasses(): Promise<IClassesResponse[]> {
    return firstValueFrom(
      this._http.get<IClassesResponse[]>(`${environment.apiUrl}/turmas`)
    );
  }
}
