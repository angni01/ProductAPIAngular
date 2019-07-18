import { Component, OnInit } from '@angular/core';
import { ProductServices } from './product.services';
import { IProduct } from './product';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: any[];
  imageUrl : string;
  newProduct : any = {};
  productForm: FormGroup;
  mode : string = "Create";
  constructor(private productService: ProductServices, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initProductForm(true);
    this.displayProduct();
    console.log(this.products);
  }
  displayProduct(){
    this.initProductForm(true);
    this.productService.getProduct()
    .subscribe(data => {
      this.products = data
    });
  }
  initProductForm(isNew: boolean) {
    if (isNew) {
      this.productForm = this.formBuilder.group({
        id: [''],
        name: ['', Validators.required],
        description: [''],
        imageUrl: [''],
        price: ['']
      });
    } else {
      this.productForm = this.formBuilder.group({
        id: [this.newProduct.id],
        name: [this.newProduct.name],
        description: [this.newProduct.description],
        imageUrl: [this.newProduct.imageUrl],
        price: [this.newProduct.price]
      });
    }
  }
  assignProductFormValue(isNew: boolean) {
    const formValues = Object.assign({}, this.productForm.value);

    if (isNew) {
      this.newProduct = {}
      this.newProduct.name = formValues['name'];
      this.newProduct.description = formValues['description'];
      this.newProduct.imageUrl = formValues['imageUrl'];
      this.newProduct.price = formValues['price'];
    } else {
      this.newProduct = {}
      this.newProduct.id = formValues['id'];
      this.newProduct.name = formValues['name'];
      this.newProduct.description = formValues['description'];
      this.newProduct.imageUrl = formValues['imageUrl'];
      this.newProduct.price = formValues['price'];

    }
  }
  addProduct() {
    this.assignProductFormValue(true)
    this.productService.addProduct(this.newProduct)
      .subscribe(data => {
        this.initProductForm(true);
        this.displayProduct();
      });
    console.log(this.productForm.value)
  }
  updateProduct() {
    this.assignProductFormValue(false);
    this.productService.updateProduct(this.newProduct)
      .subscribe(data => {
        this.initProductForm(true);
        this.displayProduct();
        this.mode = "Create";
  })
  }
  submitForm() {
    if (this.mode == "Create") {
      this.addProduct()
    } else {
      this.updateProduct()
    }
  }
  showEditDetails(product: any) {
    //this.isVisible = !this.isVisible;
    this.mode = "Edit";
    this.newProduct.id = product.id;
    this.newProduct.name = product.name;
    this.newProduct.description = product.description;
    this.newProduct.price = product.price;
    this.newProduct.imageUrl = product.imageUrl;
    this.initProductForm(false);
  }
  deleteProduct(id: number) {
    if (confirm('Do you want to delete this product?')) {
      this.productService.deleteProduct(id)
        .subscribe(data => { alert('deleted'), this.displayProduct() });
    } else {
      alert('canceled deletion')
    }

  }
}
