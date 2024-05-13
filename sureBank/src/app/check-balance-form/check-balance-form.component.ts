import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/accounts/account.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-check-balance-form',
  templateUrl: './check-balance-form.component.html',
  styleUrls: ['./check-balance-form.component.css']
})
export class CheckBalanceFormComponent implements OnInit {
  checkBalanceForm!: FormGroup;
  message: string = '';
  accountNumber!: string | null;
  balance: number | null = null; 



  constructor(public fb: FormBuilder, public accountService: AccountService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.checkBalanceForm = this.fb.group({
      accountNumber: ['', Validators.required],
    });
    this.route.queryParams.subscribe(params => {
      this.accountNumber = params['accountNumber'] || null;
      if (this.accountNumber) {
        this.checkBalanceForm.patchValue({
          accountNumber: this.accountNumber
        });
        this.checkBalanceForm.get('accountNumber')?.disable();
      }
    });
  }

  goBack() {
    window.history.back();
  }

  checkBalance() {
    const accountNumber = this.checkBalanceForm.get('accountNumber')?.value;
    this.accountService.checkBalance(accountNumber).subscribe(
      response => {
        this.checkBalanceForm.reset();
        this.balance = response.Balance;
      },
      errorResponse => {
        if (errorResponse.error && errorResponse.error.error) {
          alert(errorResponse.error.error);
        } else {
          alert('Error check balance: ' + errorResponse.message);
        }
      }
    );
  }
  
  
}
