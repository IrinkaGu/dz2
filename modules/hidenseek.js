const PokemonList = require('../class/pokemonList');
const random = require('../modules/random');
const fs = require('fs');

let MAX_FOLDERS = 10;
let MAX_POKEMON = 3;
let FNAME = "pokemon.txt";

function hide(path, pokemonList, callback) {
	checkDir(path, (err) => { if(!err) {
		deleteOldFoldersSync(path);
		createFolders(path, (err) => {if(!err) {
			hidenPokemons(path, pokemonList, (err, pokemonsResult) =>{if(!err) {
				callback(null, pokemonsResult);
			} else {callback(err);}});
		} else {callback(err);}})
	} else { callback(err);}}) 
}

function deleteOldFoldersSync(path, callback){
	let ind = 0;
	for (let i = 1; i <= MAX_FOLDERS; i++){
		let curPath = getPath(path, i);
		if (fs.existsSync(curPath+"/"+FNAME)){
			fs.unlinkSync(curPath+"/"+FNAME);
		}
		if (fs.existsSync(curPath)){
			fs.rmdirSync(curPath);
		}
	}
}

function createFolders(path, callback){
	var ind = 0;
	for (let i = 1; i <= MAX_FOLDERS; i++){
		let curPath = getPath(path, i);
		fs.mkdir(curPath, (err) => {if(!err) {
			ind++;		
			if (ind == MAX_FOLDERS){				
				callback(null);
			}
		} else {callback(err);}});
	};
}

function hidenPokemons(path, pokemonList, callback){
	let pokemonCount = pokemonList.getPokemonCountSync(MAX_POKEMON);
	putPokemon(pokemonList, path, pokemonCount, (err, pokemonsResult) => {if(!err) {
		callback(null, pokemonsResult);
	} else {callback(err);}});		
}

function checkDir(path, callback) {  
  fs.stat(path, function(err, stats) {if (err) {
		fs.mkdir(path, callback);
    } else {callback(err);}});
}

function getPath(path, i){
	return path = path+"/"+getNameSync(i,2);
}

const getNameSync = (str, lenght) => {
    str = str.toString();
    return str.length < lenght ? ("0" + str) : str;
}

const getPathRandomSync = (max_folders) => {
	num = random(1, max_folders);
	return "/"+getNameSync(num,2)+"/"+FNAME;
}

function putPokemon(pokemonList, path, pokemonCount, callback){
	let main_path = path;
	let pokemonsResult = new PokemonList();
	for (let i = 1; i <= pokemonCount; i++){
		do {
			path = main_path+getPathRandomSync(MAX_FOLDERS);
		} while (fs.existsSync(path))
			
		let pokemon = pokemonList.getRandomPokemon();		
		let text = pokemon.name+"|"+pokemon.level;
		var ind = 0;
		fs.open(path, "w+", 0644, function(err, file_handle) {if (!err) {
			fs.write(file_handle, text, null, 'utf8', function(err, written) {
				if (err) {
					callback(err);
				} else {
					ind++;
					pokemonsResult.add(pokemon.name, pokemon.level);
					if (ind == pokemonCount){
						callback(null, pokemonsResult);
					}
				}
			});
		} else {callback(err);}});
	}
}

function seek (path, callback){
	fs.readdir(path, (err) => {if(!err) {
		findsPokemon(path, (err, pokemonsFinds) => {
			callback(null, pokemonsFinds);
		});		
	} else {callback(err);}})
}

function findsPokemon(path, callback){
	let pokemonsFinds = new PokemonList();
	var ind_finds = 0;
	var ind_read = 0;
	for (let i = 1; i <= MAX_FOLDERS; i++){
		let curFile = getPath(path, i)+"/"+FNAME;
		if (fs.existsSync(curFile)){
			fs.readFile(curFile, (err, data) => {if (!err) {
				ind_read++;
				let split = data.toString().split("|");		
				pokemonsFinds.add(split[0], split[1]);								
				if (ind_finds == ind_read){
					callback(null, pokemonsFinds);
				}
			} else {callback(err);}})
			ind_finds++;
		}
	}
}

module.exports =  {
	hide,
	seek
}