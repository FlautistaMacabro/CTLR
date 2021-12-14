function callHome(){
    document.getElementsByTagName("main")[0].innerHTML = '<object type="text/html" data="er.html"></object>';
}

function changeContent(valor) {
    if (valor == "er")
        document.getElementsByTagName("main")[0].innerHTML = '<object type="text/html" data="er.html"></object>';
    else if (valor == "gr") 
        document.getElementsByTagName("main")[0].innerHTML = '<object type="text/html" data="gr.html"></object>';
    else if (valor == "af")
        document.getElementsByTagName("main")[0].innerHTML = '<object type="text/html" data="af.html"></object>';
    else alert("!!! Erro de redirecionamento !!!");
}