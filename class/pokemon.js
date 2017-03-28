class Pokemon {
	constructor(name, level){
		this.name = name;
		this.level = level;
	}
	
	show(){
		console.log(`${this.name} - ${this.level}`);
	}
	
	valueOf() {
        return this.level;
	}
}

module.exports = Pokemon;