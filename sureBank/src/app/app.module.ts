import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AccountManagementComponent } from './account-management/account-management.component';
import { DepositFormComponent } from './deposit-form/deposit-form.component';
import { WithdrawFormComponent } from './withdraw-form/withdraw-form.component';
import { CheckBalanceFormComponent } from './check-balance-form/check-balance-form.component';
import { RecordFormComponent } from './record-form/record-form.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountsComponent } from './account/account.component';
import { StyleComponent } from './style/style.component';


@NgModule({
  declarations: [
    AppComponent,
    AccountManagementComponent,
    DepositFormComponent,
    WithdrawFormComponent,
    CheckBalanceFormComponent,
    RecordFormComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AccountsComponent,
    StyleComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule, 
    AppRoutingModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


