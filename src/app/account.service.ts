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
  private apiAccount = environment.apiAccountUrl;

  constructor(private http: HttpClient) {
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public login(data: LoginRequest): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.apiServerUrl}/${this.apiAccount}/auth/signin`, data);
  }

  public getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.apiServerUrl}/${this.apiAccount}/user/`);
  }

  public addAccount(account: Account) :Observable<Account>{
    alert(JSON.stringify(account))
    return this.http.post<Account>(`${this.apiServerUrl}/${this.apiAccount}/user/`, account);
  }

  public updateAccount(account: Account) :Observable<Account>{
    return this.http.put<Account>(`${this.apiServerUrl}/${this.apiAccount}/user/`, account);
  }

  public deleteAccount(account: Account) :Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/${this.apiAccount}/${account.email}`);
  }
}
