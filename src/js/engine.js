const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),

    },
    //associando os estados a views
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currenTime: 60,
    },
    //Ações
    actions: {
        timerId: null,  // Poderia remover function move enemy e fazer como em baixo state.values.timerId = setInterval(randomSquare, state.values.gameVelocity) mas no caso para funcionar teria que botar como o de baixo setInterval(randomSquare, 1000) igual de baixo
        countDownTimerId: setInterval(countDown, 1000), //associando o contador ao countdown em intervalos de 1000, ele é chamado porque ja foi chamado no state
    }
};

function countDown() {
    state.values.currenTime--;
    state.view.timeLeft.textContent = state.values.currenTime;
    //estado, para ser visualizado, tempo restante, no conteudo do texto,  estado, valor, do tempo.
    if (state.values.currenTime <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("Game Over! Pontuação: " + state.values.result);
    }
}

function playSound(audioName) {
   
   let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play().catch((error) => {   
        console.error("Erro ao reproduzir o áudio:", error); //Filtro de error, para ver no console
    });
}


function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id
}

function moveEnemy(){
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity)
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit"); //colocando nome do audio pra reproduzir
            }
        });
    });
}


function initialize() {
    moveEnemy();
    addListenerHitBox();
}

initialize();