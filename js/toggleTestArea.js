function toggleTestArea() {
    let btt = document.getElementById("bttopentestarea");
    let divContent = document.getElementById("divcontenttestarea");
    divContent.classList.toggle("display");
    btt.classList.toggle("content");
}