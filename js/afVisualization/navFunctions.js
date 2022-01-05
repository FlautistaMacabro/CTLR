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

function selectBtt(btt) {
    cy.removeAllListeners();
}

function editBtt(btt) {
    cy.removeAllListeners();
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
}

function removeBtt(btt) {
    cy.removeAllListeners();
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