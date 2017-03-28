const Pokemon = require('../class/pokemon');
const random = require('../modules/random');

class PokemonList  extends Array{

	add(name, level){
		let pokemon = new Pokemon (name, level); 
		this.push(pokemon);
	}
	
	show(){
		for (let pokemon of this){
			pokemon.show();
		}
	}
	
	max(){
		return this.reduce((prev, cur) => {
            return cur >= prev
                ? cur
                : prev;
		});
	}
	
	loadPokemon(pokemonsJson){
		pokemonsJson.map(
			obj => this.add(obj.name, obj.level)
		);
	}
	
	getRandomPokemon(){
		let length = (this.length > 0) ? this.length - 1 : 0;
        let index = random(0, length);
        return super.splice(index, 1)[0];
	}
	
	getPokemonCountSync(max_pokemon){
		let max;
		let res;
		(this.length > max_pokemon) ? max = max_pokemon : max = this.length;
		res = random(1, max);
		return res;
	}
}

module.exports = PokemonList;

