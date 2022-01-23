let config ={
    //游戏状态 0：游戏未开始，1：游戏进行中 2：游戏结束
    status:0 ,
    // 病毒生成的时间间隔
    interval:800 ,
    // 病毒动画的速度
    speed:3
}
// 得分
let score =0;
// 开始页面
let startAlert =document.querySelector('#start-alert')
let gameDesc =document.querySelector('.game-desc');
let gameDown =document.querySelector('.game-down')
let letter;
startAlert.addEventListener('click',function(){

    gameDesc.classList.add('slide-up');
    gameDown.classList.add('slide-down')

    startGame();
    setTimeout(function(){
        startAlert.style.display='none'
    },500)

    // 更新游戏状态
    config.status=1
})

let timer,updater;
// 游戏开始调用函数
function startGame(){
    timer =setInterval(() => {
        makeVirus()
    }, config.interval);
   
    updater=setInterval(() => {
        update()
    }, 16);
}

let game =document.querySelector('#game')
// 生成病毒元素
let letters =['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','H','Y','Z']
// 获得游戏场景
let stage =document.querySelector('#stage')
// 获得ui层
let uiLayer =document.querySelector('#ui')

let virues =[]
function makeVirus(){
    let virus =document.createElement('div')
    virus.setAttribute('class','virus')
    let p =document.createElement('p')
    p.classList.add('letter')
    virus.appendChild(p)

    // 设置病毒的颜色
    switch(Math.floor(Math.random()*6)){
        case 0:
            p.style.backgroundImage ='radial-gradient(rgba(255,150,150,0),rgba(255,0,0,1))';
            p.style.boxShadow ='0 0 15px #f00';
            break;
        case 1:
            p.style.backgroundImage ='radial-gradient(rgba(255,150,150,0),rgba(0,255,0,1))';
            p.style.boxShadow ='0 0 15px #f00';
            break;
        case 2:
            p.style.backgroundImage ='radial-gradient(rgba(255,150,150,0),rgba(0,0,255,1))';
            p.style.boxShadow ='0 0 15px #f00';
            break;
        case 3:
            p.style.backgroundImage ='radial-gradient(rgba(255,150,150,0),rgba(255,255,0,1))';
            p.style.boxShadow ='0 0 15px #f00';
            break;
        case 4:
            p.style.backgroundImage ='radial-gradient(rgba(255,150,150,0),rgba(0,255,255,1))';
            p.style.boxShadow ='0 0 15px #f00';
            break;
        case 5:
            p.style.backgroundImage ='radial-gradient(rgba(255,150,150,0),rgba(255,0,255,1))';
            p.style.boxShadow ='0 0 15px #f00';
            break;
    }

    // 随机生成26个英文字母
    letter =letters[Math.floor(Math.random()*26)];
    p.innerHTML =letter

    virus.style.left =Math.random()*(stage.offsetWidth-100) +'px'
    virus.letter =letter
    game.appendChild(virus)
    virues.push(virus)
}
let winH =stage.offsetHeight;

// update 动画刷新病毒元素的位置
function update(){
     for(let i=0;i<virues.length;i++){
         let virus =virues[i];
         virus.style.top =virus.offsetTop +config.speed +'px'
         if(virus.offsetTop > (winH-200)&&!uiLayer.warning){
            showWarning()
            uiLayer.warning =true
         }else if(virus.offsetTop>=winH){
            //  超出结束
            gameOver()
         }
     }
}

function showWarning(){
    let warningLayer =document.createElement('div')
    warningLayer.setAttribute('class','warning');
    uiLayer.appendChild(warningLayer)

}

// 游戏结束
function gameOver(){
    clearInterval(timer)
    clearInterval(updater)
    config.status =2;
}
let scoreLabel =document.getElementById('score-label')
// 监听键盘事件
window.addEventListener('keyup',function(e){
    let key = e.key;

    for(let i = 0;i < virues.length;i++){
        let virus = virues[i]

        if(virus.letter.toLowerCase() === key.toLocaleLowerCase() && config.status === 1){

            // 切换病毒
            let dieImg = document.createElement('img')
            game.appendChild(dieImg)
            dieImg.src = './imgs/virus-die.png'
            dieImg.style.position = 'absolute'
            dieImg.style.left = virus.offsetLeft + 'px'
            dieImg.style.top = virus.offsetTop + 'px'
            dieImg.classList.add('fade-out')

            setTimeout(function(){
                game.removeChild(dieImg)
            },1000)
            game.removeChild(virus)
            virues.splice(i,1)

            score++;
            scoreLabel.innerHTML =score

        }
    }
})