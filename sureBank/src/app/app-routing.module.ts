import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountManagementComponent } from 'src/app/account-management/account-management.component';
import { DepositFormComponent } from 'src/app/deposit-form/deposit-form.component';
import { WithdrawFormComponent } from 'src/app/withdraw-form/withdraw-form.component';
import { LoginComponent } from 'src/app/login/login.component';
import { HomeComponent } from 'src/app/home/home.component';
import { RegisterComponent } from 'src/app/register/register.component';
import { AccountsComponent } from 'src/app/account/account.component';
import { CheckBalanceFormComponent } from 'src/app/check-balance-form/check-balance-form.component'
import { RecordFormComponent } from 'src/app/record-form/record-form.component'
import { StyleComponent } from './style/style.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'accounts', component: AccountsComponent },
  {path: '',
    component: HomeComponent,
    children: [
      { path: 'login', component: LoginComponent }
    ]
  },
  {path: '',
    component: StyleComponent,
    children: [
      { path: 'deposit', component: DepositFormComponent },
      { path: 'account-management', component: AccountManagementComponent},
      { path: 'withdraw', component: WithdrawFormComponent },
      { path: 'check-balance', component: CheckBalanceFormComponent},
      { path: 'record', component: RecordFormComponent },
      { path: 'register', component: RegisterComponent },
      
    ]
  },
  
  { path: '', redirectTo: '/account-management', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' } // Redirige a LoginComponent si la ruta no coincide con ninguna
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
