import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/accounts/account.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-withdraw-form',
  templateUrl: './withdraw-form.component.html',
  styleUrls: ['./withdraw-form.component.css']
})
export class WithdrawFormComponent implements OnInit {
  withdrawForm!: FormGroup;
  message: string = '';
  accountNumber!: string | null;


  constructor(public fb: FormBuilder, public accountService: AccountService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.withdrawForm = this.fb.group({
      accountNumber: ['', Validators.required],
      amount: ['', [Validators.required, Validators.required]],
      password: ['', [Validators.required]]
    });
    this.route.queryParams.subscribe(params => {
      this.accountNumber = params['accountNumber'] || null;
      if (this.accountNumber) {
        console.log('Número de cuenta recibido:', this.accountNumber);
        this.withdrawForm.patchValue({
          accountNumber: this.accountNumber
        });
        this.withdrawForm.get('accountNumber')?.disable();
      }
    });
  }

  goBack() {
    window.history.back();
  }

  withdraw() {
    const accountNumber = this.withdrawForm.get('accountNumber')?.value;
    const amount = this.withdrawForm.get('amount')?.value;
    const password = this.withdrawForm.get('password')?.value.toString();
    this.accountService.withdraw(accountNumber, amount, password).subscribe(
      response => {
        this.withdrawForm.reset();
        alert(response.message);
      },
      errorResponse => {
        if (errorResponse.error && errorResponse.error.error) {
          alert(errorResponse.error.error);
        } else {
          alert('Error depositing: ' + errorResponse.message);
        }
      }
    );
  }
}
