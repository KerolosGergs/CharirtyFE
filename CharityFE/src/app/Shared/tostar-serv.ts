import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class TostarServ {
  showInfo(arg0: string) {
    throw new Error('Method not implemented.');
  }
  constructor(private toastr: ToastrService) {}

 showSuccess(text :string) {
    this.toastr.success(text, 'نجاح');
  }

  showError(text:string) {
    this.toastr.error(text, 'خطأ');
  }
}
