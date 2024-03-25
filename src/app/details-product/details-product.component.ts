import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../Service/product.service';
import { AccountService } from '../../Service/account.service';

@Component({
  selector: 'app-details-product',
  standalone: true,
  imports: [
    HttpClientModule,

  ],
  providers: [ProductService,AccountService],
  templateUrl: './details-product.component.html',
  styleUrl: './details-product.component.css'
})
export class DetailsProductComponent {

  image: any;
  Code: any;
  Product: any;

  constructor(private ProductService: ProductService, private router: Router, private Actived: ActivatedRoute ,private data: AccountService) {
    this.Code = this.Actived.snapshot.params["Code"];
  }

  ngOnInit(): void {
    if (!this.data.isAuthenticated()) {
      this.router.navigate(['/Login']);
    } else {
      this.image = localStorage.getItem('ProductImage');
      this.ProductService.getProductByID(this.Code).subscribe({
        next: (data) => {
          this.Product = data;
        },
        error: (err) => {
          this.router.navigate(['/Error', { errormessage: err.message as string }]);
        }
      })
    }
  }

  backToHome() {
    this.router.navigate(['/Home']);
  }
}
