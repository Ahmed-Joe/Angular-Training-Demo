import { Component } from '@angular/core';
import { Iproduct } from '../../Models/iproduct';
import { ProductsService } from '../../Services/products.service';
import { Router } from '@angular/router';
import { error } from 'console';
import { ICategory } from '../../Models/icategory';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent {
  catList: ICategory[];
  newPrd: Iproduct = {} as Iproduct;
  constructor(private prdService: ProductsService, private router: Router) {
    this.catList = [
      { id: 1, name: 'Laptops' },
      { id: 2, name: 'Tablets' },
      { id: 3, name: 'Mobiles' },
    ];
  }
  addProduct() {
    // const prd: Iproduct = {
    //   id: '100',
    //   name: 'New Tablet',
    //   price: 100,
    //   quantity: 10,
    //   categoryID: 2,
    //   imgURL: '',
    // };

    // this.prdService.addProduct(prd).subscribe((prd) => {
    //   alert('Producted Add Successfuly'); // not recommended
    //   // use instead Toast, BS Alert, SnackBar BT
    //   this.router.navigateByUrl('/Products');
    // });

    const observer = {
      next: (prd: Iproduct) => {
        alert('Producted Add Successfuly'); // not recommended
        // use instead Toast, BS Alert, SnackBar BT
        this.router.navigateByUrl('/Products');
      },
      error: (err: Error) => {
        alert(err.message);
      },
    };

    this.prdService.addProduct(this.newPrd).subscribe(observer);
  }
}
