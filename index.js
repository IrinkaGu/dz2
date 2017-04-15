const fs = require('fs');
const PokemonList = require('./class/pokemonList');
const hidenseek = require('./modules/hidenseek');

const pokemons = require('./data/pokemons');

pokemonList = new PokemonList();
pokemonList.loadPokemon(pokemons);

path = "./field";

hidenseek.hide(path, pokemonList, (err, pokemonsResult)=> {if(!err) {
	console.log('Спрятали:');
	pokemonsResult.show();
	hidenseek.seek(path, (err, pokemonsFinds)=> {if(!err) {
		console.log('Найдены:');
		pokemonsFinds.show();	
	} else {console.log(err);}});
} else {console.log(err);}});


