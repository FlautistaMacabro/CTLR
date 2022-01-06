function runGRtests() {
    alert('Realizar os testes para a GR');
}

window.addEventListener('load', function init() {
    document.getElementById('bttenviartestes').addEventListener('click', runGRtests);
})