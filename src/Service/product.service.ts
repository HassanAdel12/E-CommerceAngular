import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly DB_URL = "http://localhost:65323/api/Products";

  constructor(private readonly myClient:HttpClient) { }

  getAllProducts(){
    return this.myClient.get(this.DB_URL);
  }

  getProductByID(Code:any){
    return this.myClient.get(this.DB_URL+"/"+Code);
  }

  AddNewProduct(student:any){
    return this.myClient.post(this.DB_URL,student);
  }

  updateProduct(Code:any,student:any){
    return this.myClient.put(this.DB_URL+"/"+Code,student);
  }

  deleteProduct(Code:any){
    return this.myClient.delete(this.DB_URL+"/"+Code);
  }

}
