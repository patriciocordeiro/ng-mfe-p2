import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { MenuService } from './shared/services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {

  menuItems$!: Observable<any[]>;
  subscription!: Subscription;

  constructor(
    private menuService: MenuService,
    private router: Router
  ) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.subscription.add(this.menuService.handleRedirectOnReload(this.router).subscribe());
    this.menuItems$ = this.menuService.getMenu();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }



}
