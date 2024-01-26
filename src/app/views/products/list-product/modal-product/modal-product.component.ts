import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import Swal from 'sweetalert2';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProductsService } from 'src/app/core/services/product.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-modal-product',
    templateUrl: './modal-product.component.html',
    styleUrls: ['./modal-product.component.scss'],
    standalone: true,
    imports: [
      MatIconModule,
      MatTooltipModule,
      NgFor,
      NgIf,
      FormsModule,
      ReactiveFormsModule,
    ]
})
export class ModalProductComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;
  loadingItem: boolean = false;
  product_Id: number = 0;
  listCategories: any[] = [];
  listState: any[] = [];


  constructor(
    private productsService : ProductsService,
    private fb              : FormBuilder,
    public datePipe         : DatePipe,
    private dialogRef: MatDialogRef<ModalProductComponent>,

    @Inject(MAT_DIALOG_DATA) public DATA_PRODUCT: any
  ){}

  ngOnInit(): void {
    this.newForm();
    this.getAllStates();
    this.gerListCategories();

    if (this.DATA_PRODUCT) {
      console.log('DATA', this.DATA_PRODUCT);

      this.product_Id = this.DATA_PRODUCT.id;
      this.getProductByID();
    }
  }

  productForm!: FormGroup;
  newForm(){
    this.productForm = this.fb.group({
      product    : ['', Validators.required],
      price      : ['', Validators.required],
      stock      : ['', Validators.required],
      category   : ['', Validators.required],
      state      : [''],
      create_date: [''],
    })
  }

  createOrUpdateProduct(){
    if (this.productForm.invalid) {
      return Object.values(this.productForm.controls).forEach((controls) => {
        controls.markAllAsTouched();
      })
    }

    if (this.DATA_PRODUCT) {
      console.log('A C T',);
      this.updateProduct();
    }else {
      console.log('C R E A R');
      this.createProduct();
    }
  }

  createProduct(): void{
    const formValues =  this.productForm.getRawValue();

     const request = {
        producto  : formValues.product,
        categoria : formValues.category,
        stock     : formValues.stock,
        estado    : formValues.state,
        precio    : formValues.price
     }

    this.productsService.createProduct(request).subscribe((resp: any) => {
      console.log('RESP-CREATE', resp);

      if (resp) {
        Swal.fire({
          title: 'Crear producto!',
          text : `${resp.producto}`,
          icon : 'success',
          confirmButtonText: 'Ok',
        });
        this.close(true);
      }
    })
  }

  updateProduct(){
    const formValues = {...this.productForm.value}

    const params = {
      producto   : formValues.product,
      categoria  : formValues.category,
      stock      : formValues.stock,
      estado     : formValues.state,
      precio     : formValues.price,
      antiguedad : ''
    }

    this.productsService.updateProduct(this.DATA_PRODUCT.id, params).subscribe((resp: any) => {
      if (resp) {
          Swal.fire({
            title: 'Actualizar producto!',
            text : `${resp.producto}, actualizado con exito`,
            icon : 'success',
            confirmButtonText: 'Ok',
          });
          this.close(true);
      }
    })
  }

  actionBtn: string = 'Crear';
  getProductByID(): void{
    this.blockUI.start("Cargando data...");
    if (this.DATA_PRODUCT) {
      this.actionBtn = 'Actualizar'
        this.blockUI.stop();
        this.productForm.reset({
          product    : this.DATA_PRODUCT.producto,
          price      : this.DATA_PRODUCT.precio,
          stock      : this.DATA_PRODUCT.stock,
          category   : this.DATA_PRODUCT.categoria,
          state      : this.DATA_PRODUCT.estado,
          create_date: this.DATA_PRODUCT.fechaCreacion
      })
    }
  }

  getAllStates(){
    this.listState = [
      { id: 0, nombre: 'Inactivo'},
      { id: 1, nombre: 'Activo'}]
  };

  gerListCategories(){
    this.listCategories =[
      { id: 1,nombre: 'Educación'},
      { id: 2,nombre: 'Limpieza'},
      { id: 3,nombre: 'tecnologico'},
      { id: 4,nombre: 'Otros'}
    ];
  }

  campoNoValido(campo: string): boolean {
    if (this.productForm.get(campo)?.invalid && this.productForm.get(campo)?.touched ) {
      return true;
    } else {
      return false;
    }
  }

  close(succes?: boolean) {
    this.dialogRef.close(succes);
  }


}

