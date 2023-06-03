
// Class Definition
class Player {
	constructor(name) {
		this.name = name
	}
}

// Game class
export default class Game {
	constructor(name) {
		this.player = new Player(name)
		this.score = 0
	}

	displayQuestions(questions) {
		for (group in questions) {
			
		}
	}
}


