let start = document.querySelector('.start')
let interface = document.querySelector('.start-interface')
let over = document.querySelector('.over-interface')
let container = document.querySelector('.container')
let score = document.querySelector('.score')
let timeBox = document.querySelector('.time-box')
let timer = document.querySelector('.time')
var box = document.getElementById('box')
const pause = document.querySelector('.pause')
const hint = document.querySelector('.hint')
const restart = document.querySelector('.restart')
const total = document.querySelector('.total')
const comment = document.querySelector('.comment')
let level
let ans
var transparency


start.onclick = function () {
    //初始化
    score.innerHTML = 0
    let timeLeft = 30
    level = 2
    timer.innerHTML = timeLeft + 's'
    interface.style.display = "none"
    start.style.display = "none"
    container.classList.add('act')
    score.classList.add('act')
    timeBox.classList.add('act')

    ans = Math.floor(Math.random() * (level * level))
    r = Math.floor(Math.random() * 200)
    g = Math.floor(Math.random() * 200)
    b = Math.floor(Math.random() * 200)
    for (let i = 0; i < level * level; i++) {
        console.log(ans);
        if (i == ans) {
            box.innerHTML += `<div onclick="checkAnswer(true);" class="cube correct" style="width:${100 / level}%;height:${100 / level}%;background-color: rgb(${r}, ${g}, ${b});opacity:${transparency}">`
        } else {
            box.innerHTML += `<div onclick="checkAnswer(false);" class="cube" style="width:${100 / level}%;height:${100 / level}%;background-color: rgb(${r}, ${g}, ${b})">`
        }
    }


    //預設倒數計時的值 (countdown)
    var countdown = setInterval(function () {
        timeLeft = timeLeft - 1
        timer.innerHTML = timeLeft + 's'
        if (timeLeft == 0) {
            over.classList.add('act')
            clearInterval(countdown)
            container.classList.remove('act')
            score.classList.remove('act')
            timeBox.classList.remove('act')
            total.innerHTML = '總分:' + score.innerHTML

            if (score.innerHTML >= 40) {
                comment.innerHTML = '真是太棒了'
            } if (score.innerHTML >= 30 && score.innerHTML < 40) {
                comment.innerHTML = '還可以再更好喔'
            } if (score.innerHTML >= 20) {
                comment.innerHTML = '休息一下，再繼續努力'
            }
            else {
                comment.innerHTML = '請回家練練再來'
            }
        }
    }, 1000);
}

//按下暫停
pause.onclick = function () {
    alert('嘿嘿休息一下')
}
//按下提示
hint.onclick = function () {
    score.innerHTML = score.innerHTML - 1
    let ansCube = document.querySelector('.cube.correct')
    console.log(ansCube);
    ansCube.classList.add('high-light')
    console.log(ansCube);
}
restart.onclick = function () {
    over.classList.remove('act')
    interface.style.display = ""
    start.style.display = ""
    box.innerHTML = ""
}


function checkAnswer(guess) {

    if (guess) {
        //innerHTML本身為字串，parseInt(score.innerHTML)+1轉為數字做加減後，再以字串呈現
        score.innerHTML = parseInt(score.innerHTML) + 1
        //清空上一題題目
        box.innerHTML = ''

        //根據目前分數判斷下一題難度
        if (score.innerHTML > 5 && level < 3) {
            level = 3
        }
        if (score.innerHTML > 10 && level < 4) {
            level = 4
        }
        if (score.innerHTML > 15 && level < 5) {
            level = 5
            transparency = 0.6
        }
        if (score.innerHTML > 20 && level < 6) {
            level = 6
        }
        if (score.innerHTML > 25 && level < 7) {
            level = 7
            transparency = 0.9
        }
        //重新亂數產生答案
        ans = Math.floor(Math.random() * (level * level))
        console.log(ans);
        // 亂數決定新題目的顏色
        r = Math.floor(Math.random() * 200)
        g = Math.floor(Math.random() * 200)
        b = Math.floor(Math.random() * 200)
        for (let i = 0; i < level * level; i++) {

            if (i == ans) {
                console.log(r);
                box.innerHTML += `<div onclick="checkAnswer(true);" class="cube correct" style="width:${100 / level}%;height:${100 / level}%;background-color: rgb(${r}, ${g}, ${b});opacity: ${transparency};"></div>`
            } else {
                box.innerHTML += `<div onclick="checkAnswer(false);" class="cube" style="width:${100 / level}%;height:${100 / level}%;background-color:rgb(${r}, ${g}, ${b});"></div>`
            }
        }
  
    }
}




