import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Swiper, SwiperModule } from 'swiper/types';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { DetailsPageRoutingModule } from './details-routing.module';

import { DetailsPage } from './details.page';
  
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsPageRoutingModule,
    IonicModule.forRoot()
  ],
  declarations: [DetailsPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DetailsPageModule {}
