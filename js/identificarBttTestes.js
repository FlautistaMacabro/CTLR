function realizarTestesER() {
    alert('Realizar os testes para a ER');
}

function realizarTestesGR() {
    alert('Realizar os testes para a GR');
}

function realizarTestesAF() {
    alert('Realizar os testes para o AF');
}

function identificarTestes() {
    if(document.getElementById('er') != null)
        realizarTestesER();
    if(document.getElementById('gr') != null)
        realizarTestesGR();
    if(document.getElementById('af') != null)
        realizarTestesAF();
}

window.addEventListener('load', function init() {
    document.getElementById('bttenviartestes').addEventListener('click', identificarTestes);
})