/*
$(".slider").slider({
    orientation: "horizontal",
    min: 0,
    max: 255,
    step: 1,
    slide: function( event, ui ) {
        $( "#match" );
    }   
});
*/
$.fn.hexxed = function(settings)
{

    this.html(" \
        <h1>Hexxed</h1> \
        <h2>Guess the Color!</h2> \
        <!-- Swatches --> \
        <div class=\"hexxed-swatch\" id=\"hexxed-gen\"></div> \
        <div class=\"hexxed-swatch\" id=\"hexxed-match\"></div> \
        <div id=\"scoring\"> \
            <p>Score: <span id=\"hexxed-score\"></span></p> \
            <p>Round: <span id=\"hexxed-round\">1</span></p> \
        </div> \
        <div class=\"hexxed-slider\"> \
            <div id=\"hexxed-sliderRed\"></div> \
            <p id=\"hexxed-sliderRed-value\">255</p> \
        </div> \
        <div class=\"hexxed-slider\"> \
            <div id=\"hexxed-sliderGreen\"></div> \
            <p id=\"hexxed-sliderGreen-value\">255</p> \
        </div> \
        <div class=\"hexxed-slider\"> \
            <div id=\"hexxed-sliderBlue\"></div> \
            <p id=\"hexxed-sliderBlue-value\">255</p> \
        </div> \
        <div id=\"hexxed-booton\"> \
            <button type=\"button\">Got It!</button> \
        </div> \
        <p>Your damn errors: <span id=\"hexxed-percent_error\"></span></div> \
    ");
    $("document").ready(function()
    {
        var m = new Date();
        start_time = m.getTime();
    });



    // Initial color for the match swatch;
    var color = [255,255,255];
    // make a random color and set it as background for swatch
    var randcolor = Math.floor(Math.random() * 16777216).toString(16);
    randcolor = /*"#000000"; */ "#" + "0".repeat(6-randcolor.length) + randcolor;
    
    var color_error= 0;
    
    var start_time;
    
    var end_time=0;
    
    $("#hexxed-gen")[0].style.backgroundColor = randcolor;
    
    $("#hexxed-match").css("background-color", "#000000");

    function updateColor (selector)
    {
        selector.css("background-color", "rgb("+color.join(",")+")");
    }
    
    updateColor($("#hexxed-match"));
    
    $("#hexxed-sliderBlue").slider({
        orientation: "horizontal",
        min: 0,
        max: 255,
        step: 1,
        value: 255,
        slide: function( event, ui ) {
            $( "#hexxed-sliderBlue-value" ).html( ui.value );
            $( "#hexxed-sliderBlue" ).css("background","rgb(0,0,"+ ui.value +")");
            color[2] = ui.value;
            updateColor($("#hexxed-match"));
        }   
    });
    
    $("#hexxed-sliderGreen").slider({
        orientation: "horizontal",
        min: 0,
        max: 255,
        step: 1,
        value: 255,
        slide: function( event, ui ) {
            $( "#hexxed-sliderGreen-value" ).html( ui.value );
            $( "#hexxed-sliderGreen" ).css("background","rgb(0,"+ ui.value +",0)");
            color[1] = ui.value;
            updateColor($("#hexxed-match"));
        }   
    });
    $("#hexxed-sliderRed").slider({
        orientation: "horizontal",
        min: 0,
        max: 255,
        step: 1,
        value: 255,
        slide: function( event, ui ) {
            $( "#hexxed-sliderRed-value" ).html( ui.value );
            $( "#hexxed-sliderRed" ).css("background","rgb("+ ui.value +",0,0)");            
            color[0] = ui.value;
            updateColor($("#hexxed-match"));
        }   
    });
    
    function submit(){
       var d = new Date();
       end_time = d.getTime();
       var val = hextodecimal(randcolor);
       var cent = percenterror(color[0],color[1],color[2],val[0],val[1],val[2]);
       $("#hexxed-percent_error").html(cent.toFixed(2)+"%");
    }

    $("#hexxed-booton").click(submit);
    
    function hextodecimal(x) {
        var rednum = x.substring(1,3);
        var greennum = x.substring(3,5);
        var bluenum = x.substring(5); 
        var r = parseInt(rednum,16);
        var g = parseInt(greennum,16);
        var b = parseInt(bluenum,16);
        return [r,g,b];
    }
    
    
    function percenterror(user_redish,user_greenish,user_blueish,act_red,act_green,act_blue){
        var redpercent = Math.abs(user_redish - act_red)/255 * 100;
        var greenpercent=Math.abs(user_greenish - act_green)/255 * 100;
        var bluepercent=Math.abs(user_blueish - act_blue)/255 * 100;
        
        return (redpercent+greenpercent+bluepercent)/3;
        
    }
    
    function totalscore(){
        return ((15 - settings.difficulty - color_error) / (15 - settings.difficulty)) * (end_time - start_time);
    
        
    }
};

var settings = {difficulty: 5};

$("#hexxed").hexxed(settings);