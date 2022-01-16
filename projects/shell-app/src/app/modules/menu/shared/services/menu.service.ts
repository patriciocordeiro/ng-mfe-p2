import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationStart, Route, Router } from '@angular/router';
import { loadModule } from 'projects/shell-app/src/app/shared/utils/modules-loader.util';
import { from, Observable } from 'rxjs';
import { filter, map, takeLast, tap, toArray } from 'rxjs/operators';

import { Menu } from '../interfaces/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {


  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  currentURL = '';

  set currentRouterURL(currentURL: string) {
    this.currentURL = currentURL;

  }

  addMenuToRouterConfig(menuList: Menu[]): Observable<Route[]> {
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


  builDynamicRoutesFromMicroFrontend(item: Menu): Route {
    return {
      path: item.path, loadChildren: () => loadModule(item.mfeURL).then(m => m[item.libName][item.module]),
      data: {
        title: item.title,
      }
    };
  }

  redirectHandler(menuList: Menu[]) {
    const firstPageToLoad = menuList.filter(e => e.isFirstPage)[0];

    if (this.currentURL) {
      this.router.navigate([`./${this.currentURL}`], { relativeTo: this.activatedRoute, replaceUrl: true });
    } else {
      this.router.navigate([`./${firstPageToLoad}`], { relativeTo: this.activatedRoute, replaceUrl: true });
    }

  }



  handleRedirectOnReload(router: Router) {
    return router.events
      .pipe(filter((rs): rs is NavigationStart => rs instanceof NavigationStart))
      .pipe(tap(event => {

        if (
          event.id === 1
        ) {
          if (event.url != '/') {
            this.currentRouterURL = event.url;
            this.router.navigate(['/'], { relativeTo: this.activatedRoute, replaceUrl: true, skipLocationChange: true });

          }
        }
      }));
  }


}
