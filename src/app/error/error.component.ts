import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent {

  err:any;

  constructor(private Actived : ActivatedRoute){
    this.err = this.Actived.snapshot.paramMap.get("errormessage");
   }
   
}
