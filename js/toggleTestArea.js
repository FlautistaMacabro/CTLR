function toggleTestArea() {
    let btt = document.getElementById("bttopentestarea");
    let divContent = document.getElementById("divcontenttestarea");
    if(typeof(toggleTestArea.ativo) == 'undefined'){
        toggleTestArea.ativo = false;
        // Criar Tabela
        let divTable = document.createElement("div");
        divTable.setAttribute('id','divtestareatable');
        let divHead = document.createElement("div");
        divHead.setAttribute('id','divtestareahead');
        let divBody = document.createElement("div");
        divBody.setAttribute('id','divtestareabody');
        let divColumns = [];
        for (let i = 0; i < 4; i++) {
            divColumns[i] = document.createElement("div");
            divColumns[i].classList.add('divtestareacolumn');
        }
        let pColumns = [];
        for (let i = 0; i < 2; i++) {
            pColumns[i] = document.createElement("p");
            pColumns[i].classList.add('ptestareacolumn');
            divColumns[i].appendChild(pColumns[i]);
            divHead.appendChild(divColumns[i]);
        }
        pColumns[0].innerHTML = "Entrada";
        pColumns[1].innerHTML = "Saída";
        let divRow = document.createElement("div");
        divRow.classList.add("divtestarearow");
        let inputColumn = document.createElement("input");
        inputColumn.setAttribute('type','text');
        inputColumn.classList.add("inputtestareacolumn");
        divColumns[2].appendChild(inputColumn);
        divRow.appendChild(divColumns[2]);
        pColumns[3] = document.createElement("p");
        pColumns[3].classList.add('ptestareacolumn');
        divColumns[3].appendChild(pColumns[3]);
        divRow.appendChild(divColumns[3]);
        divBody.appendChild(divRow);
        divTable.appendChild(divHead);
        divTable.appendChild(divBody);
        divContent.appendChild(divTable);
    }
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