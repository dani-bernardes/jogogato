const container = document.getElementById("container");
const cesta = document.getElementById("cesta");
const pontosDisplay = document.getElementById("pontos");
const ganhou = document.getElementById("ganhou");
const botaoProximoNivel = document.getElementById("proximoNivel");

let pontos = 0;

function atualizarPontos(valor) {
    pontos += valor;
    pontosDisplay.textContent = `Pontos: ${pontos}`;
    if (pontos >= 25) { 
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

function gerarItem() {
    const item = document.createElement("div");
    const tiposDeItens = ["rosquinha", "torta", "algodao", "doce", "sorvete", "podre", "comida", "chaleira"];
    const tipoAleatorio = tiposDeItens[Math.floor(Math.random() * tiposDeItens.length)];
    
    item.classList.add("item", tipoAleatorio);

    item.style.left = `${Math.random() * 760}px`;
    item.style.top = "0px";

    if (tipoAleatorio === "podre" || tipoAleatorio === "comida" || tipoAleatorio === "chaleira") {
        document.getElementById("comidas-ruins").appendChild(item);
    } else {
        document.getElementById("doces").appendChild(item);
    }

    let posicaoTopo = 0;
    const intervaloQueda = setInterval(() => {
        posicaoTopo += 8;  
        item.style.top = `${posicaoTopo}px`;

        const cestaEsquerda = parseInt(window.getComputedStyle(cesta).left);
        const cestaDireita = cestaEsquerda + 80;
        const itemEsquerda = parseInt(item.style.left);
        const itemDireita = itemEsquerda + 40;

      
        if (posicaoTopo >= 650 && itemEsquerda < cestaDireita && itemDireita > cestaEsquerda) {
            clearInterval(intervaloQueda);
            item.remove();

            
            if (tipoAleatorio === "podre" || tipoAleatorio === "comida" || tipoAleatorio === "chaleira") {
                atualizarPontos(-2);
                alert("Você perdeu 2 pontos");
            } else {
                atualizarPontos(1);
            }
        }

        if (posicaoTopo > 700) {
            clearInterval(intervaloQueda);
            item.remove();
        }
    }, 30);
}

setInterval(gerarItem, 1300); 

function irParaProximoNivel() {
    window.location.href = "fase5.html";
}

botaoProximoNivel.addEventListener("click", irParaProximoNivel);
