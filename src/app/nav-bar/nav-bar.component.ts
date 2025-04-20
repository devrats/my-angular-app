import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  constructor(private router: Router) {}

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  navigate(navigateTo: string) {
    this.router.navigate([`/${navigateTo}`]);
  }

}


