import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  baseUrl = 'https://pokeapi.co/api/v2';
  imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/';

  constructor(private http: HttpClient) {}

  // Metoda pro získání seznamu Pokémonů s omezením (offset) a mapováním na objekty s dalšími informacemi
  getPokemon(offset = 0): Observable<any[]> {
    // Získá data z API pro Pokémony s použitím HTTP GET requestu s daným offsetem a limit 25
    return this.http
      .get<any>(`${this.baseUrl}/pokemon?offset=${offset}&limit=25`)
      .pipe(
        // Mapování na pole objektů
        map((result: any) => {
          return result.results;
        }),
        // Mapování na pole objektů s dalšími informacemi
        map((pokemons: any[]) => {
          return pokemons.map((poke: any, index: number) => {
              // Přidání dalších informací k Pokémonovi, jako je obrázek a index
            poke.image = this.getPokeImage(offset + index + 1);
            poke.pokeIndex = offset + index + 1;
            return poke;
          });
        })
      );
  }
/**
 * Vytváří URL obrázku pro konkrétního Pokémona podle indexu.
 * */
  getPokeImage(index: number): string {
    // Sestavuje URL obrázku Pokémona na základě indexu
    return `${this.imageUrl}${index}.png`;
  }

  findPokemon(search: string): Observable<any> {
     // HTTP GET request na PokeAPI s hledaným jménem nebo ID
    return this.http.get<any>(`${this.baseUrl}/pokemon/${search}`).pipe(
       // Mapuje odpověď na objekt reprezentující hledaného Pokémona
      map((pokemon: any) => {
        // přidá info
        pokemon.image = this.getPokeImage(pokemon.id);
        pokemon.pokeIndex = pokemon.id;
        return pokemon;
      })
    );
  }

  getCompletePokemonList(): Observable<any[]> {
     // HTTP GET request na PokeAPI pro získání detailů
    return this.http
      .get<any>(`${this.baseUrl}/pokemon?limit=150`) // Nastavila jsem vyšší limit, aby získal všechny pokémony
      .pipe(
        // Mapuje výsledky API
        map((result: any) => {
          return result.results;
        }),
        // Mapuje pole Pokémonů
        map((pokemons: any[]) => {
           // Přidá další informace 
          return pokemons.map((poke: any, index: number) => {
            poke.image = this.getPokeImage(index + 1);
            poke.pokeIndex = index + 1;
            return poke;
          });
        })
      );
  }

  
  getPokeDetails(index: number): Observable<any> {
    //HTTP GET request na PokeAPI pro získání detailů 
    return this.http.get<any>(`${this.baseUrl}/pokemon/${index}`).pipe(
      map((poke: any) => {
         // Získá seznam všech sprites z objektu sprites
        let sprites = Object.keys(poke['sprites']);
        // Přidá obrázky Pokémona do nové vlastnosti images
        poke['images'] = sprites
          .map(spriteKey => poke['sprites'][spriteKey])
          .filter(img => img)
          .reverse(); // Obrácené pořadí obrázků
        return poke;
      })
    );
  }
  
}


