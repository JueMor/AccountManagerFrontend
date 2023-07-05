export enum AccountFormMode {
  ADD,
  UPDATE
}

export namespace AccountFormMode{
  export function getAccountFormMode(){
    const keys = Object.keys(AccountFormMode);
    return keys.slice((keys.length / 2), keys.length - 1);
  }
}
