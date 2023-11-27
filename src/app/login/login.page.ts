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

  constructor(private router: Router) {}

  ngOnInit() {}

  doLogin() {
    const trimmedUsername = this.username.trim();
    const trimmedPassword = this.password.trim();

    if (!trimmedUsername || !trimmedPassword) {
      console.log('Por favor, preencha todos os campos.');
      return;
    }

    if (
      (trimmedUsername === 'usuario' && trimmedPassword === 'senha') ||
      (trimmedUsername === 'gabrieldossantosfigueiredo@gmail.com' && trimmedPassword === 'gabriel123') ||
      (trimmedUsername === 'filipegelista@gmail.com' && trimmedPassword === 'filipe123')
    ) {
      this.router.navigate(['/tab1']);
    } else {
      console.log('Credenciais inválidas');
    }
  }

  togglePasswordVisibility(input: IonInput) {
    input.type = input.type === 'password' ? 'text' : 'password';
  }
}
