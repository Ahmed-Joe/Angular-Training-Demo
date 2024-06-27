import { Component } from '@angular/core';
import { StoreData } from '../../ViewModels/store-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  storeInfo: StoreData;
  isImgShown: boolean = true;
  constructor() {
    this.storeInfo = new StoreData(
      'ITI Store',
      'https://picsum.photos/200/100',
      ['Cairo', 'Alex', 'Seuz']
    );
  }
  toggelImage() {
    this.isImgShown = !this.isImgShown;
  }
}
