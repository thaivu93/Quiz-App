import Game from "./game"

export default class App {
	constructor(container) {
		this.state = 'start'
		this.container = container
	}

	init() {
		const main = `
			<h1>Trivial Game</h1>
			<button class="game-start">Start Game</Button>`
		this.updateContent(main)
	}


	displayRegistration() {
		const userForm = `
			<form class="quiz-menu__form">
				<label>Please Enter Player Name:</label>
				<input type="text" class="form-player-input">
			</form>
		`
		if (this.state === 'registration'){  
			this.updateContent(userForm) 
		}
		const userInput = document.querySelector('.form-player-input')
		const regisForm = document.querySelector('.quiz-menu__form')

		regisForm.addEventListener('submit', (evt) => {
			evt.preventDefault()
			if (userInput.value !== "") {
				let game = new Game(userInput.value)
				this.updateState('ongame')

				const hello = `<div>Hi ${game.player.name}, please pick a topic to start your game</div>`

				if (this.state === 'ongame') {
					this.updateContent(hello)
					this.playGame(game)
				}
			}
		})

	}

	playGame(game) {
		let questions;
		fetch("../data/dataset.json")
			.then(res => res.json())
			.then(data => questions = data)
			.then(() => game.displayQuestions(questions))
			.catch(err => console.error(err))
	}
	

	//Support method
	updateState(state) {
		this.state = state
	}

	updateContent(content) {
		this.container.innerHTML = content
	}
}


