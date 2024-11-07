// Libs
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { AdminLoginComponent } from './login/admin-login/admin-login.component';
import { ParentsLoginComponent } from './login/parents-login/parents-login.component';
import { TeacherLoginComponent } from './login/teacher-login/teacher-login.component';

const routes: Routes = [
  { path: 'administrador', component: AdminLoginComponent },
  { path: 'professor', component: TeacherLoginComponent },
  { path: 'responsavel', component: ParentsLoginComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
