import App from './App'

// application initalize
const container = document.querySelector('.main-page')
const app = new App(container)

app.init()

const btn = document.querySelector('.game-start')

btn.addEventListener('click', () => {
	app.updateState('registration')
	app.displayRegistration()
})


