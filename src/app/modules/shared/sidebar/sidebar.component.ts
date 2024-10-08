import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  
  LogOut(){
    localStorage.removeItem('currentUserToken');
    localStorage.removeItem('loggedInUserId');
    localStorage.removeItem('productId');
    localStorage.removeItem('productQuantity');
    this.router.navigate(['login']);
  }
}
