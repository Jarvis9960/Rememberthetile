var gamePattern = [];

var userClickedPattern = [];
var started = false;
var level = 0;

var buttonArray = ["red", "blue", "green", "yellow"];

$(document).keydown(function() {
  if (!started) {
    $("h1").html("level " + level);
    newSequence();
    started = true;
  }
});

$("[type = 'button']").click(function() {
  var clicked = event.srcElement.id;
  userClickedPattern.push(clicked);
  makeSound(clicked);
  animatePress(clicked);
  checkAnswer(userClickedPattern.length - 1);
});

function newSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonArray[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
  audio.play();
  level++;
  $("#level-title").text("Level " + level);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        newSequence();
      }, 1000);
    }
  } else {
    var gameOver = new Audio("sounds/wrong.mp3")
    gameOver.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    },200);
    $("h1").html("Gameover, please Anykey to restart")
    setTimeout(startOver,200);
  }
}

function makeSound(clickedButton) {

  switch (clickedButton) {
    case "green":
      var audio = new Audio("sounds/green.mp3");
      audio.play();
      break;
    case "red":
      var audio = new Audio("sounds/red.mp3");
      audio.play();
      break;
    case "yellow":
      var audio = new Audio("sounds/yellow.mp3");
      audio.play();
      break;
    case "blue":
      var audio = new Audio("sounds/blue.mp3");
      audio.play();
      break;
    default:
      var audio = new Audio("sounds/wrong.mp3");
      audio.play();
  }
}

function startOver() {
  level = 0;
  started = false;
  gamePattern = [];
}

function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function() {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}
