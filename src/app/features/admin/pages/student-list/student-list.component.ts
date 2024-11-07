// Libs
import { Component } from '@angular/core';

// Interfaces
import { IPaginatedItems } from '../../interfaces/IPaginatedItems';
import { IStudent } from '../../interfaces/IStudent';

/**
 * StudentListComponent
 *
 * Componente que representa a página que exibe uma lista de alunos.
 *
 * Este componente define o endpoint de dados e transforma cada estudante para o formato esperado
 * por uma lista paginada.
 */
@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
})
export class StudentListComponent {
  /**
   * Endpoint para buscar dados dos alunos.
   */
  public endpoint = 'alunos';

  /**
   * Mapeia um objeto `IStudent` para o formato de itens paginados.
   *
   * @param student - Objeto do tipo {@link IStudent}.
   * @returns Objeto do tipo {@link IPaginatedItems}.
   */
  public mapStudentToPaginatedItems(student: IStudent): IPaginatedItems {
    return {
      id: student.id,
      title: student.name,
      subtitle: `Número de matrícula: ${student.enrollmentNumber}`,
    };
  }
}
