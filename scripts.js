
$("#sliderRed").slider({
    orientation: "horizontal",
    min: 0,
    max: 255,
    step: 1,
    slide: function( event, ui ) {
        $( "#sliderRed-value" ).html( ui.value );
    }   
});

$("#sliderBlue").slider({
    orientation: "horizontal",
    min: 0,
    max: 255,
    step: 1,
    slide: function( event, ui ) {
        $( "#sliderBlue-value" ).html( ui.value );
    }   
});

$("#sliderGreen").slider({
    orientation: "horizontal",
    min: 0,
    max: 255,
    step: 1,
    slide: function( event, ui ) {
        $( "#sliderGreen-value" ).html( ui.value );
    }   
});

$( "#sliderRed-value" ).html(  $('#sliderRed').slider('value') );
$('.ui-widget-content').css('background','red');

$( "#sliderGreen-value" ).html(  $('#sliderGreen').slider('value') );
$('.ui-widget-content').css('background','green');

$( "#sliderBlue-value" ).html(  $('#sliderBlue').slider('value') );
$('.ui-widget-content').css('background','blue');