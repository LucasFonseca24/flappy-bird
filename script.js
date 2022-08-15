

let bester = 0
let game = false
function start(){
    let birdtop = 20
    game = true
    var rotate = 0
    let fall = 1.2
    let pontuaçao = 0
    let renderpontuçao = document.getElementById('pontuacao')
    const bird = document.querySelector('#bird')
    const start = document.querySelector('#start')
    const gameboard = document.querySelector('#game-board')
    gameboard.style.cursor = 'none'
    start.remove()
    bird.classList = ''
    renderpontuçao.innerText = `${pontuaçao}`
    const pipe1 = document.querySelectorAll('.pipe')
    for(let num = 0;num <= 6; num++){
        if (pipe1[num] !== null && pipe1[num] !== undefined){pipe1[num].remove()}
        }
    //aqui é onde faz o passaro cair e rotacionar para baixo
    const queda = setInterval(() => {
        var bird = document.querySelector('#bird')
        if (birdtop < 75 && fall){
            birdtop += fall }
            
            if(rotate < 90){
                rotate += 5
            }
            bird.style.top = `${birdtop}%`      
            bird.style.rotate = `${rotate}deg`
        }, 18)
    //essa função jump faz tudo relacionado ao pulo, sendo ela a rotação, o tamanho do salto, e a diminuição da queda(fall)
    function jump(){
        if(game){
        const up = setInterval(() => {
            
            fall = 0.5
        }
            , 10);
        const rotatemore = setInterval(() => {
        
            rotate = -30
            
        },10)

        

        let pulo = setInterval(() => {
            birdtop -= 1.35
        }, 10); 
        
        
        setTimeout(() => {
            clearInterval(pulo)
        }, 150)
    setTimeout(() => {
    fall = 1.2
    clearInterval(up)
    }, 350);
    setTimeout(() => {
        clearInterval(rotatemore)
    }, 500);}}
    document.addEventListener('click',jump)
    document.addEventListener('keypress',event => {
        if (event.code === 'Space') {
        jump()
        }
    })
    // aqui é onde os pipes são criado
    let idpipe = 1
    let idinvertpipe = 1000
    const gerapipe = setInterval(() => {
        const randomtop = window.Math.random() * 50 + 25
        let pipetop = randomtop
        const gameboard = document.querySelector('#game-board')
        const pipe = document.createElement('img')
        pipe.src = 'imagens/pipe3.png'
        pipe.className = 'pipe'
        pipe.id = `${idpipe}`
        pipe.style.top = `${pipetop}%`
        idpipe++
        
        gameboard.appendChild(pipe) 
        const invertpipe = document.createElement('img')
        invertpipe.src = 'imagens/pipeinvert3.png'
        invertpipe.className = 'pipe'
        invertpipe.id = `${idinvertpipe}`
        invertpipe.style.top = `${pipetop-94}%`
        idinvertpipe++
        gameboard.appendChild(invertpipe)
    }, 1500)
    //e aqui é onde os pipes que ja passaram são removidos
    setTimeout(() => {
        const removepipe = setInterval(() => {
            if(game){
            const idmenos = idpipe -4
            const pipeid = document.getElementById(`${idmenos}`)
            if (pipeid != null){
            pipeid.remove()
            const idinvertmenos = idinvertpipe -4
            const invertpipeid = document.getElementById(`${idinvertmenos}`)
            invertpipeid.remove()}}
            else{
                clearInterval(removepipe)
            }
        }, 1500);
        const verificargame = setInterval(() => {
            if(!game){
                clearInterval(removepipe)
                clearInterval(verificargame)
            }
            }, 10);
    }, 5000);


    setTimeout(() => {
        const pontinterval = setInterval(() => {
            if(game){pontuaçao += 1
                renderpontuçao.innerText = `${parseInt(pontuaçao)}`}
                else{
                    clearInterval(pontinterval)
                }
                
            },1500)
        const verificargame = setInterval(() => {
            if(!game){
                clearInterval(pontinterval)
                clearInterval(verificargame)
            }
            }, 10);
        }, 4200);
        
        //aqui é onde é verificado a derrota
  setTimeout(() => {  const derrota = setInterval(() => {
      const ids = idpipe-3
      function over(){
            game = false
            clearInterval(derrota)
            const pipe1 = document.querySelectorAll('.pipe')
            const gameboard = document.querySelector('#game-board')
            const div =document.createElement('div')
            const best =document.createElement('div')
            div.innerHTML = `<h1 id='start' onClick = 'start()'>Recomeçar</h1>`
            best.innerHTML = `<h1 id='best' ></h1>`
            gameboard.style.cursor = 'default'
            gameboard.appendChild(div)
            gameboard.appendChild(best)
            if(pontuaçao > bester){
                document.getElementById('best').innerText = `${pontuaçao}`
                bester = `${pontuaçao}`
            }
            fall = 0
            clearInterval(queda)
            clearInterval(gerapipe)
            for(let num = 0;num <= 8; num++){
                if (pipe1[num] != undefined && pipe1[num] !=  null){
                const pipeleft = window.getComputedStyle(pipe1[num]).left
                pipe1[num].style.left = pipeleft
                }}
            }
            var birdtop = document.querySelector('#bird').style.top.replace('%','')
        if(ids > 0){
            //aqui só pego as informações de cada obejto
            const pipe = document.getElementById(`${ids}`)
            if (pipe != null && pipe != undefined){var pipeleft =  pipe.offsetLeft
            const toppipe = pipe.style.top.replace('%','')
            
            

            // aqui onde tem os parametros para a derrota
            if(((pipeleft > 20 && pipeleft < 160) && (birdtop > toppipe-5 || (birdtop <toppipe-25.3  && birdtop > toppipe -90))) || birdtop > 90){
                
                    over()
                }}}
                
                if(birdtop > 75.1){
                    
                        over() }
        

    }, 10);}, 50);}

document.addEventListener('keypress',event => {
    if (event.code === 'Space') {
    if(!game){start()}
    }
})