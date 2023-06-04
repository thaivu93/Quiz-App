import Game from "./game"

export default class App {
    constructor(container) {
        this.state = "start"
        this.container = container
    }

    init() {
        const main = `
			<h1>Trivial Game</h1>
			<button class="btn game-start">Start Game</Button>`
        this.updateContent(main)
    }

    // rendering the registration and init game
    displayRegistration() {
        const userForm = `
			<form class="quiz-menu__form">
				<label>Please Enter Player Name:</label>
				<input type="text" class="form-player-input">
			</form>
		`
        if (this.state === "registration") {
            this.updateContent(userForm)
        }
        const userInput = document.querySelector(".form-player-input")
        const regisForm = document.querySelector(".quiz-menu__form")

        regisForm.addEventListener("submit", (evt) => {
            evt.preventDefault()
            this.updateContent(`<h2>Select a topic to start your game</h2>`)
			let questions;
			fetch('../data/dataset.json')
				.then((res) => res.json())
				.then(data => questions = data)
				.then(() => {
					if (userInput.value !== '') {
						let game = new Game(userInput.value, questions)
						game.playGame()
					}
				})
				.catch(err => console.error(err))

        })
    }

    //Support method
    updateState(state) {
        this.state = state
    }

    updateContent(content) {
        this.container.innerHTML = content
    }
}
