
declare const require: any;

export function initExternals(production: boolean) {
  (window as any).ng = {} as any;
  (window as any).ng.core = require('@angular/core');
  (window as any).ng.forms = require('@angular/forms');
  (window as any).ng.common = require('@angular/common');
  (window as any).ng.common.http = require('@angular/common/http');
  (window as any).ng.common.locales = {};
  (window as any).ng.common.locales.pt = require('@angular/common/locales/pt');
  (window as any).ng.router = require('@angular/router');
  (window as any).ng.platformBrowser = require('@angular/platform-browser');
  (window as any).ng.platformBrowser = require('@angular/platform-browser');
  (window as any).ng.animations = require('@angular/animations');
  (window as any).ng.cdk = require('@angular/cdk');
  (window as any).ng.fire = require('@angular/fire');
  (window as any).ng.fire.firestore = require('@angular/fire/firestore');
  (window as any)['@angular/flex-layout'] = require('@angular/flex-layout');
  (window as any).ng.material = require('@angular/material');
  (window as any).ng.material.toolbar = require('@angular/material/toolbar');
  (window as any).ng.material.icon = require('@angular/material/icon');
  (window as any).ng.material.button = require('@angular/material/button');
  (window as any).ng.material.progressBar = require('@angular/material/progress-bar');
  (window as any).ng.material.paginator = require('@angular/material/paginator');
  (window as any).ng.material.progressSpinner = require('@angular/material/progress-spinner');
  (window as any).ng.material.select = require('@angular/material/select');
  (window as any).ng.material.list = require('@angular/material/list');
  (window as any).ng.material.expansion = require('@angular/material/expansion');
  (window as any).ng.material.stepper = require('@angular/material/stepper');
  (window as any).ng.material.checkbox = require('@angular/material/checkbox');
  (window as any).ng.material.sort = require('@angular/material/sort');
  (window as any).ng.material.table = require('@angular/material/table');
  (window as any).ng.material.dialog = require('@angular/material/dialog');
  (window as any).ng.material.tooltip = require('@angular/material/tooltip');
  (window as any).ng.material.formField = require('@angular/material/form-field');
  (window as any).ng.material.input = require('@angular/material/input');
  (window as any).ng.material.card = require('@angular/material/card');
  (window as any).ng.material.divider = require('@angular/material/divider');
  (window as any).ng.material.gridList = require('@angular/material/grid-list');
  (window as any).ng.material.tabs = require('@angular/material/tabs');
  (window as any).ng.material.core = require('@angular/material/core');
  (window as any).ng.material.menu = require('@angular/material/menu');
  (window as any).ng.material.chips = require('@angular/material/chips');
  (window as any).ng.material.snackBar = require('@angular/material/snack-bar');
  (window as any).ng.material.sidenav = require('@angular/material/sidenav');
  (window as any).ng.material.datepicker = require('@angular/material/datepicker');
  (window as any).ng.material.radio = require('@angular/material/radio');
  (window as any).ng.material.buttonToggle = require('@angular/material/button-toggle');
  (window as any).ng.cdk = require('@angular/cdk');
  (window as any).ng.cdk.dragDrop = require('@angular/cdk/drag-drop');
  (window as any).ng.flexLayout = require('@angular/flex-layout');
  (window as any).ng.flexLayout.flex = require('@angular/flex-layout/flex');
  (window as any).rxjs = require('rxjs');
  (window as any).rxjs.operators = require('rxjs/operators');
  // (window as any).firebase = require('firebase');


  if (!production) {
    (window as any).ng.platformBrowserDynamic = require('@angular/platform-browser-dynamic');
    (window as any).ng.compiler = require('@angular/compiler');
  }
}
