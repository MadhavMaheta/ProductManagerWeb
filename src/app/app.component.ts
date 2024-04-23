import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
// export class AppComponent {
//   title = 'Product Manager';

//   isExpanded = true;
//   showSubmenu: boolean = false;
//   isShowing = false;
//   showSubSubMenu: boolean = false;
//   isSidebarPinned = false;
//   isSidebarToggeled = false;

//   constructor(private router: Router){
//   }

//   mouseenter() {
//     if (!this.isExpanded) {
//       this.isShowing = true;
//     }
//   }

//   mouseleave() {
//     if (!this.isExpanded) {
//       this.isShowing = false;
//     }
//   }

//   isCheckoutRoute() {
// 		if (localStorage.getItem('currentUserToken') != null) {
// 			return true;
// 		}
//     else{
//       return false;
//     }
// 	}

//   getClasses() {
//     const classes = {
//       'pinned-sidebar': this.isSidebarPinned,
//       'toggeled-sidebar': this.isSidebarToggeled
//     }
//     return classes;
//   }

//   toggleSidebar() {
//     this.isSidebarToggeled = ! this.isSidebarToggeled;
//   }

//   toggleSidebarPin() {
//     this.isSidebarPinned = ! this.isSidebarPinned;
//   }

//   LogOut(){
//     localStorage.removeItem('currentUserToken');
//     this.router.navigate(['login']);
//   }
// }

export class AppComponent {
  title = 'material-responsive-sidenav';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile = true;
  isCollapsed = true;

  constructor(private observer: BreakpointObserver, private router: Router) { }

  ngOnInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if (screenSize.matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }

  isCheckoutRoute() {
    if (localStorage.getItem('currentUserToken') != null) {
      return true;
    }
    else {
      return false;
    }
  }

  isCheckSidebarVisiblity(){
    if (localStorage.getItem('currentUserToken') != null && localStorage.getItem("loggedInUserRole") === "Admin") {
      return true;
    }
    else {
      return false;
    }
  }

  toggleMenu() {
    if (this.isMobile) {
      this.sidenav.toggle();
      this.isCollapsed = false;
    } else {
      this.sidenav.open();
      this.isCollapsed = !this.isCollapsed;
    }
  }

  LogOut() {
    localStorage.removeItem('currentUserToken');
    localStorage.removeItem('loggedInUserId');
    this.router.navigate(['login']);
  }
}