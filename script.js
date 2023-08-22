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
        button.innerHTML = resposta.text;
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
}

function selectAnswer(e){
    const btnSelecionado = e.target;
    const correto = btnSelecionado.dataset.correct === "true";
    if(correto){
        btnSelecionado.classList.add("correto"); //se tiver certo fica verde
        pontuacao++;
    }else{
        btnSelecionado.classList.add("incorreto"); //se não fica vermelho
    }
    Array.from(botoesResposta.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correto"); //verde
        }
        button.disabled = true; //cursor fica bloqueado
    });
    proximoBotao.style.display = "block"; //aparece o botao de next
}

function mostrarPontuacao(){ //final
    resetarEstado();
    elementoPergunta.innerHTML = `Você pontuou ${pontuacao} das ${perguntas.length} perguntas!`;
    proximoBotao.innerHTML = "Jogue novamente";
    proximoBotao.style.display = "block"
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