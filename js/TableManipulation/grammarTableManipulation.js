function manipularTabela(event) {
    // Iniciando Array de Rows para remoção de linhas da tabela
    if(typeof(manipularTabela.arrayRows) == 'undefined')
        manipularTabela.arrayRows = [];
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
            if(typeof(manipularTabela.arrayRows[index]) != 'undefined' && manipularTabela.arrayRows[index]){
                manipularTabela.arrayRows[index] = false;
                divLinha.remove();
            }else manipularTabela.arrayRows[index] = true;
            return;
        }else return;
    // Adicionando nova linha na tabela
    manipularTabela.arrayRows[index] = false;
    if(typeof divBody.children[index+1] === 'undefined'){
        // Add seta na coluna do meio da nova linha
        (divLinha.children[1]).children[0].innerHTML = "➝";

        // Linhas
        let divNewRow = document.createElement("div");
        divNewRow.classList.add("divgrammarrow");

        // Colunas
        let divNewColumn = [];
        for (let i = 0; i < 3; i++) {
            divNewColumn[i] = document.createElement("div");
            divNewColumn[i].classList.add("divgrammarcolumn");
            divNewRow.appendChild(divNewColumn[i]);
        }
        divNewColumn[1].classList.add("divgrammarcolumnM");

        // Inputs
        let inputNew = [];
        for (let i = 0; i < 2; i++) {
            inputNew[i] = document.createElement("input");
            inputNew[i].classList.add("inputgrammarcolumn");
            inputNew[i].setAttribute('type', 'text');
            inputNew[i].addEventListener('keyup', (event) => manipularTabela(event));
        }
        inputNew[1].setAttribute('value','λ');
        divNewColumn[0].appendChild(inputNew[0]);
        divNewColumn[2].appendChild(inputNew[1]);

        // Parágrafo
        let p = document.createElement("p");
        p.classList.add("pgrammarcolumn");
        p.classList.add("pgrammarcolumnM");
        divNewColumn[1].appendChild(p);

        divBody.appendChild(divNewRow);
    }
}

window.addEventListener('load', function init() {
    Array.from(document.getElementsByClassName("inputgrammarcolumn")).forEach(input => {
        input.addEventListener('keyup', (event) => manipularTabela(event));
    });
})