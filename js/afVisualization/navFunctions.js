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

function selectBtt(btt) {
    cy.removeAllListeners();
}

function editBtt(btt) {
    cy.removeAllListeners();
    cursorPointerOverNode();
}

function addNodeBtt(btt) {
    cy.removeAllListeners();
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