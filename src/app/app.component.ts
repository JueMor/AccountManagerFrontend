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
export class AppComponent {
  title = 'AccountManagerFront';

  constructor(private accountService: AccountService) {
  }

  public onAddAccount($event: { value: Account; }): void {
    this.accountService.addAccount($event.value).subscribe({
        next: (response: Account) => {
          console.log(response);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      }
    )
  }
}
