const img = document.getElementById('img')
const container = document.querySelector('.container')
const score = document.querySelector('.score')
const start = document.querySelector('.start')
const btn = document.querySelector('.btn')

let sec = 0
let points = 0

const getRandomHightWidth = () => {
  const bodyWidth = document.body.offsetWidth
  const bodyHeight = document.body.offsetHeight

  let randomWidth = Math.floor(Math.random() * bodyWidth)
  let randomHeight = Math.floor(Math.random() * bodyHeight)

  let obj = { randomHeight, randomWidth }

  return obj
}

btn.addEventListener('click', function () {
  points = 0
  sec = 0

  startGame()
})

function randomNum() {
  return Math.floor(Math.random() * 360)
}

//end game this when the game ends

function endGame() {
  start.remove()
  score.classList.add('appear')
  console.log('endGame fired')
}

//

function clicks() {
  img.addEventListener('click', function () {
    let randomWidth = getRandomHightWidth().randomWidth
    let randomHeight = getRandomHightWidth().randomHeight

    img.style.cssText += `opacity : 1;left:${randomWidth}px;bottom:${randomHeight}px`
    img.style.cssText += `transform:rotate(${randomNum()}deg);`

    points += 1
  })
}

//this is when the game starts
function startGame() {
  start.remove()

  clicks()

  let timerId = setInterval(() => {
    sec += 1
  }, 1000)

  // after 5 seconds stop
  setTimeout(() => {
    if (points <= 10) {
      let scoreEl = `<div class="score appear">
        <h1>your score is ${points} flies cought in ${sec} seconds </h1>
          <p> you fucking nooby</p>
           <p>Play Again</p>
         <button class="btn"><strong>Start</strong></button>
        </div>`
      container.innerHTML += scoreEl
    } else if (points > 10 && points < 20) {
      let scoreEl = `<div class="score appear">
        <h1>your score is ${points} flies cought in ${sec} seconds </h1>
          <p>is that the best you have got </p>
           <p>Play Again</p>
         <button class="btn"><strong>Start</strong></button>
        </div>`
      container.innerHTML += scoreEl
    } else {
      let scoreEl = `<div class="score appear">
        <h1>your score is ${points} flies cought in ${sec} seconds </h1>
          <p>well done boa </p>
           <p>Play Again</p>
         <button class="btn"><strong>Start</strong></button>
        </div>`
      container.innerHTML += scoreEl
    }

    img.classList.add('disappear')
    clearInterval(timerId)
  }, 15000)

  console.log('fired')
  let randomWidth = getRandomHightWidth().randomWidth
  let randomHeight = getRandomHightWidth().randomHeight

  img.style.cssText += `opacity : 1;left:${randomWidth}px;bottom:${randomHeight}px`
  img.style.cssText += `transform:rotate(${randomNum()}deg);`
}

// repeat with the interval of 2 second
