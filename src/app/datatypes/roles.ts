export enum Roles{
  ROLE_USER,
  ROLE_MODERATOR,
  ROLE_ADMIN
}

export namespace Roles{
  export function getRoles(){
    const keys = Object.keys(Roles);
    return keys.slice((keys.length / 2), keys.length - 1);
  }
}
