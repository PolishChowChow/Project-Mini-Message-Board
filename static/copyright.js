function generateCopyright(){
    const year = new Date().getFullYear();
    const nickname = 'PolishChowChow';
    return `copyright ${year} ${nickname}`;
}
function handleBodyLoad() {
    document.querySelector("p#copyright").textContent = generateCopyright();
}
window.addEventListener("load", handleBodyLoad)