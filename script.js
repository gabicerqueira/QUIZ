const perguntas = [
    {
        pergunta: "De quem é a famosa frase “Penso, logo existo?",
        imagem: "img/descartes.png",
        resposta: [
            { text: "Sócrates", correct: false },
            { text: "Descartes", correct: true },
            { text: "Aristóteles", correct: false },
            { text: "Platão", correct: false },
        ]
    },
    {
        pergunta: "Qual valor de X na equação: 2x + 10 = 20?",
        imagem: "img/equacao.png",
        resposta: [
            { text: "X = 2", correct: false },
            { text: "X = 10", correct: false },
            { text: "X = 4", correct: false },
            { text: "X = 5", correct: true },
        ]
    },
    {
        pergunta: "Qual foi o país pioneiro da Revolução Industrial?",
        imagem: "img/inglaterra.png",
        resposta: [
            { text: "Inglaterra", correct: true },
            { text: "França", correct: false },
            { text: "Brasil", correct: false },
            { text: "Estados Unidos", correct: false },
        ]
    },
    {
        pergunta: "O que é a clorofila?",
        imagem: "img/clorofila.png",
        resposta: [
            { text: "Célula das plantas", correct: false },
            { text: "Produto de limpeza", correct: false },
            { text: "Nome científico do cloro", correct: false },
            { text: "Pigmento verde das plantas", correct: true },
        ]
    },
    {
        pergunta: "Qual o predicado da oração: 'Renato fez um gol.'?",
        imagem: "img/predicado.png",
        resposta: [
            { text: "Renato", correct: false },
            { text: "Fez", correct: false },
            { text: "Fez um gol", correct: true },
            { text: "Um gol", correct: false },
        ]
    }
];

const elementoPergunta = document.getElementById("questao");
const botoesResposta = document.getElementById("botoesResposta");
const proximoBotao = document.getElementById("next-btn");

let perguntaAtualIndex = 0;
let pontuacao = 0;

function iniciarQuiz(){
    perguntaAtualIndex = 0;
    pontuacao = 0;
    proximoBotao.innerHTML = "Próximo";
    mostrarPergunta();
}

// function iniciarQuiz(){
//     perguntaAtualIndex = 0;
//     pontuacao = 0;
//     tentativasErradas = 0;
//     proximoBotao.innerHTML = "Próximo";
//     mostrarPergunta();

//     const pontuacaoElement = document.getElementById("pontuacao");
//     pontuacaoElement.textContent = "Pontuação: 0"; // Zerar a pontuação
//     pontuacaoElement.style.display = "block"; // Exibir o elemento de pontuação
// }

const iconClass = {
    "Sócrates": "fa-solid fa-circle",
    "Descartes": "fa-solid fa-square",
    "Aristóteles": "fa-solid fa-diamond",
    "Platão": "fa-solid fa-star",

    "X = 2": "fa-solid fa-circle",
    "X = 10": "fa-solid fa-square",
    "X = 4": "fa-solid fa-diamond",
    "X = 5": "fa-solid fa-star",

    "Inglaterra": "fa-solid fa-circle",
    "França": "fa-solid fa-square",
    "Brasil": "fa-solid fa-diamond",
    "Estados Unidos": "fa-solid fa-star",

    "Célula das plantas": "fa-solid fa-circle",
    "Produto de limpeza": "fa-solid fa-square",
    "Nome científico do cloro": "fa-solid fa-diamond",
    "Pigmento verde das plantas": "fa-solid fa-star",

    "Renato": "fa-solid fa-circle",
    "Fez": "fa-solid fa-square",
    "Fez um gol": "fa-solid fa-diamond",
    "Um gol": "fa-solid fa-star",
};

// const styleClass = {
//     "Sócrates": "#333333",
//     "Descartes": "#333333",
//     "Aristóteles": "#333333",
//     "Platão": "#333333",

//     "X = 2": "red",
//     "X = 10": "blue",
//     "X = 4": "green",
//     "X = 5": "#ff00a6",

//     "Inglaterra": "red",
//     "França": "blue",
//     "Brasil": "green",
//     "Estados Unidos": "#ff00a6",

//     "Célula das plantas": "red",
//     "Produto de limpeza": "blue",
//     "Nome científico do cloro": "green",
//     "Pigmento verde das plantas": "#ff00a6",

//     "Renato": "red",
//     "Fez": "blue",
//     "Fez um gol": "green",
//     "Um gol": "#ff00a6",
// };

const colorClass = {
    "Sócrates": "#ff4141",
    "Descartes": "#7d7dff",
    "Aristóteles": "#56ff56",
    "Platão": "#ddda32",

    "X = 2": "#ff4141",
    "X = 10": "#7d7dff",
    "X = 4": "green",
    "X = 5": "yellow",

    "Inglaterra": "#ff4141",
    "França": "#7d7dff",
    "Brasil": "green",
    "Estados Unidos": "yellow",

    "Célula das plantas": "#ff4141",
    "Produto de limpeza": "#7d7dff",
    "Nome científico do cloro": "green",
    "Pigmento verde das plantas": "yellow",

    "Renato": "#ff4141",
    "Fez": "#7d7dff",
    "Fez um gol": "green",
    "Um gol": "yellow",
};



