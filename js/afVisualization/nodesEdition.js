function setNodeInitial(event) {
    let checkbox = event.target;
    let nodeAtual = cy.getElementById(`${nodeAnteID}`);
    if(checkbox.checked){
        let allNodes = cy.nodes();
        for (let i = 0; i < allNodes.length; i++)
            if(allNodes[i].style('background-image') != 'none'){
                allNodes[i].style({
                    'background-image': 'none'
                });
                break;
            }
        nodeAtual.style({
            // Relativo
            // 'background-image': 'url(/images/right_arrow.png)'
            // Absoluto
            'background-image': 'url(https://flautistamacabro.github.io/CTLR/images/right_arrow.png)'
        });
    }
    else
        nodeAtual.style({
            'background-image': 'none'
        });
}

function setNodeFinal(event) {
    let checkbox = event.target;
    let nodeAtual = cy.getElementById(`${nodeAnteID}`);
    if(checkbox.checked)
        nodeAtual.style({
            'border-width': '3px'
        });
    else    nodeAtual.style({
                'border-width': '0px'
            });
}

window.addEventListener('load', function init() {
    document.getElementById('inputinitialnode').addEventListener('change', setNodeInitial);
    document.getElementById('inputfinalnode').addEventListener('change', setNodeFinal);
})
