import { Injectable } from '@angular/core';
import * as CryptoJs from 'crypto-js'
import { secretKey } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppcryptoService {

  constructor() { }

  encrypt(plainText: string): string {
    return CryptoJs.AES.encrypt(plainText, secretKey).toString()    
  }

  decrypt(cipherText: string): string {
    return CryptoJs.AES.decrypt(cipherText, secretKey).toString(CryptoJs.enc.Utf8)    
  }
}
