import {Component, OnInit} from '@angular/core';
import {Account} from "./datatypes/account";
import {AccountService} from "./account.service";
import {HttpErrorResponse} from "@angular/common/http";
import {LoginRequest} from "./payload/request/LoginRequest";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AccountManagerFront';

  public accounts?: Account[];
  public updateAccount: Account | undefined;
  public deleteAccount: Account | undefined;

  public loginAccount: LoginRequest = {};

  searchText: any = "";

  constructor(private accountService: AccountService) {
  }

  ngOnInit() {
    this.getAccounts();
  }

  public login($event: { value: LoginRequest; }): void {
    this.loginAccount.username = $event.value.username;
    this.loginAccount.password = $event.value.password;

    this.accountService.login($event.value).subscribe({
        next: (response: any) => {
          console.log(response.headers.get('Authorization'));
          localStorage.setItem('token', response.headers.get('Authorization'))

          this.getAccounts();
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        }
      }
    )
  }

  public getAccounts(): void {
    this.accountService.getAccounts().subscribe({
        next: (response: Account[]) => {
          this.accounts = response;
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message)
        }
      }
    );
  }

  public onAddAccount($event: { value: Account; }): void {
    this.accountService.addAccount($event.value).subscribe({
        next: (response: Account) => {
          console.log(response);
          this.getAccounts();
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        }
      }
    )
  }

  public onUpdateAccountButtonPressed(account: Account): void {
    this.updateAccount = account;
  }

  public onUpdateAccount($event: { value: Account }): void {
    this.accountService.updateAccount($event.value).subscribe({
        next: (response: Account) => {
          console.log(response);
          this.getAccounts();
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        }
      }
    )
  }

  public onDeleteAccountButtonPressed(account: Account): void {
    this.deleteAccount = account;
  }

  public onDeleteAccount($event: { value: Account }): void {
    this.accountService.deleteAccount($event.value).subscribe({
        next: (response: void) => {
          console.log(response);
          this.getAccounts();
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        }
      }
    )
  }
}
