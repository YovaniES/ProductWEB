import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DatePipe, DecimalPipe, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ProductsService } from 'src/app/core/services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalProductComponent } from './modal-product/modal-product.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'app-list-product',
    templateUrl: './list-product.component.html',
    styleUrls: ['./list-product.component.scss'],
    standalone: true,
    imports: [
        FormsModule,
        MatTooltipModule,
        ReactiveFormsModule,
        MatIconModule,
        NgIf,
        NgFor,
        MatProgressSpinnerModule,
        UpperCasePipe,
        NgxPaginationModule,
        DatePipe,
        DecimalPipe,
    ],
})
export class ListProductComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;
  loadingItem: boolean = false;
  productForm!: FormGroup;
  listCategories: any[] = [];
  listState: any[] = [];

  page = 1;
  totalProducts: number = 0;
  pageSize = 2;

  products: any[] = []

  constructor(
    private productsService: ProductsService,
    private fb: FormBuilder,
    public datepipe: DatePipe,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.newFilfroForm();
    this.getAllProd();
    // this.getAllProducts()
    this.getListCategories();
    this.getAllStates();
  }

  newFilfroForm(){
    this.productForm = this.fb.group({
      idProduct  : [''],
      name       : [''],
      price      : [''],
      category   : [''],
      state      : [''],
      create_date: [''],
    })
  };

  getAllProd(){
    this.blockUI.start('Cargando lista de productos...');

    this.productsService.getAllProd().subscribe((resp: any) => {
      console.log('LIST_PRODUCT =>', resp);
      this.blockUI.stop();

      this.products= resp;
    })
  }

  listProducts: any[] = []
  getAllProducts(){
    this.blockUI.start('Cargando lista de productos...');

    const formValues: any = {...this.productForm.value}

    const filtro = {
      producto      : formValues.product,
      categoria     : formValues.category,
      stock         : formValues.stock,
      estado        : formValues.state,
      precio        : formValues.price,
      fechaCreacion : formValues.create_date,
    }

    this.productsService.getAllProducts(filtro).subscribe((resp: any) => {
      console.log('LIST_PRODUCT_FILTRO', resp);
      this.blockUI.stop();

      this.listProducts= resp;
    })
  }

  deleteProduct(producto: any){
    Swal.fire({
      title:'¿Eliminar producto?',
      text: `¿Estas seguro que deseas eliminar el producto: ${producto.producto}?`,
      icon: 'question',
      confirmButtonColor: '#ec4756',
      cancelButtonColor: '##ff8e99',
      confirmButtonText: 'Si, Eliminar!',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed){
        this.productsService.deleteProduct(producto.id).subscribe(resp => {

          Swal.fire({
            title: 'Eliminar producto',
            text: `${producto.producto}, eliminado con exito`,
            icon: 'success',
          });
          this.getAllProducts()
        });
      };
    });
  }

  getAllStates(){
    this.listState = [
      { id: 0, nombre: 'Inactivo'},
      { id: 1, nombre: 'Activo'}]
  };

  getListCategories(){
    this.listCategories =[
      { id: 1,nombre: 'Educación'},
      { id: 2,nombre: 'Limpieza'},
      { id: 3,nombre: 'Tecnologico'},
      { id: 4,nombre: 'Otros'}
    ];
  }
  limpiarFiltro() {
    this.productForm.reset('', {emitEvent: false})
    this.newFilfroForm()

    this.getAllProducts();
  }

  totalfiltro = 0;
  cambiarPagina(event: number) {
    let offset = event*10;

    if (this.totalfiltro != this.totalProducts) {
      this.productsService.getAllProducts(offset.toString()).subscribe( (resp: any) => {
            this.listProducts = resp.list;
          });
    }
      this.page = event;
  };

  campoNoValido(campo: string): boolean {
    if (
      this.productForm.get(campo)?.invalid &&
      this.productForm.get(campo)?.touched
    ) {
      return true;
    } else {
      return false;
    }
  };

  openModalProduct(DATA?: any){
    console.log('MODAL');

    this.dialog.open(ModalProductComponent, {width:'65%', data: DATA})
      .afterClosed().subscribe(resp => {
      if (resp) {
        this.getAllProducts()
      }
    })
  };

}
