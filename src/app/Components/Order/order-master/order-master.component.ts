import {
  AfterViewInit,
  Component,
  ElementRef,
  OnChanges,
  SimpleChanges,
  ViewChild,
  viewChild,
} from '@angular/core';
import { ICategory } from '../../../Models/icategory';
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  selector: 'app-order-master',
  templateUrl: './order-master.component.html',
  styleUrl: './order-master.component.scss',
})
export class OrderMasterComponent implements AfterViewInit {
  catList: ICategory[];
  // selectedCategoryID: number = 0;
  selectedCategoryID: number = 0;
  receivedOrderTotalPrice: number = 0;
  // clientNameInpElem: ElementRef = new ElementRef(); // that is the worst way to initialze it
  // clientNameInpElem: ElementRef = {} as ElementRef; // it is better than the first but not the best
  // clientNameInpElem: ElementRef | undefined = undefined // this option is similer to the last one
  // clientNameInpElem: ElementRef | null = null
  // clientNameInpElem?: ElementRef // ? mean optional
  @ViewChild('clientNameInp') clientNameInpElem!: ElementRef; // non-null assertion operator (means it will never be null something will be send)
  @ViewChild(ProductListComponent) prdListCompObj!: ProductListComponent;
  constructor() {
    this.catList = [
      { id: 1, name: 'Laptops' },
      { id: 2, name: 'Tablets' },
      { id: 3, name: 'Mobiles' },
    ];
  }
  ngAfterViewInit(): void {
    this.clientNameInpElem.nativeElement.value = 'Enter Your Name Here';
    this.clientNameInpElem.nativeElement.style.border = '2px solid red';
  }
  onTotalPriceChanged(totalPrice: number) {
    this.receivedOrderTotalPrice = totalPrice;
  }
  completeOrder() {
    this.prdListCompObj.prdList[0].quantity -= 1;
  }
}
