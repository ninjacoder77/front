// Libs
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// Angular Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

// App Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';

// Services
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

// Components
import { ActionDialogComponent } from './components/action-dialog/action-dialog.component';
import { ActionMenuComponent } from './components/action-menu/action-menu.component';
import { BrandLinkComponent } from './components/brand-link/brand-link.component';
import { EntityListComponent } from './components/entity-list/entity-list.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { VideoDialogComponent } from './components/video-dialog/video-dialog.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StudentListComponent } from './pages/student-list/student-list.component';
import { StudentRegistrationComponent } from './pages/student-registration/student-registration.component';

const COMPONENTS = [
  ActionDialogComponent,
  ActionMenuComponent,
  BrandLinkComponent,
  DashboardComponent,
  EntityListComponent,
  LayoutComponent,
  SidebarComponent,
  StudentListComponent,
  StudentRegistrationComponent,
  ToolbarComponent,
  VideoDialogComponent,
];

const MODULES = [
  CommonModule,
  ReactiveFormsModule,
  AdminRoutingModule,
  SharedModule,
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatToolbarModule,
];

@NgModule({
  declarations: [...COMPONENTS],
  providers: [SnackbarService],
  imports: [...MODULES],
})
export class AdminModule {}
