function runERtests() {
    let regra = new RegExp(`^${document.getElementsByClassName("inputregrex")[0].value}$`);
    let allRows = document.querySelectorAll(".divtestarearow");
    for (let i = 0; i < allRows.length; i++) {
        let inputColumn = (allRows[i].firstElementChild).firstElementChild;
        let resultColumn = (allRows[i].lastElementChild).firstElementChild;
        if(regra.test(inputColumn.value))
            resultColumn.innerHTML = "ACEITO";
        else resultColumn.innerHTML = "REJEITADO";
    }
}

window.addEventListener('load', function init() {
    document.getElementById('bttenviartestes').addEventListener('click', runERtests);
})