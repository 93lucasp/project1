

	window.onload = function() {
		var seconds= 280;
		var gameData;
	    var countWrong = 0;
	    var countRight = 0;
	    var quizAnswer;
	    var countAnswers;
	    $("#timer").html("Timer: " + 280);
	    $("#answersWrong").html(countWrong);
	    $("#answersRight").html(countRight);
	    $("#popEnd").hide();
	    $("#popLooser").hide();
	    $("#mainContainer").hide();
	    $(".start").click(function() {
	    $(".start").hide();
	    $("#instructions").hide();
	    $("#mainContainer").show();
	    var input = $("#options").val();
	    var questionData = chooseCategory(input);
	    gameData = questionData;
	    timerSeconds();
	    startGame(questionData);
		});

	    //Function for the time
	    function timerSeconds(){
	   		
			window.setInterval(function(){
			$("#timer").html("Timer: " + seconds);
		  	seconds--;
		  	if (seconds === -2 && countAnswers !==40) {
		         
		  		 $("#timer").off();
		  		 $("#popLooser").show();
		  		 $("#mainContainer").hide();
		  	}
		    
			}, 1000);
		}

		//take my input from the select option
	    function chooseCategory(input) {
	        var category = data[input];
	        return category;
	    }

	    //on click of restart startGame again
	    $(".restart").on("click", function() {
	    	$("#level").html("Level: " + 1);
	        countWrong = 0;
	        countRight = 0;
	        seconds = 280;
	        countAnswers=0;	
	        window.setTimeout(function(){
	    	    $("#answersWrong").html(countWrong);
	    	    $("#answersRight").html(countRight);
	    	    $(".answers").off();
	    	    console.log(gameData);
	    	    startGame(gameData);
	    	    $("#timer").off();
	        }, 1000);
	    });
	    //on click of restart startGame again
	    $(".restart2").on("click", function(e) {
	        seconds= 280;
	        countWrong = 0;
	        countRight = 0;
	        countAnswers=0;	
	        //to don't show the corrent score for an instant
	        window.setTimeout(function(){
        	$("#level").html("Level: " + 1);
	        $("#answersWrong").html(countWrong);
	        $("#answersRight").html(countRight);
	        $(".answers").off();
	        startGame(gameData);
	        $("#popEnd").hide();
	        $("#popLooser").hide();
	        $("#mainContainer").show();
	        $("#timer").off();
	    	}, 500);
	    });

	    //start the game
	    function startGame(gameQuestions) {
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

	         
	        }
	        
	            shuffle(gameQuestions);


	       
	        // put the elements of my array inside the div 
	        function quizList(value) {
	            countAnswers = countAnswers || 0;
	            if (gameQuestions[value]) {
	                var quizquestions = gameQuestions[value].question;
	                var quizChoices = gameQuestions[value].choices;
	                $("#questions").html("<h2>" + quizquestions + "</h2>");
	                for (var j = 0; j < quizChoices.length; j++) {

	                    //putting the choice inside my id answer.
	                    $("#answer" + [j]).html("<h3>" + quizChoices[j] + "</h3>");
	                }

	                if (countAnswers === gameQuestions.length - 1) {
	                    $("#popEnd").show();
	                    $("#mainContainer").hide();

	                }
	                countAnswers++;
	                //level up
	                if (countAnswers <= 10) {
	                    $("#level").html("Level: " + 1);
	                } else if (countAnswers <= 20 && countAnswers > 10) {
	                    $("#level").html("level: " + 2);
	                } else if (countAnswers <= 30 && countAnswers > 20) {
	                    $("#level").html("level: " + 3);
	                } else if (countAnswers <= 40 && countAnswers > 30) {
	                    $("#level").html("level: " + 4);
	                } 

	                //putting the correct answer inside my variable and increasing count
	                quizAnswer = gameQuestions[value].correct;
	                count++;
	            }
	        }

	        //Instructions if is right or wrong
	        $(".answers").on("click", function wrongOrRight() {
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
	                window.setTimeout(function() {
	                    $($button).removeClass('rightAnswer');

	                    //abilided others click
	                    $(".answers").bind("click", wrongOrRight);
	                    quizList(count);
	                }, 1000);
	            } else {

	                //adding a new class to my wrong element
	                $(this).toggleClass('wrongAnswer');
	                countWrong++;

	                //popLooser with the appropriate levels
	                if (countWrong >= 4 && countAnswers <= 10) {

	                    $("#popLooser").show();
	                    $("#mainContainer").hide();
	                } else if (countWrong >= 7 && 10 <= countAnswers <= 20) {

	                    $("#popLooser").show();
	                    $("#mainContainer").hide();
	                } else if (countWrong >= 8 && 20 <= countAnswers <= 30) {

	                    $("#popLooser").show();
	                    $("#mainContainer").hide();
	                } else if (countWrong >= 9 && 30 <= countAnswers <= 40) {

	                    $("#popLooser").show();
	                    $("#mainContainer").hide();
	                }

	                //putting countRight inside my div
	                $("#answersWrong").html(countWrong);

	                //disabled others click
	                $(".answers").unbind("click");

	                //removing my class after some second
	                window.setTimeout(function() {
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