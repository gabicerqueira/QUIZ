const perguntas = [
    {
        pergunta: "De quem é a famosa frase “Penso, logo existo?",
        resposta: [
            { text: "Sócrates", correct: false },
            { text: "Descartes", correct: true },
            { text: "Aristóteles", correct: false },
            { text: "Platão", correct: false },
        ]
    },
    {
        pergunta: "Qual valor de X na equação: 2x + 10 = 20?",
        resposta: [
            { text: "X = 2", correct: false },
            { text: "X = 10", correct: false },
            { text: "X = 4", correct: false },
            { text: "X = 5", correct: true },
        ]
    },
    {
        pergunta: "Qual foi o país pioneiro da Revolução Industrial?",
        resposta: [
            { text: "Inglaterra", correct: true },
            { text: "França", correct: false },
            { text: "Brasil", correct: false },
            { text: "Estados Unidos", correct: false },
        ]
    },
    {
        pergunta: "O que é a clorofila?",
        resposta: [
            { text: "Célula das plantas", correct: false },
            { text: "Produto de limpeza", correct: false },
            { text: "Nome científico do cloro", correct: false },
            { text: "Pigmento verde das plantas", correct: true },
        ]
    },
    {
        pergunta: "Qual o predicado da oração: 'Renato fez um gol.'?",
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
    elementoPergunta.innerHTML = perguntaNao + ". " + perguntaAtual.pergunta;

    perguntaAtual.resposta.forEach(resposta => {
        const button = document.createElement("button");
        button.innerHTML = resposta.text;
        button.classList.add("btn");
        botoesResposta.appendChild(button);

        if(resposta.correct){
            button.dataset.correct = resposta.correct
        }
        button.addEventListener("click", selectAnswer);
    })
}

function resetarEstado(){
    proximoBotao.style.display = "none";
    while(botoesResposta.firstChild){
        botoesResposta.removeChild(botoesResposta.firstChild);
    }
}

function selectAnswer(e){
    const btnSelecionado = e.target;
    const correto = btnSelecionado.dataset.correct === "true";
    if(correto){
        btnSelecionado.classList.add("correto");
        pontuacao++;
    }else{
        btnSelecionado.classList.add("incorreto");
    }
    Array.from(botoesResposta.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correto");
        }
        button.disabled = true;
    });
    proximoBotao.style.display = "block";
}

function mostrarPontuacao(){
    resetarEstado();
    elementoPergunta.innerHTML = `Você pontuou ${pontuacao} das ${perguntas.length} perguntas!`;
    proximoBotao.innerHTML = "Jogue novamente";
    proximoBotao.style.display = "block"
}

function handleNextButton(){
    perguntaAtualIndex++;
    if(perguntaAtualIndex < perguntas.length){
        mostrarPergunta();
    }else{
        mostrarPontuacao();
    }
}

proximoBotao.addEventListener("click", ()=>{
    if(perguntaAtualIndex < perguntas.length){
        handleNextButton();
    }else{
        iniciarQuiz()
    }
})

iniciarQuiz();