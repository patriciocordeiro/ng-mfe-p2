import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { ActivatedRoute, NavigationStart, Route, Router } from '@angular/router';
import { loadModule } from 'projects/shell-app/src/app/shared/utils/load-module.util';
import { from, Observable } from 'rxjs';
import { filter, map, mergeMap, takeLast, tap, toArray } from 'rxjs/operators';

import { NavMenu } from '../interfaces/nav-menu';

@Injectable({
  providedIn: 'root'
})
export class NavMenuService {

  currentURL: string = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private firestore: Firestore,
  ) { }

  getMenu() {
    const col = collection(this.firestore, 'menu');
    return collectionData(col).pipe(
      mergeMap((e) => this.addMenuToRouterConfig(e as NavMenu[]))
    );
  }

  addMenuToRouterConfig(menuList: NavMenu[]): Observable<Route[]> {
    return from(menuList).pipe(
      map(item => {
        const route: Route = this.builDynamicRoutesFromMicroFrontend(item);
        this.router.config = [...this.router.config, route];
        return this.router.config;
      }
      ),
      takeLast(1),
      toArray())
      .pipe(
        tap(() => {
          this.redirectHandler(menuList);
        }),
        map(res => res[0])
      );
  }

  builDynamicRoutesFromMicroFrontend(item: NavMenu): Route {
    return {
      path: item.path, loadChildren: () => loadModule(item.mfeURL).then(m => m[item.libName][item.module]),
      data: {
        title: item.title,
      }
    };
  }

  redirectHandler(menuList: NavMenu[]) {
    const firstPageToLoad = menuList.filter(e => e.isFirstPage)[0];

    if (this.currentURL) {
      this.router.navigate([`./${this.currentURL}`], { relativeTo: this.activatedRoute, replaceUrl: true });
    } else {
      this.router.navigate([`./${firstPageToLoad.path}`], { relativeTo: this.activatedRoute, replaceUrl: true });
    }
  }

  handleRedirectOnReload(router: Router) {
    return router.events
      .pipe(filter((rs): rs is NavigationStart => rs instanceof NavigationStart))
      .pipe(tap(event => {
        if (event.id === 1 && event.url != '/') {
          this.currentURL = event.url;
          this.router.navigate(['/'], { relativeTo: this.activatedRoute });
        }
      }));
  }

}
