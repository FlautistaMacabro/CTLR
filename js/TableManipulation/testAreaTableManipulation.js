function manipularTabelaTestes(event) {
    // Iniciando Array de Rows para remoção de linhas da tabela
    if(typeof(manipularTabelaTestes.arrayRows) == 'undefined')
    manipularTabelaTestes.arrayRows = [];
    // As teclas: Tab, CapsLock, Shift, Control são sempre ignoradas neste processo
    if(event.key == "Tab" || event.key == "CapsLock" || event.key == "Shift" || event.key == "Control")
        return;
    let input = event.target;
    let divLinha = (input.parentElement).parentElement;
    let divBody = divLinha.parentElement;
    let index = Array.prototype.indexOf.call(divBody.children, divLinha);
    // Input está vazio, a linha não é a primeira, e é desejado ser removido.
    if((event.key == "Backspace" || event.key == "Clear" || event.key == "Delete"))
        if(index > 0 && !((input.value).trim().length)){
            if(typeof(manipularTabelaTestes.arrayRows[index]) != 'undefined' && manipularTabelaTestes.arrayRows[index]){
                manipularTabelaTestes.arrayRows[index] = false;
                divLinha.remove();
            }else manipularTabelaTestes.arrayRows[index] = true;
            return;
        }else return;
    // Adicionando nova linha na tabela
    manipularTabelaTestes.arrayRows[index] = false;
    if(typeof divBody.children[index+1] === 'undefined'){
        // Linhas
        let divNewRow = document.createElement("div");
        divNewRow.classList.add("divtestarearow");

        // Colunas
        let divNewColumn = [];
        for (let i = 0; i < 2; i++) {
            divNewColumn[i] = document.createElement("div");
            divNewColumn[i].classList.add("divtestareacolumn");
            divNewRow.appendChild(divNewColumn[i]);
        }

        // Inputs
        let inputNew = document.createElement("input");
        inputNew.classList.add("inputtestareacolumn");
        inputNew.setAttribute('type', 'text');
        inputNew.addEventListener('keyup', (event) => manipularTabelaTestes(event));
        divNewColumn[0].appendChild(inputNew);

        // Parágrafo
        let p = document.createElement("p");
        p.classList.add("ptestareacolumn");
        divNewColumn[1].appendChild(p);

        divBody.appendChild(divNewRow);
    }
}

window.addEventListener('load', function init() {
    Array.from(document.getElementsByClassName("inputtestareacolumn")).forEach(input => {
        input.addEventListener('keyup', (event) => manipularTabelaTestes(event));
    });
})