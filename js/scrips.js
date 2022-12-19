console.log('Flappy Bird');

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

//[Plano de Fundo]
const planoDeFundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height-204,
    desenha() {
        contexto.fillStyle = '#70c5ce';
        contexto.fillRect(0,0, canvas.width, canvas.height)

        contexto.drawImage (
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY,
            planoDeFundo.largura, planoDeFundo.altura,
            planoDeFundo.x, planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura,
        );

        contexto.drawImage (
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY,
            planoDeFundo.largura, planoDeFundo.altura,
            (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura,
        );
    }
};

//[Chao]
const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height-112,
    desenha() {
        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY,
            chao.largura, chao.altura,
            chao.x, chao.y,
            chao.largura, chao.altura,
        );

        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY,
            chao.largura, chao.altura,
            (chao.x + chao.largura), chao.y,
            chao.largura, chao.altura,
        );
    }
};

const flabbyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    gravidade: 0.25,
    velocidade: 0,

    atualiza() {
        flabbyBird.velocidade = flabbyBird.velocidade + flabbyBird.gravidade;
        flabbyBird.y = flabbyBird.y + 1;

    },

    desenha() {
        contexto.drawImage(
            sprites,
            flabbyBird.spriteX, flabbyBird.spriteY, //Sprite X e Sprite Y
            flabbyBird.largura, flabbyBird.altura, // Tamanho do recorte do Sprite
            flabbyBird.x, flabbyBird.y,
            flabbyBird.largura, flabbyBird.altura,
        );

    }
};

//[MensagemGetReady]
const MensagemGetReady = {
    sX: 134,
    sY: 0,
    w: 174,
    h: 152,
    x: (canvas.width / 2) - 174 / 2,
    y: 50,

    desenha() {
        contexto.drawImage(
            sprites,
            MensagemGetReady.sX, MensagemGetReady.sY,
            MensagemGetReady.w, MensagemGetReady.h,
            MensagemGetReady.x, MensagemGetReady.y,
            MensagemGetReady.w, MensagemGetReady.h
        );
    }
};

//
//[Telas]
//
let telaAtiva = {};
function mudaParaTela(novaTela){
    telaAtiva = novaTela
}

const Telas = {
    INICIO: {
        desenha() {
            planoDeFundo.desenha();
            chao.desenha();
            flabbyBird.desenha();
            MensagemGetReady.desenha()
        },

        click(){
            mudaParaTela(Telas.JOGO);
        },

        atualiza() {

        }
    }
};

Telas.JOGO = {
    desenha(){
        planoDeFundo.desenha();
        chao.desenha();
        flabbyBird.desenha(); 
    },

    atualiza(){
        flabbyBird.atualiza();
    }
}

function loop() {
    telaAtiva.desenha();
    telaAtiva.atualiza();
    
    requestAnimationFrame(loop);

};

window.addEventListener('click',function() {
    if(telaAtiva.click){
        telaAtiva.click();
    }
})
mudaParaTela(Telas.INICIO);
loop();