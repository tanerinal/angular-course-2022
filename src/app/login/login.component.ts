import { HttpClient, HttpParams } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { IUserLogin } from 'src/model/IUserLogin';
import { AccountService } from '../services/account.service';
import { AppcryptoService } from '../services/appcrypto.service';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {
  //viewEmailInput :HTMLInputElement = ViewChild('refEmail')
  @ViewChild('refEmail') viewEmailInput!: ElementRef
  @ViewChild('refPassword') viewPasswordInput!: ElementRef

  isFormSubmitted: boolean = false
  isFormDataValid: boolean = true

  formLoginGroup = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)]),
    remember: new FormControl(false)
  })

  formOnSubmit = () => {
    this.isFormSubmitted = true
    this.isFormDataValid = true
    if (this.formLoginGroup.valid) {
      console.log(this.formLoginGroup.value);
      const { email, password, remember } = this.formLoginGroup.value

      /*  if (email === 'asd@asd.com' && password === '123') {
         this.router.navigate(['dashboard'])
       } else {
         this.isFormDataValid = false
       } */

      const url: string = 'https://www.jsonbulut.com/json/userLogin.php'
      const sendParams = {
        ref: 'd1becef32825e5c8b0fc1b096230400b',
        userEmail: email,
        userPass: password,
        face: 'no'
      }

      const httpParams = new HttpParams()
        .set('ref', 'd1becef32825e5c8b0fc1b096230400b')
        .set('userEmail', email!) //! işrareti email kesinlikle dolu demek.
        .set('userPass', password!)
        .set('face', 'no')

      const newThis = this
      this.http.get<IUserLogin>(url, { params: httpParams }).subscribe({
        next(res) {
          /* console.log(res);          
          const obj = res as any
          console.log(obj.user[0].durum); */

          const user = res.user[0]
          /* console.log(user.durum);
          
          if (user.bilgiler) {
            console.log(user.bilgiler.userName);
          } */

          if (user.durum && user.bilgiler) {
            //newThis.isFormDataValid = true
            const userAsString = JSON.stringify(user.bilgiler)
            //sessionStorage.setItem('user', userAsString) 
            const encrypedUserInfo = newThis.cryptoService.encrypt(userAsString)
            sessionStorage.setItem('user', encrypedUserInfo)
            //newThis.router.navigate(['dashboard'])

            if (remember === true) {
              localStorage.setItem('user', encrypedUserInfo)
            }

            window.location.href = '/dashboard'
          } else {
            newThis.isFormDataValid = false
            newThis.viewEmailInput.nativeElement.focus()
          }

        },
        error(err) {
          console.log(err);
        },
      })
    }
  }

  constructor(private formBuilder: FormBuilder,
    private accountService: AccountService,
    private http: HttpClient,
    private cryptoService: AppcryptoService,
    private seoService: SeoService) {

    this.seoService.setTitle("User Login");
    this.seoService.setMeta("Login Page Detail");

    if (accountService.isLoggedIn()) {
      window.location.href = '/dashboard'
    }

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.viewEmailInput.nativeElement.focus()
  }
}
