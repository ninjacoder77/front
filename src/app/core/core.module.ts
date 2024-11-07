// Libs
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterLink } from '@angular/router';

// Modules
import { SharedModule } from '../shared/shared.module';

// Components
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, SharedModule, RouterLink],
})
export class CoreModule {}
