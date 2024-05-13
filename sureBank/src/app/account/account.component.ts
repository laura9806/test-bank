import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router'; 

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountsComponent implements OnInit {
  accounts: any[] = [];
  errorMessage: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute 
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const userId = params['userId'];
      this.authService.getUserAccounts().subscribe(
        response => {
          this.accounts = response['accounts'];
        },
        error => {
          if (error.status === 401) {
            this.router.navigate(['']);
          } else {
            this.errorMessage = 'Failed to fetch user accounts';
          }
        }
      );
    });
  }

  loadAccounts() {
    this.route.params.subscribe((params: Params) => {
      const userId = params['userId'];
      this.authService.getUserAccounts().subscribe(
        response => {
          this.accounts = response['accounts'];
        },
        error => {
          if (error.status === 401) {
            this.router.navigate(['']);
          } else {
            this.errorMessage = 'Failed to fetch user accounts';
          }
        }
      );
    });
  }

  logout(): void {
    this.authService.logout();
  }

  goBack() {
    window.history.back();
    this.loadAccounts();
  }
  
  
}
