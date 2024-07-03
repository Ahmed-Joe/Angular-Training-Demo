import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PromotionAdsService {
  private adsList: string[];
  constructor() {
    this.adsList = [
      'Big discount',
      'Sale up to 50%',
      'Check our white friday offers',
      // '',
      'Special white friday offers up to 70%',
    ];
  }
  getSchaduledAds(intervalInSeconds: number): Observable<string> {
    return new Observable<string>((observer) => {
      // observer.next();
      // observer.error();
      // observer.complete();
      let counter = 0;
      let adsTimer = setInterval(() => {
        if (counter == this.adsList.length) {
          observer.complete();
        }
        if (this.adsList[counter] == '') {
          observer.error('Error: Empty Ad.');
        } // error will stop the observe
        observer.next(this.adsList[counter]);
        counter++;
      }, intervalInSeconds * 1000);
      return {
        unsubscribe() {
          // # unsubscribe will be called in 3 cases
          // ### [1] Error
          // ### [2] Complete
          // ### [3] Unsubscribe()
          clearInterval(adsTimer);
          console.log('Unsubscribe');
        },
      };
    });
  }

  getSerialAds(): Observable<string> {
    // return of("Ad1","Ad2","Ad3"); // accept list of times
    return from(this.adsList);
  }
}
