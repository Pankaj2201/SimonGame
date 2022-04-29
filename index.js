
var buttonColors =["red", "blue", "green", "yellow"];
var randomChosenColor;
var gamePattern = [];
var clickedPattern = [];
var started = false;
var level = 0;

// listen to user presses any while game tab is open
$(document).keydown(function() {
    if (!started) {
      $("h1").text("Level " + level);
      nextSequence();
      started = true;
    }
  });


// 
$(".boxesWithBorder").click(function(event){
var targetClass = event.currentTarget.classList[0]
clickedPattern.push(targetClass);
clickAnimation(targetClass);
checkAnswer(clickedPattern.length-1);
});


function clickAnimation(value){
    var activeButton = $("." + value)
    activeButton.addClass("glow");
    setTimeout(function(){
        activeButton.removeClass("glow");
    }, 300);    
}

function flashAnimation(randomChosenColor){
    var activeButton = $("." + randomChosenColor + "box")
    activeButton.addClass("hide");
    setTimeout(function(){
        activeButton.removeClass("hide");
    }, 300);
} 

function nextSequence(value){
    clickedPattern = [];
    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*3)+1;
    randomChosenColor = buttonColors[randomNumber]; 
    gamePattern.push(randomChosenColor);
    flashAnimation(randomChosenColor)
}

function checkAnswer(currentLevel) {
    console.log("clicked" + clickedPattern)
    console.log("game" + gamePattern)

    if (gamePattern[currentLevel] +'box' === clickedPattern[currentLevel]) {
      if (clickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      $("body").addClass("game-over");
      $("h1").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }