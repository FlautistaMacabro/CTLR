function runAFtests() {
    alert('Realizar os testes para o AF');
}

window.addEventListener('load', function init() {
    document.getElementById('bttenviartestes').addEventListener('click', runAFtests);
})