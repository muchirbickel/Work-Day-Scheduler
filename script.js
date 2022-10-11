
var currentDate = moment().format("dddd, MMMM Do");
var currentTime = moment().format("hA");
var $pEl = $("#currentDay");
var timeArray = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];
var hourArray = ["hour-9", "hour-10", "hour-11", "hour-12", "hour-1", "hour-2", "hour-3", "hour-4", "hour-5"];

// displaying current day and month
$pEl.text(currentDate);

/**
 * This function will set the color according to time block.
 */
function colorDisplay(){
    var index = -1;
    for(var i = 0; i < timeArray.length; i++){
        if(currentTime == timeArray[i]){
            index = i;
            break;
        }else{
            index = -1;
        }
    }

    if(currentTime == "12AM"){
        for(var i = 0; i < timeArray.length; i++){
            $("#"+timeArray[i]).css("background", "#00FF00");
        }
    }else if(index >= 0){
        // gray color
        for (var i = 0; i < index; i++){
            $("#"+timeArray[i]).css("background", "#D3D3D3");
        }

        // red color
        for (var i = 0; i < timeArray.length; i++){
            var time = timeArray[i];
            if(time == currentTime){
                $("#"+timeArray[i]).css("background", "#FF0000");
            }
        }

        // green color
        for (var i = index + 1; i < timeArray.length; i++){
            $("#"+timeArray[i]).css("background", "#00FF00");
        }
    }else if(index == -1) {
        // gray color
        for(var i = 0; i < timeArray.length; i++){
            $("#"+timeArray[i]).css("background", "#D3D3D3");
        }
    }
}

/**
 * This function is to display message in time blocks.
 */
function displayMessage(){
    for(var i = 0; i < timeArray.length; i++){
        var value = localStorage.getItem(timeArray[i]);
        $("#"+timeArray[i]).val(value);
    }
}

/**
 * This function will display comfirmation message and make it fade out with in 5 seconds.
 */
function displayConfirm(){
    $("#add-message").css("display", "block");
    $("#add-message").fadeOut(3000);
}

// call to color display function.
colorDisplay();

// event listener function to handle the click events.
document.addEventListener("click", function(event){
    var child = event.target;
    console.log(child);
    for(var i = 0; i < hourArray.length; i++){
        if(child.matches("#"+hourArray[i])){
            var $text = $("#"+timeArray[i]).val();
            if($text.length != 0){
                localStorage.setItem(timeArray[i], $text);
                displayConfirm();
            }
        }
    }
});

// call to display message fuction.
displayMessage();