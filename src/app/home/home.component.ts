import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../../Service/product.service';
import { HttpClientModule } from '@angular/common/http';
import { ChangeColorDirective } from '../../Directives/change-color.directive';
import { AccountService } from '../../Service/account.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HttpClientModule,
    RouterModule,
    ChangeColorDirective

  ],
  providers: [ProductService,AccountService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  image:any;

  Products:any = [];
  constructor(private ProductService:ProductService , private router: Router,private data: AccountService){ }

  ngOnInit(): void {
    if (!this.data.isAuthenticated()) {
      this.router.navigate(['/Login']);
  } else {
    this.image = localStorage.getItem('ProductImage');
    this.ProductService.getAllProducts().subscribe({
      next:(data)=>{
        this.Products = data;
      },
      error:(err)=>{
        this.router.navigate(['/Error',{errormessage : err.message as string}]);
      }
    })
  }
    
  }

  


  delete(Code:any){
    
    this.ProductService.deleteProduct(Code).subscribe();

    this.image = localStorage.getItem('ProductImage');
    
    this.ProductService.getAllProducts().subscribe({
      next:(data)=>{
        this.Products = data;
      },
      error:(err)=>{
        this.router.navigate(['/Error',{errormessage : err.message as string}]);
      }
    })
  }

  
  
}
