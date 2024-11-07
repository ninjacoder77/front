// Libs
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { LayoutComponent } from './components/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StudentListComponent } from './pages/student-list/student-list.component';
import { StudentRegistrationComponent } from './pages/student-registration/student-registration.component';

// Guards
import { adminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [adminGuard],
    children: [
      {
        path: 'cadastrar-aluno',
        component: StudentRegistrationComponent,
        data: { breadcrumbs: 'Cadastro de Aluno' },
      },
      {
        path: 'alunos',
        component: StudentListComponent,
        data: { breadcrumbs: 'Alunos Cadastrados' },
      },
      { path: '', component: DashboardComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
