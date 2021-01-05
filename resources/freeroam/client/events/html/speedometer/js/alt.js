alt.on('status', (enabled) => {
    if (enabled == true) {
        document.getElementById("container").style.visibility = "visible";
    } else {
        document.getElementById("container").style.visibility = "hidden";
    };
});