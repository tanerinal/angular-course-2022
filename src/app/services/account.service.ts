import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppcryptoService } from './appcrypto.service';
import { Bilgiler } from '../../model/IUserLogin';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private router :Router, private cryptoService :AppcryptoService) {  }

  loginControl() :Bilgiler|null {
    const sessionUserInfoCipher = sessionStorage.getItem('user')
    const localStorageUserInfoCipher = localStorage.getItem('user')
    const userInfoCipher = sessionUserInfoCipher ? sessionUserInfoCipher : localStorageUserInfoCipher

    if (userInfoCipher) {
      try {
        const userInfo = JSON.parse(this.cryptoService.decrypt(userInfoCipher)) as Bilgiler
        return userInfo  
      } catch (error) {
        console.log(error);
        sessionStorage.removeItem('user')
        return null
      }      
    } else {
      this.router.navigate([''])
      return null
    }
  }

  isLoggedIn() :boolean {
    return this.loginControl() ? true : false
  }

  logout() :void {
    sessionStorage.removeItem('user')
    localStorage.removeItem('user')
    window.location.href = '/'
  }
}
