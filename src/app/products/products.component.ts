import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
idFormControl = new FormControl('', [Validators.required]);
titleFormControl = new FormControl('', [Validators.required]);
priceFormControl = new FormControl('', [Validators.required]);
stockFormControl = new FormControl('', [Validators.required]);


matcher = new MyErrorStateMatcher();
products:any=[]
productById:any=[]
constructor(private productservice: ProductService){

}
getProducts(){
 this.productservice.getProducts('https://dummyjson.com/products').subscribe((res:any)=>{
  this.products =res.products
  // console.log(this.products)

 })
}
edit(id:any){
  this.products.forEach((element:any) => {
    if(id===element.id){
      this.productById= element
    }
  });
}
editProduct(){
  this.products.forEach((element:any) => {

    if(this.idFormControl.value===element.id){
      console.log(element.id)

      element.id=this.idFormControl.value,
      element.title=this.titleFormControl.value,
      element.price=this.priceFormControl.value,
      element.stock=this.stockFormControl.value
    }
  })
}
deleteProduct(id:any){
  this.products.pop(id)
}
addProduct(){
 this.products.push({
  id:this.idFormControl.value,
  title:this.titleFormControl.value,
  price:this.priceFormControl.value,
  stock:this.stockFormControl.value,  
 })
}
  ngOnInit(){
    this.getProducts()
  }
}
