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

  getPokemon(offset = 0): Observable<any[]> {
    return this.http
      .get<any>(`${this.baseUrl}/pokemon?offset=${offset}&limit=25`)
      .pipe(
        map((result: any) => {
          return result.results;
        }),
        map((pokemons: any[]) => {
          return pokemons.map((poke: any, index: number) => {
            poke.image = this.getPokeImage(offset + index + 1);
            poke.pokeIndex = offset + index + 1;
            return poke;
          });
        })
      );
  }

  getPokeImage(index: number): string {
    return `${this.imageUrl}${index}.png`;
  }

  findPokemon(search: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/pokemon/${search}`).pipe(
      map((pokemon: any) => {
        pokemon.image = this.getPokeImage(pokemon.id);
        pokemon.pokeIndex = pokemon.id;
        return pokemon;
      })
    );
  }

  getCompletePokemonList(): Observable<any[]> {
    return this.http
      .get<any>(`${this.baseUrl}/pokemon?limit=150`) // Nastavte vyšší limit, aby získal všechny pokémony
      .pipe(
        map((result: any) => {
          return result.results;
        }),
        map((pokemons: any[]) => {
          return pokemons.map((poke: any, index: number) => {
            poke.image = this.getPokeImage(index + 1);
            poke.pokeIndex = index + 1;
            return poke;
          });
        })
      );
  }

  
  getPokeDetails(index: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/pokemon/${index}`).pipe(
      map((poke: any) => {
        let sprites = Object.keys(poke['sprites']);
        poke['images'] = sprites
          .map(spriteKey => poke['sprites'][spriteKey])
          .filter(img => img)
          .reverse(); // Obrácené pořadí obrázků
        return poke;
      })
    );
  }
  
}


