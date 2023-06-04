// Game class
export default class Game {
    constructor(name, questions) {
        this.player = name 
        this.score = 0
		this.questions = questions
		this.container = document.querySelector(".main-page")
    }

    playGame() {
        for (let item in this.questions) {
            // adding button
            const btn = document.createElement("button")
            btn.innerText = item
            this.container.appendChild(btn)
            btn.addEventListener("click", () => {
                this.displayQuestions(this.questions[item])
            })
        }
    }


    displayQuestions(questionGroup) {
		//  display question and options
		//  next button submit form and goes to the next question
		//  prev button goes back to prev question without letting user to
		//  reanswer
		//
		console.log(questionGroup)
		let questionIndex = 0
		let questionCount = 1
		const questionList = `
			${
				questionGroup.map()
			}
			<h2>Question ${questionCount}: ${questionGroup[questionIndex].question}</h2>
				
		`
		this.updateGameContent(questionList)
	}

	
	
	
	updateGameContent(content) {
		this.container.innerHTML = content
	}
}
