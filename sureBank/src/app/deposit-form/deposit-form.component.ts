import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/accounts/account.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-deposit-form',
  templateUrl: './deposit-form.component.html',
  styleUrls: ['./deposit-form.component.css']
})
export class DepositFormComponent implements OnInit {
  depositForm!: FormGroup;
  message: string = '';
  accountNumber!: string | null;

  constructor(public fb: FormBuilder, public accountService: AccountService, public authService: AuthService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Crear el formulario y establecer el estado inicial del control accountNumber
    this.depositForm = this.fb.group({
      accountNumber: [{value: '', disabled: false}, Validators.required],
      amount: ['', [Validators.required, Validators.required]],
      password: ['', [Validators.required]]
    });

    // Obtener el número de cuenta de los queryParams
    this.route.queryParams.subscribe(params => {
      this.accountNumber = params['accountNumber'] || null;
      if (this.accountNumber) {
        console.log('Número de cuenta recibido:', this.accountNumber);
        this.depositForm.patchValue({
          accountNumber: this.accountNumber
        });
        // Deshabilitar el control si el número de cuenta existe
        this.depositForm.get('accountNumber')?.disable();
      }
    });
  }


  goBack() {
    window.history.back();
  }

  deposit() {
    const accountNumber = this.depositForm.get('accountNumber')?.value;
    const amount = this.depositForm.get('amount')?.value;
    const password = this.depositForm.get('password')?.value.toString();
    this.accountService.deposit(accountNumber, amount, password).subscribe(
      response => {
        // Restablecer el formulario si la consignación es exitosa
        this.depositForm.reset();
        // Mostrar alerta con el mensaje del backend
        alert(response.message);
      },
      errorResponse => {
        // Manejar el error devuelto por el backend
        if (errorResponse.error && errorResponse.error.error) {
          // Si el error tiene un mensaje específico, mostrarlo en el frontend
          alert(errorResponse.error.error);
        } else {
          // Si no, mostrar un mensaje genérico de error
          alert('Error depositing: ' + errorResponse.message);
        }
      }
    );
  }
  
}
