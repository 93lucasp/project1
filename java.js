$.getScript("database.js", function(){

});

//onload hide the contecnts of the main div and on click show it and start the game
window.onload = function() {
	var countWrong = 0;
	var countRight = 0;
	$( "#pop" ).hide();
	$( "#mainContainer" ).hide();
	$( ".start" ).click(function() {
    $( ".start" ).hide();
    $( "#instructions" ).hide();
    $( "#mainContainer" ).show();
    startGame();
});

//on click of restart startGame again
$( ".restart" ).click(function() {
	countWrong = 0;
    countRight = 0;
	$("#answersWrong").html(countWrong);
	$("#answersRight").html(countRight);
    $(".answers").off();
    startGame();
});


$( ".restart2" ).click(function() {
	countWrong = 0;
    countRight = 0;
	$("#answersWrong").html(countWrong);
	$("#answersRight").html(countRight);
    $(".answers").off();
    startGame();
    $( "#pop" ).hide();
    $( "#mainContainer" ).show();
});

//start the game
function startGame(){
	var count = 0;	

	//take the elements of the array random
	function shuffle(quiz) {

	    var currentIndex = quiz.length; 
	    var temporaryValue;
	    var randomIndex;
	  	while (0 !== currentIndex) {

	   		randomIndex = Math.floor(Math.random() * currentIndex);
	   		currentIndex -= 1;
	    	temporaryValue = quiz[currentIndex];
	   		quiz[currentIndex] = quiz[randomIndex];
	    	quiz[randomIndex] = temporaryValue;
	  }

	    return quiz;
	}
	shuffle(quiz);


	var quizAnswer;
    var countAnswers;
    // put the elements of my array inside the div 
	function quizList (value){
		countAnswers = countAnswers || 0;
		
    
		if (quiz[value]) {
		    var quizquestions = quiz[value].question;
			var quizChoices = quiz[value].choices;
			$("#questions").html("<h2>" + quizquestions + "</h2>");
			for (var j = 0; j < quizChoices.length; j++) {


				

			//putting the choice inside my id answer.
		    $("#answer" + [j]).html("<h3>" + quizChoices[j] + "</h3>");
		}
        
        if (countAnswers===quiz.length-1) {
					$( "#pop" ).show();
					$( "#mainContainer" ).hide();
				}
         countAnswers++;
		//putting the correct answer inside my variable and increasing count
		quizAnswer = quiz[value].correct;
	    count++;
		}
	}

	//Instructions if is right or wrong
	$( ".answers" ).on("click",function wrongOrRight() {
		 var valanswer = $(this).html();
	     var $button = this;
		 if (valanswer === "<h3>" + quizAnswer + "</h3>") {

		 	//adding a new class to my right element
		 	$(this).toggleClass('rightAnswer');
			countRight++;

			//putting countRight inside my div
		 	$("#answersRight").html(countRight);
		 	//disabled others click
		 	$(".answers").unbind("click");
		 	//removing my class after some second
		 	window.setTimeout( function(){
		 		$($button).removeClass('rightAnswer');
		 		//abilided others click
		 		$(".answers").bind("click", wrongOrRight);
	     		quizList(count);
	        }, 1000);
		 }

		 else {

		 	//adding a new class to my wrong element
		 	$(this).toggleClass('wrongAnswer');
		 	countWrong++;

		 	//putting countRight inside my div
		 	$("#answersWrong").html(countWrong);
		 	//disabled others click
		 	$(".answers").unbind("click");
		 	//removing my class after some second
		 	window.setTimeout( function(){
		 		$($button).removeClass('wrongAnswer');
		 		//abilided others click
		 		$(".answers").bind("click", wrongOrRight);
		 		quizList(count);
	        }, 1000);
		 }
		});
	//calling my quizList
	quizList(count);
  }
};

