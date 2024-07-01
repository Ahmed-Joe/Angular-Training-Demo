import { Component, OnInit, numberAttribute } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StaticProductsService } from '../../Services/static-products.service';
import { Iproduct } from '../../Models/iproduct';
import { Location } from '@angular/common';
// import { Router } from 'express';
import { Router } from '@angular/router';
import { arrayBuffer } from 'stream/consumers';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  currPrdID: number = 0;
  prd: Iproduct | null = null;
  prdIDsArr: number[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private prdService: StaticProductsService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.prdIDsArr = this.prdService.getPrdIDs();
    // this.currPrdID = Number(this.activatedRoute.snapshot.paramMap.get('pid'));
    // console.log(this.currPrdID);

    // this.prd = this.prdService.getProductByID(this.currPrdID);

    // When Navigate To The Same Component, WILL NOT Reload Component
    // Even If There Is Chanes In The Route Parameters.
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.currPrdID = Number(paramMap.get('pid'));
      this.prd = this.prdService.getProductByID(this.currPrdID);
    });
  }
  goBack() {
    // window.history.back();
    this.location.back();
  }
  prevPrd() {
    let currIndex = this.prdIDsArr.findIndex((elem) => elem == this.currPrdID);
    // console.log(currIndex);
    let pervPrdID;
    if (currIndex > 0) {
      pervPrdID = this.prdIDsArr[currIndex - 1];
      this.router.navigate(['/Products', pervPrdID]);
    }
  }

  nextPrd() {
    let currIndex = this.prdIDsArr.findIndex((elem) => elem == this.currPrdID);
    let nextPrdID;
    if (currIndex < this.prdIDsArr.length) {
      nextPrdID = this.prdIDsArr[currIndex + 1];
      this.router.navigate(['/Products', nextPrdID]);
    }
  }
}