function mostrarPergunta(){
    resetarEstado();

    let perguntaAtual = perguntas[perguntaAtualIndex];
    let perguntaNao = perguntaAtualIndex + 1;
    elementoPergunta.innerHTML = perguntaNao + ". " + perguntaAtual.pergunta; //mostra a primeira pergunta

    const imagemElement = document.createElement("img"); //qaundo mostrar pergunta criar o elemento img
    imagemElement.src = perguntaAtual.imagem; //pega a  imagem correta
    imagemElement.classList.add("imagem-pergunta"); //id na imagem
    elementoPergunta.appendChild(imagemElement); //imagem é "filho" da pergunta

    perguntaAtual.resposta.forEach(resposta => { //criar botao de proximo ao responder
        const button = document.createElement("button");
        // button.innerHTML = resposta.text;
        button.innerHTML = `<i class="${iconClass[resposta.text]}" style="color: ${colorClass[resposta.text]}"></i> ${resposta.text}`;
        button.classList.add("btn");
        botoesResposta.appendChild(button);

        if(resposta.correct){
            button.dataset.correct = resposta.correct //correcao de true ou false
        }
        button.addEventListener("click", selectAnswer);
    })
}


function resetarEstado(){
    proximoBotao.style.display = "none"; //tudo do começo e tira os botoes resposta
    while(botoesResposta.firstChild){
        botoesResposta.removeChild(botoesResposta.firstChild);
    }
    const pontuacaoElement = document.getElementById("pontuacao");
    pontuacaoElement.style.display = "block";
    pontuacaoElement.textContent = "Pontuação: 0";
}

// function selectAnswer(e){
//     const btnSelecionado = e.target;
//     const correto = btnSelecionado.dataset.correct === "true";
//     if(correto){
//         btnSelecionado.classList.add("correto"); //se tiver certo fica verde
//         pontuacao++;
//     }else{
//         btnSelecionado.classList.add("incorreto"); //se não fica vermelho
//     }
//     Array.from(botoesResposta.children).forEach(button => {
//         if(button.dataset.correct === "true"){
//             button.classList.add("correto"); //verde
//         }
//         button.disabled = true; //cursor fica bloqueado
//     });
//     proximoBotao.style.display = "block"; //aparece o botao de next
// }

let tentativasErradas = 0;


function selectAnswer(e){
    const btnSelecionado = e.target;
    const correto = btnSelecionado.dataset.correct === "true";
    if(correto){
        btnSelecionado.classList.add("correto");//se tiver certo fica verde
        pontuacao += 10;

        const pontuacaoElement = document.getElementById("pontuacao"); //pega o p 
        pontuacaoElement.textContent = `Pontuação: ${pontuacao}`; //muda adicionando a cada resposta correta
    } else {
        btnSelecionado.classList.add("incorreto"); //não adiciona a pontuação e fica vermelho
    }
    Array.from(botoesResposta.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correto"); //verde
        }
        button.disabled = true;
    });

    if (!correto) {
        tentativasErradas++;
    
        if (tentativasErradas === 1) {
            const confirmacao = alert("Resposta incorreta. Você tem só mais uma chance. Pressione OK para continuar.");
            if (confirmacao) {
                return; // Permite avançar para a próxima pergunta
            }
        } else if (tentativasErradas === 2) {
            alert("Acabou suas chances. O quiz será reiniciado.");
            resetarQuiz(); // Reinicia o quiz
            return;
        }
    }
    
    
    
    proximoBotao.style.display = "block"; //aparece o botao de next
}



// function resetarQuiz() {
//     perguntaAtualIndex = 0;
//     pontuacao = 0;
//     tentativasErradas = 0;
//     proximoBotao.innerHTML = "Próximo";
//     mostrarPergunta();
// }

function resetarQuiz() {
    perguntaAtualIndex = 0;
    pontuacao = 0;
    tentativasErradas = 0;
    proximoBotao.innerHTML = "Próximo";
    mostrarPergunta();

    const pontuacaoElement = document.getElementById("pontuacao");
    pontuacaoElement.textContent = "Pontuação: 0"; // Zerar a pontuação
    pontuacaoElement.style.display = "block"; // Exibir o elemento de pontuação
}




function mostrarPontuacao(){ //final
    resetarEstado();
    elementoPergunta.innerHTML = `Você fez ${pontuacao} pontos!`;
    proximoBotao.innerHTML = "Jogue novamente";
    proximoBotao.style.display = "block"
    const pontuacaoElement = document.getElementById("pontuacao");

    pontuacaoElement.style.display = "none";
}

function handleNextButton(){ //se acabar as perguntas mostra a pontuação
    perguntaAtualIndex++;
    if(perguntaAtualIndex < perguntas.length){
        mostrarPergunta();
    }else{
        mostrarPontuacao();
    }
}

proximoBotao.addEventListener("click", ()=>{
    if(perguntaAtualIndex < perguntas.length){
        handleNextButton(); // perguntas se não tiver ido todas
    }else{
        iniciarQuiz() //se não, se clicar no botão, reinicia o quiz
    }
})

iniciarQuiz();

