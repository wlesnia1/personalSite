//fix background gradient not moving along with the page
window.addEventListener('scroll', () => {
    let y = 0 + (window.scrollY || window.pageYOffset); 
    document.body.style.setProperty("background-position", "0px " + y + "px");
});

document.getElementById("rotateLeft").addEventListener("click", () => {
    let images = document.body.getElementsByTagName("img");
    for (let image of images) {
        // fixing my own image being flipped and rotated takes a lot of cheeky shenanigans searching through the transform css text
        // so let's just not rotate my picture instead; this also avoids the overflow when my image is horizontal instead of vertical
        if (image.id === "me") { continue; }
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
        if (image.id === "me") { continue; }
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

function flipMe() {
    let me = document.getElementById("me");
    if (!me.style.cssText) { me.style.setProperty("transform", "scale(-1, 1)"); }
    else {
        if (me.style.cssText.indexOf("-") === -1) {
            me.style.setProperty("transform", "scale(-1, 1)");            
        } else {
            me.style.setProperty("transform", "scale(1, 1)");
        }
    }
}

document.getElementById("me").addEventListener("click", flipMe);
document.getElementById("flipMeLink").addEventListener("click", flipMe);