function removeAllChildren(element) {
    let child = element.lastElementChild;
    while (child) {
        element.removeChild(child);
        child = element.lastElementChild;
    }
}

function callHome(){
    let main = document.getElementsByTagName("main")[0];
    removeAllChildren(main);
    let object = document.createElement('object');
    object.setAttribute('id','er');
    object.setAttribute('type','text/html');
    object.setAttribute('data','er.html');
    main.appendChild(object);
}

function changeContent(valor) {
    let main = document.getElementsByTagName("main")[0];
    removeAllChildren(main);
    let object = document.createElement('object');
    object.setAttribute('id',`${valor}`);
    object.setAttribute('type','text/html');
    object.setAttribute('data',`${valor}.html`);
    main.appendChild(object);
}