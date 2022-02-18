import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  soldProducts:any

  constructor(private service:LoginService) { }


  handleUpdateResponse(){
    console.log(this)
  }
  
  handleError(){
  
    console.log(this)
  }
  ngOnInit(): void {
      this.service.viewSoldProducts().subscribe(
        (res)=>{
          this.soldProducts=res
          console.log(this.soldProducts[0]['products'])
        }
      )
  }
  
}
