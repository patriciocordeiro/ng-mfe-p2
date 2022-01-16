import { Component, OnDestroy, OnInit } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { Menu } from './shared/interfaces/menu';
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
    private firestore: Firestore,
    private menuService: MenuService,
    private router: Router
  ) {
    this.subscription = new Subscription();
  }


  ngOnInit(): void {
    this.subscription.add(this.menuService.handleRedirectOnReload(this.router).subscribe());
    this.getMenu();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getMenu() {
    const col = collection(this.firestore, 'menu');
    this.menuItems$ = collectionData(col).pipe(
      mergeMap((e) => this.menuService.addMenuToRouterConfig(e as Menu[]))
    );
  }

}
