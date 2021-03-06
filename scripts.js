$.fn.hexxed = function(settings)
{
    // make sure settings are defined
    if( settings === undefined )
    {
        settings = {difficulty: 5, max_turns: 5};
    }
    if ( settings.difficulty === undefined )
    {
        settings.difficulty = 5;
    }
    if ( settings.max_turns === undefined )
    {
        settings.max_turns = 5;
    }
    
    // Set up the structure of the game
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
        <div id=\"hexxed-next\"> \
            <button type=\"button\">Next</button> \
        </div> \
        <p>Your errors: <span id=\"hexxed-percent_error\"></span></div> \
    ");


    var turns = 0;

    // Initial color for the match swatch;
    var color = [255,255,255];
    var randcolor = "#000000";
    
    var color_error= 0;
    
    var start_time=0;
    
    var end_time=0;

    var score = 0;
    
    function updateColor (selector)
    {
        selector.css("background-color", "rgb("+color.join(",")+")");
    }
    
    // Slider controlling the amount of Blue Color
    
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
    
    // Slider controlling the amount of Green Color
    
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
    
    // Slider controlling the amount of Red Color
    
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
    
    // This function submits the player guess for the color. The function then returns the percentage error for the guess.
    
    function submit(){
       var d = new Date();
       end_time = d.getTime();
       var val = hextodecimal(randcolor);
       var cent = percenterror(color[0],color[1],color[2],val[0],val[1],val[2]);
       $("#hexxed-percent_error").html(cent.toFixed(2)+"%");
    }

    $("#hexxed-booton").click(submit);

    
    $("#hexxed-next").click(reset);
    
    function hextodecimal(x) {
        var rednum = x.substring(1,3);
        var greennum = x.substring(3,5);
        var bluenum = x.substring(5); 
        var r = parseInt(rednum,16);
        var g = parseInt(greennum,16);
        var b = parseInt(bluenum,16);
        return [r,g,b];
    }
    
    // This function calculates the user error for each guess.
    
    function percenterror(user_redish,user_greenish,user_blueish,act_red,act_green,act_blue){
        var redpercent = Math.abs(user_redish - act_red)/255 * 100;
        var greenpercent=Math.abs(user_greenish - act_green)/255 * 100;
        var bluepercent=Math.abs(user_blueish - act_blue)/255 * 100;
        
        return (redpercent+greenpercent+bluepercent)/3;
        
    }
    
    // This function calculates the total score for the player.
    
    function totalscore(){
        return Math.max(0, ((15 - settings.difficulty - color_error) / (15 - settings.difficulty)) * (15000 - end_time + start_time));
    }
    
    function finish()
    {
        var m = new Date();
        end_time = m.getTime();
        score += totalscore();
        $("#hexxed-score").html(score);
        $("#hexxed-next").unbind("click");
        alert("Your final score: "+score);
        // This would be a good time to POST high scores to a server
    }
    
    // This function resets the slider and adds the score from the current turn to the total score.
    
    function reset() {
        var m = new Date();
        end_time = m.getTime();
        if ( turns > 0 )
        {
            score += totalscore();
        }
        
        color = [255,255,255];
        updateColor($("#hexxed-match"));
        $("#hexxed-sliderBlue").css("background","rgb(255,0,0)");
        $("#hexxed-sliderRed").slider('value', 255);
        $("#hexxed-sliderGreen").css("background","rgb(0,255,0)");
        $("#hexxed-sliderGreen").slider('value', 255);
        $("#hexxed-sliderBlue").css("background","rgb(0,0,255)");
        $("#hexxed-sliderBlue").slider('value', 255);
        // make a random color and set it as background for swatch
        randcolor = Math.floor(Math.random() * 16777216).toString(16);
        randcolor = "#" + "0".repeat(6-randcolor.length) + randcolor;
        color_error= 0;
        $("#hexxed-gen")[0].style.backgroundColor = randcolor;
        ++turns;
        $("#hexxed-round").html(turns);
        $("#hexxed-score").html(score);
        if ( turns >= settings.max_turns )
        {
            $("#hexxed-next button").html("Submit");
            $("#hexxed-next").unbind("click");
            $("#hexxed-next").click(finish);
        }
        start_time = m.getTime();
    
    }

    $("document").ready(function()
    {

        reset();
    });
    return this;
};

var settings = {difficulty: 5, max_turns: 5};

$("#hexxed").hexxed(settings);