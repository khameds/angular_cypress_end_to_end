import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';


export class Pokemon {
  constructor(
    public id: string,
    public name: string,
    public imageUrl: string,
    public supertype: string) {
  }

  getX() {
    console.log("get x called")
  }
}

interface ReponseDuService {
  cards: any[]
}

@Injectable({
  providedIn: 'root'
})
export class PokemonService {


  private pokemons: BehaviorSubject<Pokemon[]> = new BehaviorSubject<Pokemon[]>([]);

  constructor(
    private http: HttpClient
  ) {

    this.fetchPokemonFromWebAPI()
      .subscribe((pokemons: Pokemon[]) => {
        this.pokemons.next(pokemons);
      });
  }

  add(pokemon: Pokemon) {
    this.pokemons.next([pokemon, ...this.pokemons.value]);

    // => local storage
    // => save in back POST
  }

  getAll(): Observable<Pokemon[]> {
    return this.pokemons;
  }

  private fetchPokemonFromWebAPI(): Observable<Pokemon[]> {
    return this.http.get<ReponseDuService>('https://api.pokemontcg.io/v1/cards')
      .pipe(
        tap(currentValue => console.log("valeur brute du serveur", currentValue)),
        map((response) => {
          const pokemons: Pokemon[] = [];

          for (const card of response.cards) {
            pokemons.push(new Pokemon(card.id, card.name, card.imageUrl, card.supertype))
          }

          return pokemons;
        }),
        tap(currentValue => console.log("valeur après conversion", currentValue)),
      );
  }
}
