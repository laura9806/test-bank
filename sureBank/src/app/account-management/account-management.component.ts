import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/accounts/account.service';
import { StatusService } from 'src/app/services/status/status.service';
import { TypesAccountService } from 'src/app/services/types-account/types-account.service';



@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.css']
})
export class AccountManagementComponent implements OnInit {
  accountForm!: FormGroup;
  status: any[] = [];
  types: any[] = [];
  message: string = '';


  constructor(
    public fb: FormBuilder, 
    public accountService: AccountService,
    public statusService: StatusService,
    public typesAccountService: TypesAccountService,
  ) {  }

  ngOnInit(): void {
    this.accountForm = this.fb.group({
      type_id: ['', Validators.required],
      status_id: ['', Validators.required],
      password: ['', [Validators.required, Validators.required]],
      confirmPassword: ['', [Validators.required, Validators.required]],
      balance: ['', Validators.required],
    });
    this.typesAccountService.getTypes().subscribe(response => {
      this.types = response.types;
    });
    this.statusService.getStatus().subscribe(response => {
      this.status = response.status;
    });
   
  }

  goBack() {
    window.history.back();
  }

  createAccount() {
    this.accountService.createAccount(this.accountForm.value).subscribe(
      response => {
        // Restablecer el formulario si la consignación es exitosa
        this.accountForm.reset();
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
          alert('Error creating account: ' + errorResponse.message);
        }
      }
    );
  }

}
