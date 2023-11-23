import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInput } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';
  @ViewChild('passwordInput') passwordInput: IonInput | undefined;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  doLogin() {
    if (this.username === 'usuario' && this.password === 'senha' || this.username === 'gabrieldossantosfigueiredo@gmail.com' && this.password === 'gabriel123' || this.username === 'filipegelista@gmail.com' && this.password === 'filipe123') {
      this.router.navigate(['/tab1']);
    } else {
      console.log('Credenciais inválidas');
    }
  }
  togglePasswordVisibility(input: IonInput) {
    if (input.type === 'password') {
      input.type = 'text';
    } else {
      input.type = 'password';
    }
  }

}
