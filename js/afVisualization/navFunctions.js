// Globals para identificação dos Nodes (se possível melhorar depois)
var nodeAnteID = '';
var nodeAnteEdit = false;

function cursorPointerOverNode() {
    cy.on('mouseover', 'node', function (event) {                            
        (event.cy.container()).style.cursor = 'pointer';
    } );
    
    cy.on('mouseout', 'node', function (event) {
        (event.cy.container()).style.cursor = 'default';
    });    
}

function getNodeID() {
    let nodes = cy.nodes();
    let flag = false;
    let i = 0;
    for (; i < nodes.length; i++) {
        for (let j = 0; j < nodes.length; j++)
            if(`q${i}` == nodes[j].id()){
                flag = true;
                break;
            }
        if(!flag)
            return i;
        flag = false;
    }
    return i;
}

function getEdgeID() {
    let edges = cy.edges();
    let flag = false;
    let i = 0;
    for (; i < edges.length; i++) {
        for (let j = 0; j < edges.length; j++)
            if(`e${i}` == edges[j].id()){
                flag = true;
                break;
            }
        if(!flag)
            return i;
        flag = false;
    }
    return i;
}

function defaultNodeColorWithID(numClick) {
    cy.nodes(`[id = "${numClick}"]`).style({
        'background-color': '#666'
    });
    return false;
}

function mostrarDivEditNode(divEditNode, x, y) {
    divEditNode.style.left = `${x}px`;
    divEditNode.style.top = `${y}px`;
    divEditNode.style.display = 'flex';
}

function esconderDivEditNode() {
    document.getElementById('diveditnode').style.display = 'none';
    nodeAnteEdit = false;
}

function setDivEditFinalInitial(evtTarget) {
    let inputInitial = document.getElementById('inputinitialnode');
    let inputFinal = document.getElementById('inputfinalnode');
    evtTarget.style('background-image') != 'none' ? inputInitial.checked = true : inputInitial.checked = false;
    evtTarget.style('border-width') != '0px' ? inputFinal.checked = true : inputFinal.checked = false;
}

function selectBtt(btt) {
    cy.removeAllListeners();
    esconderDivEditNode();
}

function editBtt(btt) {
    cy.removeAllListeners();
    cursorPointerOverNode();
    cy.on('tap', function(event){
        var evtTarget = event.target;
        let divEditNode = document.getElementById('diveditnode');
        if(evtTarget !== cy)
            if(evtTarget.isNode())
                if(nodeAnteID == evtTarget.id())
                    if(nodeAnteEdit == true)
                        esconderDivEditNode();
                    else {
                        setDivEditFinalInitial(evtTarget);
                        mostrarDivEditNode(divEditNode, event.renderedPosition.x, event.renderedPosition.y);
                        nodeAnteEdit = true;
                    }
                else {
                    setDivEditFinalInitial(evtTarget);
                    mostrarDivEditNode(divEditNode, event.renderedPosition.x, event.renderedPosition.y);
                    nodeAnteID = evtTarget.id();
                    nodeAnteEdit = true;
                }
                /*evtTarget.style({
                        'background-color': 'lightblue'
                    });*/
            else esconderDivEditNode();
        else esconderDivEditNode();
    });
}

function addNodeBtt(btt) {
    cy.removeAllListeners();
    esconderDivEditNode();
    cy.on('tap', function(event){
        var evtTarget = event.target;
        
        if(evtTarget === cy){
            cy.add({
                group: 'nodes',
                data: { id: `q${getNodeID()}`, weight: 75 },
                renderedPosition: {
                    x: event.renderedPosition.x,
                    y: event.renderedPosition.y,
                }
            });
        }
    });
}

function addArrowBtt(btt) {
    cy.removeAllListeners();
    cursorPointerOverNode();
    esconderDivEditNode();
    if(typeof(addArrowBtt.numClick) == 'undefined')
        addArrowBtt.numClick = false;
    cy.on('tap', function(event){
        var evtTarget = event.target;
        if(evtTarget !== cy)
            if(evtTarget.isNode())
                if(addArrowBtt.numClick == false){
                    addArrowBtt.numClick = evtTarget.id();
                    evtTarget.style({
                        'background-color': 'lightblue'
                    });
                }else {
                    let labelAux = prompt('Digite o caractere da transição (deixe vazio para transição nula):');
                    if(!labelAux)
                        labelAux = 'λ';
                    cy.add({
                        group: 'edges',
                        data: { id: `e${getEdgeID()}`, source: `${addArrowBtt.numClick}`, target: `${evtTarget.id()}`,
                                label: `${labelAux}` }
                    });
                    addArrowBtt.numClick = defaultNodeColorWithID(addArrowBtt.numClick);
                }
            else addArrowBtt.numClick = defaultNodeColorWithID(addArrowBtt.numClick);
        else addArrowBtt.numClick = defaultNodeColorWithID(addArrowBtt.numClick);
    });
}

function removeBtt(btt) {
    cy.removeAllListeners();
    cursorPointerOverNode();
    esconderDivEditNode();
    cy.on('tap', function(event){
        var evtTarget = event.target;
        if(evtTarget !== cy )
            cy.remove(evtTarget);
    });
}

window.addEventListener('load', function init() {
    let btts = document.querySelectorAll(".cynavbtt");
    for (let i = 0; i < btts.length; i++)
        if(btts[i].id == 'selectbtt')
            btts[i].addEventListener('click', (event) => selectBtt(event));
        else if(btts[i].id == 'editbtt')
            btts[i].addEventListener('click', (event) => editBtt(event));
        else if(btts[i].id == 'addnodebtt')
            btts[i].addEventListener('click', (event) => addNodeBtt(event));
        else if(btts[i].id == 'addarrowbtt')
            btts[i].addEventListener('click', (event) => addArrowBtt(event));
        else if(btts[i].id == 'removebtt')
            btts[i].addEventListener('click', (event) => removeBtt(event));
})