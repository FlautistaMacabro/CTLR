function objectWithNodeIDandName(tam) {
    let nodesName = [];
    let n = 0;
    nodesName[0] = 'S';
    for (i = 1; i < tam; i++){
        nodesName[i] = String.fromCharCode(65 + n);
        n++;
    }
    return nodesName;
}

function getSwapedInitialNodes(){
    let nodesObjNew = [];
    let nodes = cy.nodes();
    let tam = nodes.length;
    let i=0;
    for (; i < tam; i++)
        if(nodes[i].style('background-image') != 'none'){
            let temp = nodes[i];
            nodes[i] = nodes[0];
            nodes[0] = temp;
            break;
        }
    for (i = 0; i < tam; i++)
        nodesObjNew[i] = nodes[i];
    return nodesObjNew;
}

function getNodeDestNameById(nodesObj, nodesNames, id) {
    let tam = nodesObj.length;
    for (i = 0; i < tam; i++)
        if(nodesObj[i].id() == id)
            return nodesNames[i];
    return null;     
}

function getTransitionString(label, nodeDestName){
    let nameReal = '';
    if(label != 'λ')
        nameReal = label;
    return `${nameReal}${nodeDestName}`;
}

function getAFtoGR() {
    let nodesObj = getSwapedInitialNodes();
    let grammar = {};
    let nodesNames = objectWithNodeIDandName(nodesObj.length);
    for (let i = 0; i < nodesObj.length; i++) {
        let SucessorsAtual = nodesObj[i].outgoers();
        let transissoes = [];
        if(typeof(SucessorsAtual[0]) !== 'undefined' && SucessorsAtual[0] != null){
            let posNodeDest = 1;
            let nodeDestName = getNodeDestNameById(nodesObj, nodesNames, SucessorsAtual[posNodeDest].id());
            let nameReal = '';
            if(nodeDestName == null)
                return;
            transissoes.push(getTransitionString(SucessorsAtual[0].data('label'), nodeDestName));
            for (let j = 2; j < SucessorsAtual.length; j++)
                if(SucessorsAtual[j].isEdge() && (SucessorsAtual[j+1] == null || SucessorsAtual[j+1].isEdge()))
                    transissoes.push(getTransitionString(SucessorsAtual[j].data('label'), nodeDestName));
                else {
                    posNodeDest = j+1;
                    if(typeof(SucessorsAtual[posNodeDest]) !== 'undefined' && SucessorsAtual[posNodeDest] != null){
                        nodeDestName = getNodeDestNameById(nodesObj, nodesNames, SucessorsAtual[posNodeDest].id());
                        transissoes.push(getTransitionString(SucessorsAtual[j].data('label'), nodeDestName));
                    }else break;
                }
        }
        if(nodesObj[i].style('border-width') != '0px')
            transissoes.push("");
        if (transissoes.length !== 0)
            grammar[`${nodesNames[i]}`] = transissoes;
    }
    return grammar;
}

function runAFtests() {
    let grammar = {};
    grammar = getAFtoGR();
    console.log(`${JSON.stringify(grammar)}`);
}

window.addEventListener('load', function init() {
    document.getElementById('bttenviartestes').addEventListener('click', runAFtests);
})