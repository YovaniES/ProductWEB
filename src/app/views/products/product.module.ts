import { NgModule } from '@angular/core';
import { BlockUIModule } from 'ng-block-ui';
import { MatDialogModule } from '@angular/material/dialog';
import { ListProductComponent } from './list-product/list-product.component';


@NgModule({
    imports: [
      MatDialogModule,
      BlockUIModule.forRoot(),
      ListProductComponent,
],
providers:[]
})
export class ProductModule { }
