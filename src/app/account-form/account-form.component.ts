import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Account} from "../datatypes/account";
import {Roles} from "../datatypes/roles";
import {ConfirmedValidator} from "../customvalidators/ConfirmedValidator";

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.css']
})
export class AccountFormComponent implements OnChanges {

  public accountForm: FormGroup;

  public roles: string[];

  @Input() updateAccount: Account | undefined;
  @Input() deleteAccount: Account | undefined;

  @Output() addAccountEvent = new EventEmitter();
  @Output() updateAccountEvent = new EventEmitter();
  @Output() deleteAccountEvent = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.accountForm = this.generateAccountForm();
    this.roles = Roles.getRoles();
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (propName == "updateAccount") {
        this.updateAccountForm(this.updateAccount);
      }
      if (propName == "deleteAccount") {
        this.updateAccountForm(this.deleteAccount);
      }
    }
  }

  private generateAccountForm(): FormGroup {
    return this.fb.group({
        role: [[], [Validators.required]],
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
        password: ["", [Validators.pattern('^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[a-zA-Z0-9@$!%*?&]{8,})$')]],
        confirmPassword: [""],
      }
      , {
        validators: ConfirmedValidator('password', 'confirmPassword')
      })
  }

  private updateAccountForm(account: Account | undefined): void {
    this.accountForm.patchValue({
      role: [account?.role],
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

  get firstName() {
    return this.accountForm.get("name")?.get("firstName");
  }

  public onAddAccount(accountForm: FormGroup): void {
    this.addAccountEvent.emit(accountForm);
  }

  public onUpdateAccount(accountForm: FormGroup): void {
    this.updateAccountEvent.emit(accountForm);
  }

  public onDeleteAccount(accountForm: FormGroup): void {
    this.deleteAccountEvent.emit(accountForm);
  }
}
