const files = require('../modules/files');
const PokemonList = require('../class/pokemonList');
const fs = require('fs');

let MAX_FOLDERS = 10;
let MAX_POKEMON = 3;

function hide(path, pokemonList, callback) {
	files.checkDir(path, (err) => {
		if(!err) {
			files.createFoldersSync(path, MAX_FOLDERS);
			pokemonListRes = hidenPokemonsSync(path, pokemonList);
			callback(null, pokemonListRes);
		} else {
			callback(err);
		}
	});
}

function hidenPokemonsSync(path, pokemonList){
	files.deleteFiles(path, MAX_FOLDERS);
	let pokemonCount = pokemonList.getPokemonCountSync(MAX_POKEMON);
	let pokemonsResult = new PokemonList();
	let path_main = path;
	for (let i = 1; i <= pokemonCount; i++){
		do {
			path = path_main+files.getPathRandomSync(MAX_FOLDERS);
		} while (fs.existsSync(path))
		pokemon = pokemonList.getRandomPokemon();
		pokemonsResult.add(pokemon.name, pokemon.level);
		files.putPokemon(pokemon, path);
		
	}
	return pokemonsResult;
}

function seek (path, callback){
	fs.readdir(path, (err, files) => {
		if(!err) {
			pokemonsFinds = findsPokemonSync(path);
			callback(null, pokemonsFinds);
		} else {
			callback(err);
		}
	})
}

function findsPokemonSync(path){
	let pokemonsResult = new PokemonList();
	for (let i = 1; i <= MAX_FOLDERS; i++){
		curPath = files.getPath(path, i);
		let param = files.readPokemonSync(curPath);
		if (param){
			pokemonsResult.add(param[0], param[1]);
		}
	}
	return pokemonsResult;
}

module.exports =  {
	hide,
	seek
}