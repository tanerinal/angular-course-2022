import { ErrorHandler, Injectable } from "@angular/core";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    handleError(error: any): void {
        //throw new Error("Method not implemented.");
        console.log(error);        
    }
}