import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  viewChild,
  ɵrestoreComponentResolutionQueue,
} from '@angular/core';
import { Iproduct } from '../../../Models/iproduct';
import { ICategory } from '../../../Models/icategory';
import { StaticProductsService } from '../../../Services/static-products.service';
import { Router } from '@angular/router';
import { ProductsService } from '../../../Services/products.service';
import { subscribe } from 'diagnostics_channel';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnChanges, OnInit {
  // prdList: Iproduct[];
  prdListOfCat: Iproduct[] = [];
  @Input() sentCatID: number = 0;
  @Output() totalPriceChanged: EventEmitter<number>;
  orderTotalPrice: number = 0;
  orderDate: Date;
  // selectedCatID: number = 0;
  // catList: ICategory[];
  constructor(
    private prdService: ProductsService,
    // private staticPrdService: StaticProductsService,
    private router: Router
  ) {
    this.totalPriceChanged = new EventEmitter<number>();
    // this.catList = [
    //   { id: 1, name: 'Laptops' },
    //   { id: 2, name: 'Tablets' },
    //   { id: 3, name: 'Mobiles' },
    // ];
    // this.prdList = [
    //   {
    //     id: 100,
    //     name: 'LenovoThinkPad laoptop',
    //     price: 100000000,
    //     quantity: 1,
    //     imgURL: 'https://picsum.photos/200/100',
    //     categoryID: 1,
    //   },
    //   {
    //     id: 101,
    //     name: 'Apple Macbook',
    //     price: 2007780,
    //     quantity: 0,
    //     imgURL: 'https://picsum.photos/200/100',
    //     categoryID: 1,
    //   },
    //   {
    //     id: 102,
    //     name: 'Lenovo Tab 2',
    //     price: 3000,
    //     quantity: 10,
    //     imgURL: 'https://picsum.photos/200/100',
    //     categoryID: 2,
    //   },
    //   {
    //     id: 103,
    //     name: 'Samsung Tab',
    //     price: 40.5,
    //     quantity: 2,
    //     imgURL: 'https://picsum.photos/200/100',
    //     categoryID: 2,
    //   },
    //   {
    //     id: 104,
    //     name: 'Samsung Note 10',
    //     price: 50000,
    //     quantity: 0,
    //     imgURL: 'https://picsum.photos/200/100',
    //     categoryID: 3,
    //   },
    //   {
    //     id: 105,
    //     name: 'Samsung S22 Ultra',
    //     price: 600,
    //     quantity: 1,
    //     imgURL: 'https://picsum.photos/200/100',
    //     categoryID: 3,
    //   },
    // ];
    // this.prdListOfCat = this.prdList;
    this.orderDate = new Date();
  }

  prdTrackByFn(index: number, prd: Iproduct): string {
    return prd.id;
  }

  buy(prdPrice: number, count: any) {
    // let itemsCount:number = count;
    // let itemsCount: number;
    // this.orderTotalPrice = parseInt(count) * prdPrice;
    // this.orderTotalPrice = Number(count) * prdPrice;
    // this.orderTotalPrice = (count as number) * prdPrice;
    this.orderTotalPrice += +count * prdPrice;
    //Excute the event
    this.totalPriceChanged.emit(this.orderTotalPrice);
  }

  openPrdDetails(prdID: number) {
    // this.router.navigateByUrl('/Products/' + prdID)
    this.router.navigate(['/Products', prdID]);
  }

  // private filterProductsByCatID() {
  //   if (this.sentCatID == 0) this.prdListOfCat = this.prdList;
  //   else
  //     this.prdListOfCat = this.prdList.filter(
  //       (prd) => prd.categoryID == this.sentCatID
  //     );
  // }
  ngOnChanges(): void {
    // this.filterProductsByCatID();
    // this.prdListOfCat = this.staticPrdService.getProductsByCatID(
    // this.sentCatID
    // );
    this.prdService.getProductsByCatID(this.sentCatID).subscribe((Products) => {
      this.prdListOfCat = Products;
    });
  }
  ngOnInit(): void {
    // this.prdListOfCat = this.staticPrdService.getAllProducts();
    this.prdService.getAllProducts().subscribe((Products) => {
      this.prdListOfCat = Products;
    });
  }
}
