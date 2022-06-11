import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  username: string | null = localStorage.getItem('username');

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  public logout() {
    localStorage.clear();
    this.route.navigate(['/login']);
  }

}
