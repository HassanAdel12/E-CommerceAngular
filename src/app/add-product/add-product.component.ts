import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../../Service/product.service';
import { HttpClientModule } from '@angular/common/http';
import { AccountService } from '../../Service/account.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule

  ],
  providers: [ProductService,AccountService],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {

  Products: any;
  contain = true;
  imageUrl: string | ArrayBuffer | null = null;


  ProductForm = new FormGroup({
    code: new FormControl("", [Validators.required]),
    name: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    description: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(500)]),
    price: new FormControl("", [Validators.required, Validators.min(0), Validators.max(1000000)]),
    category: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    minimumQuantity: new FormControl("", [Validators.required, Validators.min(0), Validators.max(1000000)]),
    discountRate: new FormControl("", [Validators.required, Validators.min(0), Validators.max(1000000)])
  })

  constructor(private readonly ProductService: ProductService, private router: Router ,private data: AccountService) {


  }

  ImageInput(event: any): void {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
        localStorage.setItem('ProductImage', this.imageUrl as string);
      };
      reader.readAsDataURL(file);
    } else {
      // Reset input and display error message
      event.target.value = null;
      this.imageUrl = null;
      alert('Please select a valid image file.');
    }
  }

  ngOnInit(): void {
    if (!this.data.isAuthenticated()) {
      this.router.navigate(['/Login']);
    } else {
      this.ProductService.getAllProducts().subscribe({
        next: (data) => {
          this.Products = data;
        },
        error: (err) => {
          this.router.navigate(['/Error', { errormessage: err.message as string }]);
        }
      })
    }
  }

  checkID() {
    this.contain = true;

    for (const p of this.Products) {
      if (p.code == this.ProductForm.controls.code.value as string) {
        this.contain = false;
      }
    }
  }

  AddStudent() {

    if (this.ProductForm.valid && this.contain) {
      let newProduct = {
        code: this.ProductForm.controls.code.value as string,
        name: this.ProductForm.controls.name.value as string,
        description: this.ProductForm.controls.description.value as string,
        price: this.ProductForm.controls.price.value as string,
        image: localStorage.getItem('ProductImage'),
        category: this.ProductForm.controls.category.value as string,
        minimumQuantity: this.ProductForm.controls.minimumQuantity.value as string,
        discountRate: this.ProductForm.controls.discountRate.value as string,
      };

      this.ProductService.AddNewProduct(newProduct).subscribe();

      this.router.navigate(['/Home']);
    }

  }

}
