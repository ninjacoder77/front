// Libs
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

// App Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';

// Components
import { AdminLoginComponent } from './login/admin-login/admin-login.component';
import { ParentsLoginComponent } from './login/parents-login/parents-login.component';
import { TeacherLoginComponent } from './login/teacher-login/teacher-login.component';

const COMPONENTS = [
  AdminLoginComponent,
  ParentsLoginComponent,
  TeacherLoginComponent,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class AuthModule {}
