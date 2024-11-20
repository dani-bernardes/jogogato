const container = document.getElementById("container");
const cesta = document.getElementById("cesta");
const pontosDisplay = document.getElementById("pontos");
const ganhou = document.getElementById("ganhou");
const botaoProximoNivel = document.getElementById("proximoNivel");

let pontos = 0;

function atualizarPontos() {
    pontosDisplay.textContent = `Pontos: ${pontos}`;
    if (pontos >= 15) { 
        ativarProximoNivel();
    }
}

function ativarProximoNivel() {
    ganhou.style.display = "flex"; 
}


document.addEventListener("keydown", (evento) => {
    const cestaEsquerda = parseInt(window.getComputedStyle(cesta).left);

    if (evento.key === "ArrowLeft" && cestaEsquerda > 0) {
        cesta.style.left = `${cestaEsquerda - 20}px`; 
    } else if (evento.key === "ArrowRight" && cestaEsquerda < 720) {
        cesta.style.left = `${cestaEsquerda + 20}px`; 
    }
});


function gerarDoce() {
    const doce = document.createElement("div");
    const tiposDeDoces = ["rosquinha", "torta", "algodao", "sorvete"];
    const tipoAleatorio = tiposDeDoces[Math.floor(Math.random() * tiposDeDoces.length)];
    doce.classList.add("doce", tipoAleatorio);
    doce.style.left = `${Math.random() * 760}px`; 
    doce.style.top = "0px";
    container.appendChild(doce);

    let posicaoTopo = 0;
    const intervaloQueda = setInterval(() => {
        posicaoTopo += 6; 
        doce.style.top = `${posicaoTopo}px`;

        const cestaEsquerda = parseInt(window.getComputedStyle(cesta).left);
        const cestaDireita = cestaEsquerda + 80;
        const doceEsquerda = parseInt(doce.style.left);
        const doceDireita = doceEsquerda + 40;

        if (
            posicaoTopo >= 650 && 
            doceEsquerda < cestaDireita &&
            doceDireita > cestaEsquerda
        ) {
            clearInterval(intervaloQueda);
            container.removeChild(doce);
            pontos++;
            atualizarPontos();
        }

        if (posicaoTopo > 700) {
            clearInterval(intervaloQueda);
            container.removeChild(doce);
        }
    }, 20); 
}


setInterval(gerarDoce, 2000); 

function irParaProximoNivel() {
    window.location.href = "fase3.html"; 
}

botaoProximoNivel.addEventListener("click", irParaProximoNivel);
