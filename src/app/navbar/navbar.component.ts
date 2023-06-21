import {Component, inject} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {MatDialog} from "@angular/material/dialog";
import {LoginFormComponent} from "../login-form/login-form.component";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  private breakpointObserver = inject(BreakpointObserver);

  private loggedIn = false;

  constructor(public dialog: MatDialog,
              public router: Router) {
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  openLoginForm() {
    let loginForm = this.dialog.open(LoginFormComponent);
    loginForm.componentInstance.loginAccountEvent.subscribe({
      next: (value: boolean) => {
        if (value){
          this.router.navigate(['/overview']).then();
        }
      },
      error: (error: any) => console.log(error)
    })
  }
}
