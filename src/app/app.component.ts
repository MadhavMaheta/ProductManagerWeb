import { Component } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Product Manager';

  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  constructor(private router: Router){
  }
  
  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

  isCheckoutRoute() {
		if (localStorage.getItem('currentUserToken') != null) {
			return true;
		}
    else{
      return false;
    }
	}

  LogOut(){
    localStorage.removeItem('currentUserToken');
    this.router.navigate(['login']);
  }
}
