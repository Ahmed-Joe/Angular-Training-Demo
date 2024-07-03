import { Component, OnDestroy, OnInit, asNativeElements } from '@angular/core';
import { StoreData } from '../../ViewModels/store-data';
import { PromotionAdsService } from '../../Services/promotion-ads.service';
import { error } from 'console';
import { Subscription, catchError, filter, map, of, retry } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  // subscribtion!: Subscription;
  private subscribtions: Subscription[] = [];
  storeInfo: StoreData;
  isImgShown: boolean = true;
  constructor(private promoAds: PromotionAdsService) {
    this.storeInfo = new StoreData(
      'ITI Store',
      'https://picsum.photos/200/100',
      ['Cairo', 'Alex', 'Seuz']
    );
  }
  ngOnInit(): void {
    // ## Fisrt Method
    // let observer = {
    //   next: (data:string) => {
    //     console.log(data)
    //   },
    //   error: (err:string) => {
    //     console.log(err)
    //   },
    //   complete: () => {
    //     console.log("Ads finished")
    //   },
    // };
    // this.promoAds.getSchaduledAds(3).subscribe(observer);
    // ## Second Method
    // let adsSubscription: Subscription = this.promoAds.getSchaduledAds(3).subscribe({
    // this.subscribtion = this.promoAds.getSchaduledAds(3).subscribe({
    // ##################################################################
    // ##################################################################
    // let adsSubscription = this.promoAds.getSchaduledAds(3).subscribe({
    //   next: (data: string) => {
    //     console.log(data);
    //   },
    //   error: (err: string) => {
    //     console.log(err);
    //   },
    //   complete: () => {
    //     console.log('Ads finished');
    //   },
    // });

    let observer = {
      next: (data: string) => {
        console.log(data);
      },
      error: (err: string) => {
        console.log(err);
      },
      complete: () => {
        console.log('Ads finished');
      },
    };
    // let filterObservable = this.promoAds.getSchaduledAds(3).pipe(
    //   retry(3),
    //   catchError(val=> of(`there is an Error ${val}`))
    // );
    let filterObservable = this.promoAds.getSchaduledAds(3).pipe(
      filter((ad) => ad.includes('white friday')),
      map((ad) => 'Ad: ' + ad)
    );
    let adsSubscription = filterObservable.subscribe(observer);
    this.subscribtions.push(adsSubscription);
    // ##################################################################
    // let sub = this.promoAds.getSerialAds().subscribe((ad) => {
    //   console.log(ad);
    // });
    // this.subscribtions.push(sub);
    // ##################################################################
    // adsSubscription.unsubscribe();
    // ## This syntax is deprecated
    // this.promoAds.getSchaduledAds(3).subscribe(
    //   (data)=>{},
    //   (err)=>{},
    //   ()=>{}
    // )
    // ## If it for Next only it's okay to use it
    // this.promoAds.getSchaduledAds(3).subscribe((data) => {
    //   console.log(data);
    // });
  }
  toggelImage() {
    this.isImgShown = !this.isImgShown;
  }
  ngOnDestroy(): void {
    // this.subscribtion.unsubscribe();
    for (let subscription of this.subscribtions) {
      subscription.unsubscribe();
    }
  }
}
