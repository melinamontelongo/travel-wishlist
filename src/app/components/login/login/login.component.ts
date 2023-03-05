import { Component, OnInit } from '@angular/core';
import { AuthService } from "src/app/services/auth.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMsg: string;
  constructor(public authService: AuthService){
    this.errorMsg = "";
  }
  ngOnInit(){}

  login(username: string, password: string): boolean {
    this.errorMsg = "";
    if(!this.authService.login(username, password)){
      this.errorMsg = "Login incorrecto";
      setTimeout(function() {
        this.errorMsg = "";
      }.bind(this), 2500);
    }
    return false;
  }
  
  logout(): boolean{
    this.authService.logout();
    return false;
  }
}
