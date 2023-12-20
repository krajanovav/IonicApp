import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import { IonicSlides } from '@ionic/angular';
import { SwiperModule } from 'swiper/types/shared';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  details: any;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    autoplay: {
      delay: 500, // Specify the delay in milliseconds between each slide
      disableOnInteraction: false, // Set to false to continue auto-swiping after user interaction
    }
  }; 

  constructor(private route: ActivatedRoute, private pokeService: PokemonService) { }

  ngOnInit() {
    let index = +this.route.snapshot.paramMap.get('index')!.toString() || 0;
    
    this.pokeService.getPokeDetails(index).subscribe(details => {
      this.details = details;
    });
  }
}
