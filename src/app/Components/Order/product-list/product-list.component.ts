import { Component, OnInit } from '@angular/core';
import { Iproduct } from '../../../Models/iproduct';
import { ICategory } from '../../../Models/icategory';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  catList: ICategory[];
  prdList: Iproduct[];
  orderTotalPrice: number = 0;
  selectedCategoryID: number = 0;
  orderDate: Date;
  constructor() {
    this.catList = [
      { id: 1, name: 'Laptops' },
      { id: 2, name: 'Tablets' },
      { id: 3, name: 'Mobiles' },
    ];
    this.prdList = [
      {
        id: 100,
        name: 'LenovoThinkPad laoptop',
        price: 100000000,
        quantity: 1,
        imgURL: 'https://picsum.photos/200/100',
        categoryID: 1,
      },
      {
        id: 101,
        name: 'Apple Macbook',
        price: 2007780,
        quantity: 0,
        imgURL: 'https://picsum.photos/200/100',
        categoryID: 1,
      },
      {
        id: 102,
        name: 'Lenovo Tab 2',
        price: 3000,
        quantity: 10,
        imgURL: 'https://picsum.photos/200/100',
        categoryID: 2,
      },
      {
        id: 103,
        name: 'Samsung Tab',
        price: 40.5,
        quantity: 2,
        imgURL: 'https://picsum.photos/200/100',
        categoryID: 2,
      },
      {
        id: 104,
        name: 'Samsung Note 10',
        price: 50000,
        quantity: 0,
        imgURL: 'https://picsum.photos/200/100',
        categoryID: 3,
      },
      {
        id: 105,
        name: 'Samsung S22 Ultra',
        price: 600,
        quantity: 1,
        imgURL: 'https://picsum.photos/200/100',
        categoryID: 3,
      },
    ];
    this.orderDate = new Date();
  }
  ngOnInit(): void {}

  prdTrackByFn(index: number, prd: Iproduct): number {
    return prd.id;
  }

  buy(prdPrice: number, count: any) {
    // let itemsCount:number = count;
    // let itemsCount: number;
    // this.orderTotalPrice = parseInt(count) * prdPrice;
    // this.orderTotalPrice = Number(count) * prdPrice;
    // this.orderTotalPrice = (count as number) * prdPrice;
    this.orderTotalPrice = +count * prdPrice;
  }
}
