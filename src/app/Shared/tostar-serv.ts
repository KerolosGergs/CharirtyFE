import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class TostarServ {
  constructor(private toastr: ToastrService) {}

 showSuccess(text :string) {
    this.toastr.success(text, 'نجاح');
  }

  showError(text:string) {
    this.toastr.error(text, 'خطأ');
  }
}
