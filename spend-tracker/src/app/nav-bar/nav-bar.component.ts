import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRouteLink, UserNameKey } from '../model/constants';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  username: string | null = localStorage.getItem(UserNameKey);

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  public logout() {
    localStorage.clear();
    this.route.navigate([LoginRouteLink]).then(() => {
      window.location.reload();
    });
  }

}
