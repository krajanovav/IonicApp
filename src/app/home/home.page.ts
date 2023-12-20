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
  pokemon: any[] = []; // Adjust the type accordingly based on the actual structure
  @ViewChild(IonInfiniteScroll) infinite!: IonInfiniteScroll;

  constructor(private pokeService: PokemonService) {}

  ngOnInit() {
    this.loadPokemon();
  }

  loadPokemon(loadMore = false, event?: any) {
    if (loadMore) {
      this.offset += 25;
    }

    this.pokeService.getPokemon(this.offset).subscribe((res: any[]) => {
      console.log("result: ", res);
      this.pokemon = [...this.pokemon, ...res];
      if (event) {
        event.target.complete();
      }
      if (this.offset == 125) {
        this.infinite.disabled = true;
      }
    });
  }

  onSearchChange(e: any) {
  let value = e.detail.value;

  if (value === "") {
    this.offset = 0;
    this.loadPokemon();
    return;
  }

  // Převedení vstupní hodnoty na malá písmena
  value = value.toLowerCase();

  this.pokeService.getCompletePokemonList().subscribe(
    (pokemons) => {
      // Filtrace pokémonů podle části zadaného názvu nebo indexu
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
