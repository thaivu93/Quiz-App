// Game class
export default class Game {
    constructor(name, questions) {
        this.player = name
        this.score = 0
        this.questions = questions
		this.questionCount = 1
		this.currentQuestionIndex = 0
		this.currentQuestionGroup = ""
		this.answeredGroup = []
		this.onGame = true
        this.container = document.querySelector(".main-page")
    }

    playGame() {

		if (!this.onGame) {
			this.updateGameContent(`
				<h2> Thanks for finishing the game </h2>
				<p> Your score is: ${this.score} </p>
			`)
		} else {
			for (let item in this.questions) {
				if (this.answeredGroup.length == 3) {
					this.onGame = !this.onGame
					this.playGame()
				}
				if (!(this.answeredGroup.includes(item))) {
					const btn = document.createElement("button")
					btn.innerText = item
					this.container.appendChild(btn)
					btn.addEventListener("click", () => {
						this.answeredGroup.push(item)
						this.currentQuestionGroup = item
						this.displayQuestions(this.questions[item])
					})
				}
			}
		}
    }

    displayQuestions(questionGroup) {

        //  display question and options
        //  next button submit form and goes to the next question
        //  prev button goes back to prev question without letting user to
        //  answer again
        const questionList = `
			<h2>Question ${this.questionCount}: ${questionGroup[this.currentQuestionIndex].question}</h2>
			<form class="answer-form">
				${questionGroup[this.currentQuestionIndex].options
				.map(
					(question) => `<input type="radio" class="" name="answer" value="${question}" required> ${question} </br>`
				).join("")}				
				<button class="btn prev-button">Prev</button>
				<button class="btn" type="submit">Next</button>
			</form>
		`
		// update page content with question list
        this.updateGameContent(questionList)

		const answerForm = document.querySelector('.answer-form')
		const prevBtn = document.querySelector('.prev-button')

		answerForm.addEventListener('submit', this.checkAnswer.bind(this))
		prevBtn.addEventListener('click', this.goesBack.bind(this) )
		
    }

	checkAnswer(event) {
		event.preventDefault()
		const answer = document.querySelector('input[name="answer"]:checked').value

		if (answer === this.questions[this.currentQuestionGroup][this.currentQuestionIndex].answer) {
			this.score++
		}

		this.currentQuestionIndex++
		this.questionCount++

		if (this.currentQuestionIndex < this.questions[this.currentQuestionGroup].length) {
			this.displayQuestions(this.questions[this.currentQuestionGroup])
		} else {
			this.updateGameContent(`<h2>Select another topic to continue your game: </h2>`)
			this.currentQuestionIndex = 0	
			this.playGame()
		}
	}

	goesBack() {
		if (this.currentQuestionIndex > 0 && this.questionCount !== 1) {
			this.questionCount--
			this.currentQuestionIndex--
			this.displayQuestions(this.questions[this.currentQuestionGroup])	
		}
	}

    updateGameContent(content) {
        this.container.innerHTML = content
    }
}
