const fs = require('fs');
const random = require('../modules/random');

let fname = "pokemon.txt";

function putPokemon(pokemon, path){
	let text = pokemon.name+"|"+pokemon.level;
	fs.open(path, "w+", 0644, function(err, file_handle) {
		if (!err) {
			fs.write(file_handle, text, null, 'utf8', function(err, written) {
				if (err) {
					console.log("Произошла ошибка при записи");
				}
			});
		} else {
			console.log("Произошла ошибка при открытии");
		}
	});
}

function deleteFiles(path, max_folders){
	for (let i = 1; i <= max_folders; i++){
		let curPath = getPath(path, i);
		if (fs.existsSync(curPath+"/"+fname)){
			fs.unlink(curPath+"/"+fname);
		}
	}
}

function checkDir(path, callback) {  
  fs.stat(path, function(err, stats) {
    if (err) {
      fs.mkdir(path, callback);
    } else {
      callback(err);
    }
  });
}


function createFoldersSync(path, max_folders){
	for (let i = 1; i <= max_folders; i++){
		let curPath = getPath(path, i);
		if (!fs.existsSync(curPath)){
			fs.mkdirSync(curPath);
		}
	}
}

const getNameSync = (str, lenght) => {
    str = str.toString();
    return str.length < lenght ? ("0" + str) : str;
}

const getPathRandomSync = (max_folders) => {
	num = random(1, max_folders);
	return "/"+getNameSync(num,2)+"/"+fname;
}

function readPokemonSync(path){
	curFile = path+"/"+fname;
	if (fs.existsSync(curFile)){
		let content = fs.readFileSync(curFile);
		let split = content.toString().split("|");		
		return split;
    }	else {
		return false;
	}
}

function getPath(path, i){
	return path = path+"/"+getNameSync(i,2);
}

module.exports = {
	putPokemon,
	checkDir,
	createFoldersSync,
	getNameSync,
	getPathRandomSync,
	deleteFiles,
	readPokemonSync,
	getPath
}