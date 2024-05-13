import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/accounts/account.service';
import { RecordService } from 'src/app/services/records/record.service';

@Component({
  selector: 'app-records-form',
  templateUrl: './records-form.component.html',
  styleUrls: ['./records-form.component.css']
})

export class CheckBalanceFormComponent implements OnInit {
  checkBalanceForm!: FormGroup;
  balance: string = '';
  history: any[] = [];

  constructor(public fb: FormBuilder, public accountService: AccountService, private recordService: RecordService) { }

  ngOnInit(): void {
    this.checkBalanceForm = this.fb.group({
      accountNumber: ['', Validators.required]
    });
  }


  getMovementHistory() {
    const accountNumber = this.checkBalanceForm.get('accountNumber')?.value;
    this.recordService.getMovementHistory(accountNumber).subscribe(response => {
      this.history = response.movement_history;
    });
  }
}

