function toggleTestArea() {
    if(typeof(toggleTestArea.ativo) == 'undefined')
        toggleTestArea.ativo = false;
    if(!toggleTestArea.ativo){
        toggleTestArea.ativo = true;
        document.getElementById("divtestareatable").style.display = "block";
        document.getElementById("divtestareabtt").style.display = "grid";
    }else {
        toggleTestArea.ativo = false;
        document.getElementById("divtestareatable").style.display = "none";
        document.getElementById("divtestareabtt").style.display = "none";
    }
    document.getElementById("bttopentestarea").classList.toggle("content");
    document.getElementById("divcontenttestarea").classList.toggle("display"); 
}