function setNodeInitial(event) {
    let checkbox = event.target;
    let nodeAtual = cy.getElementById(`${nodeAnteID}`);
    if(checkbox.checked)
        nodeAtual.style({
            'background-image': 'url(../../images/right_arrow.png)'
        });
    else    nodeAtual.style({
                'background-image': 'none'
            });
}

function setNodeFinal(event) {
    let checkbox = event.target;
    let nodeAtual = cy.getElementById(`${nodeAnteID}`);
    if(checkbox.checked)
        nodeAtual.style({
            'border-width': '2px'
        });
    else    nodeAtual.style({
                'border-width': '0px'
            });
}

window.addEventListener('load', function init() {
    document.getElementById('inputinitialnode').addEventListener('change', setNodeInitial);
    document.getElementById('inputfinalnode').addEventListener('change', setNodeFinal);
})