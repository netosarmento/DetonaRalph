const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector(".menu-lives h2"), // adicionando as vidas as views
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currenTime: 60,
        lives: 3 // vida inicial
    },
    actions: {
        timerId: null,
        countDownTimerId: setInterval(countDown, 1000), // associando o contador ao countdown em intervalos de 1000
    }
};

function countDown() {
    state.values.currenTime--;
    state.view.timeLeft.textContent = state.values.currenTime;

    // Verifica se o tempo acabou
    if (state.values.currenTime <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        
        // Verifica a pontuação ao final do jogo
        if (state.values.result < 40) {  // se contador do score for 40 ou menos
            state.values.lives--; // tira uma vida se a pontuação for menor que 40
            state.view.lives.textContent = "x" + state.values.lives; // Atualiza o contador de vidas
            alert("Game Over! Pontuação muito baixa: " + state.values.result); // Mensagem se a pontuação for baixa
        } else {
            alert("Game Over! Pontuação: " + state.values.result); // Pontuação se for maior ou igual a 40
        }
    }
}

function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play().catch((error) => {
        console.error("Erro ao reproduzir o áudio:", error); // Filtro de erro, para ver no console
    });
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy", "enemy-2"); // removendo pra alternar imagens
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    // Criando random, para as imagens
    let randomImage = Math.random() < 0.5 ? "enemy" : "enemy-2";
    randomSquare.classList.add(randomImage); // Adicionando a imagem random ao square
    state.values.hitPosition = randomSquare.id;
}

function moveEnemy() {
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit"); // Colocando e definindo o audio
            }
        });
    });
}

function initialize() {
    state.view.lives.textContent = "x" + state.values.lives; // Iniciando o contador de vidas
    moveEnemy();
    addListenerHitBox();
}

initialize();
