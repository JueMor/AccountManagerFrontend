import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { AccountFormComponent } from './account-form/account-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import {AuthInterceptor} from "./interceptor/AuthInterceptor";
import { FilterPipe } from './filter/filter.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatCardModule} from "@angular/material/card";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import { RouterModule, Routes } from '@angular/router';
import { AccountOverviewComponent } from './account-overview/account-overview.component';
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatMomentDateModule, MomentDateAdapter} from "@angular/material-moment-adapter";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {DATE_FORMAT} from "./format/DateFormat";

const routes: Routes = [
  { path: 'overview', component: AccountOverviewComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    AccountFormComponent,
    LoginFormComponent,
    FilterPipe,
    NavbarComponent,
    AccountOverviewComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMomentDateModule
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi   : true,
    },
    {
      provide: DateAdapter, useClass: MomentDateAdapter, deps:[MAT_DATE_LOCALE]
    },
    {
      provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
