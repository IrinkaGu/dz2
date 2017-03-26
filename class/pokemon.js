class Pokemon {
	constructor(name, level){
		this.name = name;
		this.level = level;
	}
	
	show(){
		let info = this.name+" - "+this.level;
		console.log(info);
	}
	
	valueOf() {
        return this.level;
	}
}

module.exports = Pokemon;