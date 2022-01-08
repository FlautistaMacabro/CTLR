// Globals para identificação dos Nodes e adição de transições (se possível melhorar depois)
var nodeAnteID = '';
var nodeAnteEdit = false;
var sourceArrowID = false;

// Funções auxiliares

function cursorPointerOverEdge() {
    cy.on('mouseover', 'edge', function (event) {                            
        (event.cy.container()).style.cursor = 'pointer';
    } );
    
    cy.on('mouseout', 'edge', function (event) {
        (event.cy.container()).style.cursor = 'default';
    });    
}

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

function setDefaultPosOrCanceledNewArrow() {
    let input = document.getElementById('inputarrowlabel');
    if(sourceArrowID){
        cy.nodes(`[id = "${sourceArrowID}"]`).style({
            'background-color': 'rgba(207, 103, 221, 0.49)'
        });
        sourceArrowID = false;
    }
    if(typeof(input) !== 'undefined' && input != null)
        input.remove()
}

function mostrarDivEditNode(divEditNode, posX, posY) {
    divEditNode.style.left = `${posX}px`;
    divEditNode.style.top = `${posY}px`;
    divEditNode.style.display = 'flex';
}

function esconderDivEditNode() {
    nodeAnteEdit = false;
    document.getElementById('diveditnode').style.display = 'none';
}

function setDivEditFinalInitial(evtTarget) {
    let inputInitial = document.getElementById('inputinitialnode');
    let inputFinal = document.getElementById('inputfinalnode');
    evtTarget.style('background-image') != 'none' ? inputInitial.checked = true : inputInitial.checked = false;
    evtTarget.style('border-width') != '0px' ? inputFinal.checked = true : inputFinal.checked = false;
}

function labelFromArrowInput(event, targetArrowID) {
    if(event.key != 'Enter') return;
    let labelAux = (event.target).value;
    if(!labelAux)
        labelAux = 'λ';
    cy.add({
        group: 'edges',
        data: { id: `e${getEdgeID()}`, source: `${sourceArrowID}`, target: `${targetArrowID}`,
                label: `${labelAux}` }
    });
    setDefaultPosOrCanceledNewArrow();
}

function setArrowLabelInput(posX, posY, targetArrowID) {
    // return prompt('Digite o caractere da transição (deixe vazio para transição nula):');
    let input = document.createElement('input');
    let posXmedio, posYmedio;
    if(sourceArrowID == targetArrowID){
        posXmedio = posX;
        posYmedio = posY;
    }else {
        let nodeAnte = cy.getElementById(`${sourceArrowID}`);
        posXmedio = (nodeAnte.renderedPosition('x') + posX)/2;
        posYmedio = (nodeAnte.renderedPosition('y') + posY)/2;
    }
    input.setAttribute('type', 'text');
    input.setAttribute('id', 'inputarrowlabel');
    input.classList.add('inputaddarrow');
    input.style.left = `${posXmedio}px`;
    input.style.top = `${posYmedio}px`;
    input.addEventListener('keyup', (event) => labelFromArrowInput(event, targetArrowID));
    document.getElementsByTagName('main')[0].appendChild(input);
    input.focus();
}

// Listeners dos Botões 

function selectBtt() {
    cy.removeAllListeners();
    esconderDivEditNode();
    setDefaultPosOrCanceledNewArrow();
}

function editBtt() {
    cy.removeAllListeners();
    cursorPointerOverNode();
    setDefaultPosOrCanceledNewArrow();
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

function addNodeBtt() {
    cy.removeAllListeners();
    esconderDivEditNode();
    setDefaultPosOrCanceledNewArrow();
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

function addArrowBtt() {
    cy.removeAllListeners();
    cursorPointerOverNode();
    esconderDivEditNode();
    cy.on('tap', function(event){
        var evtTarget = event.target;
        if(evtTarget !== cy)
            if(evtTarget.isNode())
                if(!sourceArrowID){
                    sourceArrowID = evtTarget.id();
                    evtTarget.style({
                        'background-color': 'rgba(215, 85, 255, 0.123)'
                    });
                }else
                    setArrowLabelInput(event.renderedPosition.x, event.renderedPosition.y, evtTarget.id());
            else setDefaultPosOrCanceledNewArrow();
        else setDefaultPosOrCanceledNewArrow();
    });
}

function removeBtt() {
    cy.removeAllListeners();
    cursorPointerOverNode();
    cursorPointerOverEdge();
    esconderDivEditNode();
    setDefaultPosOrCanceledNewArrow();
    cy.on('tap', function(event){
        var evtTarget = event.target;
        if(evtTarget !== cy )
            cy.remove(evtTarget);
    });
}

function clearBtt() {
    cy.removeAllListeners();
    cursorPointerOverNode();
    esconderDivEditNode();
    setDefaultPosOrCanceledNewArrow();
    cy.remove('edge');
    cy.remove('node');
}

window.addEventListener('load', function init() {
    document.getElementById('selectbtt').addEventListener('click', selectBtt);
    document.getElementById('editbtt').addEventListener('click', editBtt);
    document.getElementById('addnodebtt').addEventListener('click', addNodeBtt);
    document.getElementById('addarrowbtt').addEventListener('click', addArrowBtt);
    document.getElementById('removebtt').addEventListener('click', removeBtt);
    document.getElementById('clearbtt').addEventListener('click', clearBtt);
})