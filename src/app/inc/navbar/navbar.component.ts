import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { Bilgiler } from 'src/model/IUserLogin';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  bilgiler :Bilgiler = {
    userId: '',
    userName: '',
    userSurname: '',
    userEmail: '',
    userPhone: '',
    face: '',
    faceID: ''
  }

  constructor(private accountService :AccountService) { 
    const userInfo = this.accountService.loginControl()
    
    if (userInfo) {
      this.bilgiler = userInfo
    }
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.accountService.logout()
  }
}
