import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  public loginForm: FormGroup;

  @Output() loginAccountEvent = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.loginForm = this.generateLoginForm();
  }

  private generateLoginForm(): FormGroup {
    return this.fb.group({
        username: ["", Validators.required],
        password: ["", [Validators.required]],
      }
    )
  }

  public onLogin(accountForm: FormGroup): void {
    this.loginAccountEvent.emit(accountForm);
  }
}
