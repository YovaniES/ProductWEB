import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductModule } from './views/products/product.module';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: true,
    imports: [
      RouterOutlet,
      ProductModule
    ],
})
export class AppComponent {
  title = 'ProductWeb';
}
