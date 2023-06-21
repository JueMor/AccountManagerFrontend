import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginRequest} from "../payload/request/LoginRequest";
import {HttpErrorResponse} from "@angular/common/http";
import {AccountService} from "../account.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  public loginForm: FormGroup;

  @Output() loginAccountEvent = new EventEmitter();

  constructor(private dialogRef: MatDialogRef<LoginFormComponent>,
              private fb: FormBuilder,
              private accountService: AccountService) {
    this.loginForm = this.generateLoginForm();
  }

  private generateLoginForm(): FormGroup {
    return this.fb.group({
        username: ["", Validators.required],
        password: ["", [Validators.required]],
      }
    )
  }

  public login($event: { value: LoginRequest; }): void {
    this.accountService.login($event.value).subscribe({
        next: (response: any) => {
          console.log(response.headers.get('Authorization'));
          console.log(response.headers)
          localStorage.setItem('token', response.headers.get('Authorization'))

          this.dialogRef.close();
          this.loginAccountEvent.emit(true);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      }
    )
  }
}
