import {Component, OnInit} from '@angular/core';
import {Account} from "../datatypes/account";
import {HttpErrorResponse} from "@angular/common/http";
import {AccountService} from "../account.service";
import {AccountFormComponent} from "../account-form/account-form.component";
import {MatDialog} from "@angular/material/dialog";
import {AccountFormMode} from "../account-form/mode/AccountFormMode";
import {Roles} from "../datatypes/roles";


@Component({
  selector: 'app-account-overview',
  templateUrl: './account-overview.component.html',
  styleUrls: ['./account-overview.component.css']
})
export class AccountOverviewComponent implements OnInit {
  public accounts?: Account[];
  public updateAccount: Account | undefined;
  public deleteAccount: Account | undefined;

  searchText: any = "";

  constructor(private accountService: AccountService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getAccounts();
  }

  public getAccounts(): void {
    this.accountService.getAccounts().subscribe({
        next: (response: Account[]) => {
          this.accounts = response;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      }
    );
  }

  public onUpdateAccountButtonPressed(account: Account): void {
    this.updateAccount = account;
  }

  public onUpdateAccount($event: { value: Account }): void {
    this.accountService.updateAccount($event.value).subscribe({
        next: (response: Account) => {
          console.log(response);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.message);
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
          console.log(error.message);
        }
      }
    )
  }

  openAccountForm(mode: AccountFormMode, account: null | Account) {
    let accountForm = this.dialog.open(AccountFormComponent);
    accountForm.componentInstance.mode = mode;
    accountForm.componentInstance.setAccount(account)
    accountForm.componentInstance.submitted.subscribe({
      next: (value: boolean) => {
        if (value) {
          this.getAccounts();
        }
      },
      error: (error: any) => console.log(error)
    })
  }

  protected readonly AccountFormMode = AccountFormMode;
}
