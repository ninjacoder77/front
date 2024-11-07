// Libs
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// App Modules
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';

// Angular Material
import { MatPaginatorIntl } from '@angular/material/paginator';

// Components
import { AppComponent } from './app.component';

// Interceptors
import { AuthInterceptor } from './features/auth/interceptors/auth-interceptor';

// Services
import { PaginatorIntlService } from './shared/services/paginator-intl.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    { provide: MatPaginatorIntl, useClass: PaginatorIntlService },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
