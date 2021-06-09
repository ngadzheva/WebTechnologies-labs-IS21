import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeadersInterceptor } from './shared/interceptors/headers.interceptor';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { CookieService } from 'ngx-cookie-service';

import { CanActivateAuthGuard } from './shared/guards/can-activate-auth-guard.service';
import { ConfirmDeactivateGuard } from './shared/guards/can-deactivate-guard.service';
import { AuthModule } from './auth/auth.module';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AuthModule
  ],
  providers: [
    CookieService,
    CanActivateAuthGuard,
    ConfirmDeactivateGuard,
    {
      provide: 'NeverActivateGuard',
      useValue: () => {
        return false;
      }
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
