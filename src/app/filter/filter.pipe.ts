import {Pipe, PipeTransform} from '@angular/core';
import {Account} from "../datatypes/account";

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(accounts: Account[], filterText: string) {
    if (accounts.length === 0 || filterText === '') {
      return accounts;
    }
    return accounts.filter((account => {
      return FilterPipe.checkFirstName(account, filterText) || FilterPipe.checkLastName(account, filterText);
    }))
  }

  private static checkFirstName(account: Account, filterText: string) : boolean {
    return account.name.firstName.toLowerCase().includes(filterText.toLowerCase());
  }

  private static checkLastName(account: Account, filterText: string) :boolean {
    return account.name.lastName.toLowerCase().includes(filterText.toLowerCase());
  }
}
