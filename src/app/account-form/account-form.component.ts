import {ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Account} from "../datatypes/account";
import {Roles} from "../datatypes/roles";
import {ConfirmedValidator} from "../customvalidators/ConfirmedValidator";
import {AccountFormMode} from "./mode/AccountFormMode";
import {AccountService} from "../account.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.css']
})
export class AccountFormComponent {

  public accountForm: FormGroup;

  public roles: string[];

  @Input() mode: AccountFormMode = AccountFormMode.ADD;

  @Output() submitted: EventEmitter<boolean> = new EventEmitter();

  constructor(private cd: ChangeDetectorRef,
              private fb: FormBuilder,
              private accountService: AccountService) {
    this.accountForm = this.generateAccountForm();
    this.roles = Roles.getRoles();
  }

  public setAccount(account: Account) {
    this.updateAccountForm(account)
  }

  private generateAccountForm(): FormGroup {
    return this.fb.group({
        roles: [[], [Validators.required]],
        username: ["", Validators.required],
        name: this.fb.group({
          firstName: ["", [Validators.required]],
          lastName: ["", [Validators.required]],
        }),
        address: this.fb.group({
          city: ["", [Validators.required]],
          street: ["", [Validators.required]],
          postCode: ["", [Validators.required]],
        }),
        email: ["", Validators.email],
        phoneNumber: "",
        dob: ["", [Validators.required]],
        password: ["", [Validators.required, Validators.pattern('^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[a-zA-Z0-9@$!%*?&]{8,})$')]],
        confirmPassword: [""],
      }
      , {
        validators: ConfirmedValidator('password', 'confirmPassword')
      })
  }

  private updateAccountForm(account: Account | undefined): void {
    console.log(account)
    this.accountForm.patchValue({
      roles: [account?.roles],
      username: account?.username,
      name:
        {
          firstName: account?.name?.firstName,
          lastName: account?.name?.lastName,
        },
      address: {
        city: account?.address?.city,
        street: account?.address?.street,
        postCode: account?.address?.postCode,
      },
      email: account?.email,
      phoneNumber: account?.phoneNumber,
      dob: account?.dob,
      password: account?.password,
    });
  }

  compareRoles(role_1: any, role_2: any): boolean {
    for (let role of role_2) {
      if (role_1 === role) {
        return true
      }
    }

    return false;
  }

  get firstName() {
    return this.accountForm.get("name")?.get("firstName");
  }

  public onAddOrUpdateAccount($event: { value: Account; }): void {
    if(this.mode === AccountFormMode.ADD){
      this.accountService.addAccount($event.value).subscribe({
          next: (response: Account) => {
            console.log(response);
          },
          error: (error: HttpErrorResponse) => {
            console.log(error.message);
          }
        }
      )
    } else {
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
  }

  protected readonly AccountFormMode = AccountFormMode;
}
