var lastBttClicked = document.getElementsByClassName('cynavbtt')[0];

function menuAFBttOver(event) {
    let btts = document.getElementsByClassName('cynavbtt');
    let bttAtual = event.target;
    for (let i = 0; i < btts.length; i++)
        if(lastBttClicked != btts[i])
            btts[i].style.setProperty('background','transparent');
    if(lastBttClicked != bttAtual)
        bttAtual.style.setProperty('background-color','rgba(207, 103, 221, 0.49)');
}

function menuAFBttDown(event) {
    let bttAtual = event.target;
    if(lastBttClicked != bttAtual)
        bttAtual.style.setProperty('background-color','rgba(190, 65, 221, 0.6)');
}

function menuAFBttUp(event) {
    let bttAtual = event.target;
    if(lastBttClicked != bttAtual)
        bttAtual.style.setProperty('background-color','rgba(207, 103, 221, 0.49)');
}

function menuAFBttOut(event) {
    let bttAtual = event.target;
    if(lastBttClicked != bttAtual)
        bttAtual.style.setProperty('background-color','transparent');
}

function menuAFBttClick(event) {
    let btts = document.getElementsByClassName('cynavbtt');
    let bttAtual = event.target;
    lastBttClicked = bttAtual;
    for (let i = 0; i < btts.length; i++)
        btts[i].style.setProperty('background','transparent');
    bttAtual.style.setProperty('background-color','rgba(190, 65, 221, 0.6)');
}

window.addEventListener('load', function init() {
    let btts = document.getElementsByClassName('cynavbtt');
    let i = 0, tam = btts.length;
    for (; i < tam; i++){
        btts[i].addEventListener('mouseover', (event) => menuAFBttOver(event));
        btts[i].addEventListener('mousedown', (event) => menuAFBttDown(event));
        btts[i].addEventListener('mouseout', (event) => menuAFBttOut(event));
    }
    tam--;
    for (i = 0; i < tam; i++){
        btts[i].addEventListener('click', (event) => menuAFBttClick(event));
    }
    btts[i].addEventListener('mouseup', (event) => menuAFBttUp(event));
})