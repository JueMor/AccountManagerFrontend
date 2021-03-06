import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Account} from "./datatypes/account";
import {environment} from "../environments/environment";
import {LoginRequest} from "./payload/request/LoginRequest";
import {JwtResponse} from "./payload/response/JwtResponse";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public login(data: LoginRequest): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.apiServerUrl}/api/auth/signin`, data);
  }

  public getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.apiServerUrl}/account/all`);
  }

  public addAccount(account: Account) :Observable<Account>{
    alert(JSON.stringify(account))
    return this.http.post<Account>(`${this.apiServerUrl}/account/add`, account);
  }

  public updateAccount(account: Account) :Observable<Account>{
    return this.http.put<Account>(`${this.apiServerUrl}/account/update`, account);
  }

  public deleteAccount(account: Account) :Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/account/delete/${account.email}`);
  }
}
