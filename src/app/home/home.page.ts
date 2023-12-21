import { Component, OnInit, ViewChild } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { IonInfiniteScroll } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  offset = 0;
  pokemon: any[] = []; // Pole obsahující načtené Pokémony
  //reference 
  @ViewChild(IonInfiniteScroll) infinite!: IonInfiniteScroll;

  constructor(private pokeService: PokemonService) {}

  ngOnInit() {
    // Načte prvních 25 Pokémonů
    this.loadPokemon();
  }

  //volá se při infinitescroll
  loadPokemon(loadMore = false, event?: any) {
    if (loadMore) {
       // Zvýší offset pro načítání Pokémonů
      this.offset += 25;
    }
    //načtení pokemonu s offsetem
    this.pokeService.getPokemon(this.offset).subscribe((res: any[]) => {
      console.log("result: ", res);
    //přidá nové pokemony
      this.pokemon = [...this.pokemon, ...res];
    //konec infinite scroll, když jsou načteni všichni pokemoni 
      if (event) {
        event.target.complete();
      }
      //zakaz infinite scroll když je dosaženo max počet
      if (this.offset == 125) {
        this.infinite.disabled = true;
      }
    });
  }
  //vyhledávání
  onSearchChange(e: any) {
  let value = e.detail.value;
//reset ofset, načte pokemony
  if (value === "") {
    this.offset = 0;
    this.loadPokemon();
    return;
  }

  // Převedení vstupní hodnoty na malá písmena, aby nám to našlo v api
  value = value.toLowerCase();

  this.pokeService.getCompletePokemonList().subscribe(
    (pokemons) => {
      // Filtrace pokémonů podle části zadaného stringu nebo indexu
      this.pokemon = pokemons.filter(
        (pokemon) =>
          pokemon.name.includes(value) || String(pokemon.pokeIndex).includes(value)
      );
    },
    (err) => {
      console.error(err);
      this.pokemon = [];
    }
  );
}
 

  // Metoda pro obnovení stránky
  reloadPage() {
    window.location.reload();
  }
}
