import { Routes } from '@angular/router';
import { ListProductComponent } from './views/products/list-product/list-product.component';

export const routes: Routes = [
  // { path: 'menu',
  //   loadChildren: () => import('./views/auth/product.routes').then((m) => m.routes),
  // },

  {
    path: '',
    children: [
      { path: 'product', component: ListProductComponent },
      { path: '**', redirectTo: 'product' },
    ],
  },

];
