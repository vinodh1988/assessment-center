import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Assessment Center';

  showNav = true;

  constructor(private router: Router,private login:LoginService) {
  
    // Subscribe to route changes
    this.login.event$.subscribe(
       (data:boolean) => this.showNav=data
   
    )
    this.login.getStatus()
  }
  onSignOut() {
     sessionStorage.clear()
     this.router.navigate([""])
     location.reload()
  }
}
