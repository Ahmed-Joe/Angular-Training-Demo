import { Injectable } from '@angular/core';
import { Iproduct } from '../Models/iproduct';
import { IRoute } from 'express';

@Injectable({
  providedIn: 'root',
})
export class StaticProductsService {
  private prdList: Iproduct[];
  constructor() {
    this.prdList = [
      {
        id: '100',
        name: 'LenovoThinkPad laoptop',
        price: 100000000,
        quantity: 1,
        imgURL: 'https://picsum.photos/200/100',
        categoryID: 1,
      },
      {
        id: '101',
        name: 'Apple Macbook',
        price: 2007780,
        quantity: 0,
        imgURL: 'https://picsum.photos/200/100',
        categoryID: 1,
      },
      {
        id: '102',
        name: 'Lenovo Tab 2',
        price: 3000,
        quantity: 10,
        imgURL: 'https://picsum.photos/200/100',
        categoryID: 2,
      },
      {
        id: '103',
        name: 'Samsung Tab',
        price: 40.5,
        quantity: 2,
        imgURL: 'https://picsum.photos/200/100',
        categoryID: 2,
      },
      {
        id: '104',
        name: 'Samsung Note 10',
        price: 50000,
        quantity: 0,
        imgURL: 'https://picsum.photos/200/100',
        categoryID: 3,
      },
      {
        id: '105',
        name: 'Samsung S22 Ultra',
        price: 600,
        quantity: 1,
        imgURL: 'https://picsum.photos/200/100',
        categoryID: 3,
      },
    ];
  }
  getAllProducts(): Iproduct[] {
    return this.prdList;
  }
  getProductsByCatID(cID: number): Iproduct[] {
    if (cID == 0) return this.prdList;
    else return this.prdList.filter((prd) => prd.categoryID == cID);
  }
  getProductByID(pID: string): Iproduct | null {
    let foundProduct = this.prdList.find((prd) => prd.id == pID);
    return foundProduct ? foundProduct : null;
  }
  addNewProduct(prd: Iproduct) {
    this.prdList.push(prd);
  }
  getPrdIDs(): string[] {
    let prdID = this.prdList.map((prd) => prd.id);
    return prdID;
  }
}
