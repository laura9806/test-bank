import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecordService } from 'src/app/services/records/record.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-records-form',
  templateUrl: './record-form.component.html',
  styleUrls: ['./record-form.component.css']
})
export class RecordFormComponent implements OnInit {
  recordForm!: FormGroup;
  history: any[] = [];
  accountNumber!: string | null;

  constructor(public fb: FormBuilder, private recordService: RecordService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.recordForm = this.fb.group({
      accountNumber: ['', Validators.required]
    });
    this.route.queryParams.subscribe(params => {
      this.accountNumber = params['accountNumber'] || null;
      if (this.accountNumber) {
        console.log('Número de cuenta recibido:', this.accountNumber);
        this.recordForm.patchValue({
          accountNumber: this.accountNumber
        });
        this.recordForm.get('accountNumber')?.disable();
      }
    });
  }

  goBack() {
    window.history.back();
  }


  getMovementHistory() {
    if (this.recordForm.valid) {
      const accountNumber = this.recordForm.get('accountNumber')?.value;
      this.recordService.getMovementHistory(accountNumber).subscribe(
        response => {
          this.history = response.movement_history;
          this.recordForm.reset();
        },
        errorResponse => {
          if (errorResponse.error && errorResponse.error.error) {
            alert(errorResponse.error.error);
          } else {
            alert('Error records: ' + errorResponse.message);
          }
        }
      );
    }
  }
  
}
