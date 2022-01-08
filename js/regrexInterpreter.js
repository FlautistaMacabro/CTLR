function conferirRegrex() {
    let regra = new RegExp(`^${document.getElementsByClassName("inputregrex")[0].value}$`);
    let tam = 3;
    for (let i = 1; i < tam; i++) {
        let inputTeste = document.getElementsByClassName("inputregrex")[i];
        if(regra.test(inputTeste.value))
            inputTeste.style.backgroundColor = "rgb(71, 184, 152)";
        else inputTeste.style.backgroundColor = "rgb(204, 73, 80)";
    }
}

function conferirCampo(event){
    let regra = new RegExp(`^${document.getElementsByClassName("inputregrex")[0].value}$`);
    let inputTeste = event.target;
    if(regra.test(inputTeste.value))
        inputTeste.style.backgroundColor = "rgb(71, 184, 152)";
    else inputTeste.style.backgroundColor = "rgb(204, 73, 80)";
}

window.addEventListener('load', function init() {
    document.getElementsByClassName("inputregrex")[0].addEventListener('keyup', conferirRegrex);
    document.getElementsByClassName("inputregrex")[1].addEventListener('keyup', (event) => conferirCampo(event));
    document.getElementsByClassName("inputregrex")[2].addEventListener('keyup', (event) => conferirCampo(event));
    conferirRegrex();
})