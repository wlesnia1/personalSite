//fix background gradient not moving along with page
window.addEventListener('scroll', () => {
    let y = 0 + (window.scrollY || window.pageYOffset); 
    document.body.style.setProperty("background-position", "0px " + y + "px");
    console.log(y)
});

document.getElementById("rotateLeft").addEventListener("click", () => {
    let images = document.body.getElementsByTagName("img");
    for (let image of images) {
        if (!image.style.cssText) { image.style.setProperty("transform", "rotate(330deg)"); }
        else {
            let curCSS = image.style.cssText;
            let curDegrees = Number(curCSS.slice(curCSS.search("[0-9]"), curCSS.search("deg")));
            curDegrees -= 30;
            if (curDegrees < 0) { curDegrees += 360; }
            image.style.setProperty("transform", "rotate(" + curDegrees + "deg)");
         }
    }
    return false;
});

document.getElementById("rotateRight").addEventListener("click", () => {
    let images = document.body.getElementsByTagName("img");
    for (let image of images) {
        if (!image.style.cssText) { image.style.setProperty("transform", "rotate(30deg)"); }
        else {
            let curCSS = image.style.cssText;
            let curDegrees = Number(curCSS.slice(curCSS.search("[0-9]"), curCSS.search("deg")));
            curDegrees += 30;
            if (curDegrees > 360) { curDegrees -= 360; }
            image.style.setProperty("transform", "rotate(" + curDegrees + "deg)");
         }
    }
    return false;
});

document.getElementById("me").addEventListener("click", function flipIt() {
    if (!this.style.cssText) { this.style.setProperty("transform", "scale(-1, 1)"); }
    else {
        if (this.style.cssText.indexOf("-") === -1) {
            this.style.setProperty("transform", "scale(-1, 1)");            
        } else {
            this.style.setProperty("transform", "scale(1, 1)");
        }
    }
});