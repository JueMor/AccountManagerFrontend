import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AccountFormComponent } from './account-form/account-form.component';
import {Ng2SearchPipeModule} from "ng2-search-filter";
import { LoginFormComponent } from './login-form/login-form.component';
import {AuthInterceptor} from "./interceptor/AuthInterceptor";

@NgModule({
  declarations: [
    AppComponent,
    AccountFormComponent,
    LoginFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi   : true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
