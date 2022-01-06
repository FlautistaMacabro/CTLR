function menuAFBttlogic(event) {
    let btts = document.getElementsByClassName('cynavbtt');
    let bttAtual = event.target;
    for (let i = 0; i < btts.length; i++)
        btts[i].style.setProperty('background','none');
    bttAtual.style.setProperty('background-color','rgba(190, 65, 221, 0.6)');
}

window.addEventListener('load', function init() {
    let btts = document.getElementsByClassName('cynavbtt');
    for (let i = 0; i < btts.length; i++)
        btts[i].addEventListener('click', (event) => menuAFBttlogic(event));
})