function toggleTestArea() {
    let btt = document.getElementById("bttopentestarea");
    let divContent = document.getElementById("divcontenttestarea");
    if(typeof(toggleTestArea.ativo) == 'undefined')
        toggleTestArea.ativo = false;
    if(!toggleTestArea.ativo){
        toggleTestArea.ativo = true;
        document.getElementById("divtestareatable").style.display = "block";
    }else {
        toggleTestArea.ativo = false;
        document.getElementById("divtestareatable").style.display = "none";
    }
    btt.classList.toggle("content");
    divContent.classList.toggle("display"); 
}