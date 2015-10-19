
$(".slider").slider({
    orientation: "horizontal",
    max: 255,
    min: 0
});

// make a random color and set it as background for swatch
randcolor = Math.floor(Math.random() * 16777216).toString(16);
randcolor = "#" + "0".repeat(6-randcolor.length) + randcolor;

$("#gen")[0].style.backgroundColor = randcolor;