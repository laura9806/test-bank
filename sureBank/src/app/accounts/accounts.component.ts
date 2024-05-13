import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  accounts: any[] = [];
  errorMessage: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUserAccounts().subscribe(
      response => {
        this.accounts = response['accounts'];
      },
      error => {
        if (error.status === 401) {
          this.errorMessage = 'User is not authenticated';
        } else {
          this.errorMessage = 'Failed to fetch user accounts';
        }
      }
    );
  }
}
