import { Component } from '@angular/core';
import { Pokemon, PokemonService } from '../pokemon.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { ValidationErrors } from '@angular/forms';

const pokemonNameValidator = (control: AbstractControl): ValidationErrors | null => {
  const name = control.value;
  const isValid = name && name.length >= 5 && name.toUpperCase() == name;

  let result: ValidationErrors | null = null;
  if (!isValid) {
    result = {
      pokemonName: {
        rules: 'should be 5 letters min and uppercase'
      }
    };
  }

  return result;
};

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent {

  pokemons: Observable<Pokemon[]>;
  form: FormGroup;

  constructor(
    private service: PokemonService,
    private fb: FormBuilder,
  ) {
    this.pokemons = service.getAll();

    this.form = this.fb.group({
      name: ['', pokemonNameValidator], 
      imageUrl: ['', Validators.required],
      supertype: ['Pokemon']
    });
  }

  sendForm() {
    console.log("form submitted valid=" + this.form.valid +  " - ", this.form.value);
    
    if (this.form.valid) {
      this.service.add(new Pokemon('id-' + Date.now(), this.form.value.name, this.form.value.imageUrl, this.form.value.supertype));
    } else {
      alert('form invalid');
    }
  }
}
