var allTransitions = [];

function getEstadosComSPrimeiro(estados){
    let tam = estados.length;
    let flag = true;
    for (let i = 0; i < tam; i++)
        if(estados[i] == 'S')
            if(flag){
                let aux = estados[i];
                estados[i] = estados[0];
                estados[0] = aux;
                flag = false;
                break;
            }
    if(flag){
        for (let i = 0; i < allTransitions.length; i++)
            if(allTransitions[i].Estado == estados[0])
                allTransitions[i].Estado = 'S';
        estados[0] = 'S';
    }
    return estados;
}

function getTodosEstadosEscritos(estados, transissoes) {
    let tamEstados = estados.length, tamTransissoes = transissoes.length;
    let n, alpha;
    let flag = true;
    let otherLetters = [];
    n = 0;
    while(n < 26){
        alpha = String.fromCharCode(65 + n);
        flag = true;
        for (let i = 0; i < tamTransissoes && flag; i++){
            if(transissoes[i].Transition.includes(`${alpha}`)){
                for (let j = 0; j < tamEstados; j++)
                    if(alpha == estados[j]){
                        flag = false;
                        break;
                    }
                if(flag)
                    otherLetters.push(transissoes[i]);
            } 
        }
        n++;
    }
    let tamOther = otherLetters.length;
    for (let i = 0; i < tamOther; i++)
        transissoes.splice(transissoes.indexOf(otherLetters[i]), 1);
    tamTransissoes = transissoes.length;
    otherLetters = [];
    for (let i = 0; i < tamEstados; i++) {
        flag = true;
        for (let j = 0; j < tamTransissoes; j++)
            if(transissoes[j].Estado.includes(estados[i])){
                flag = false;
                break;
            }
        if(flag)
            otherLetters.push(estados[i]);
    }
    tamOther = otherLetters.length;
    for (let i = 0; i < tamOther; i++)
        estados.splice(estados.indexOf(otherLetters[i]), 1);
    return estados;
}

function getGRfromTable() {
    let allRows = document.querySelectorAll(".divgrammarrow");
    let tam = allRows.length;
    allTransitions = [];
    let estadosDistintos = [];
    let flag = true;
    let grammar = {};
    for (let i = 0; i < tam; i++) {
        let colunaEstado = ((allRows[i].firstElementChild).firstElementChild).value;
        let colunaTransicao = ((allRows[i].lastElementChild).firstElementChild).value;
        if(colunaEstado === "")
            continue;
        let transition = {
            Estado: colunaEstado,
            Transition: colunaTransicao
        };
        allTransitions.push(transition);
        for (let j = 0; j < estadosDistintos.length; j++)
            if(colunaEstado != estadosDistintos[i]){
                flag = true;
                break;
            }
        if(flag){
            estadosDistintos.push(colunaEstado);
            flag = false;
        }
    }
    estadosDistintos = getEstadosComSPrimeiro(estadosDistintos);
    estadosDistintos = getTodosEstadosEscritos(estadosDistintos, allTransitions);
    tam = estadosDistintos.length;
    for (let i = 0; i < tam; i++) {
        let estadosAtual = estadosDistintos[i];
        let transissao = [];
        let tam2 = allTransitions.length;
        let flag = false;
        for (let j = 0; j < tam2; j++) {
            if(estadosAtual == allTransitions[j].Estado){
                let transissaoAtual = allTransitions[j].Transition;
                if(transissaoAtual == 'λ' || transissaoAtual == "")
                    flag = true;
                else transissao.push(transissaoAtual);
            }
        }
        if(flag)
            transissao.push("\\");
        grammar[`${estadosAtual}`] = transissao;
    }
    return grammar;
}

function runGRtests() {
    let rules = {};
    rules = getGRfromTable();
    console.log(`${JSON.stringify(rules)}`);
    let allRows = document.querySelectorAll(".divtestarearow");
    for (let i = 0; i < allRows.length; i++) {
        let inputColumn = (allRows[i].firstElementChild).firstElementChild;
        let resultColumn = (allRows[i].lastElementChild).firstElementChild;
        if(verificaSentencaGramatica(rules, inputColumn.value))
            resultColumn.innerHTML = "ACEITO";
        else resultColumn.innerHTML = "REJEITADO";
    }
}

window.addEventListener('load', function init() {
    document.getElementById('bttenviartestes').addEventListener('click', runGRtests);
})