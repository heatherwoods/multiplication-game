// JavaScript Document

"use strict";

/*---------------- TARGET FUNCTIONALITY ----------------------

onclick fact family:
	1. sets score = 0
	2. fact family appears on card
	3. last index from random product array appears on card, removed from array
	4. correct answer is calculated and stored

user enters answer input

onclick check btn:
	1. input validation
	2. check if user answer = stored correct answer
	3. display correct/incorrect msg
	4. if correct, add 1 to score

onclick next btn:
	1. input validation
	2. if array length != 0:
		- pop last array item
		- calculate & store answer
		else
		- display results screen with score
		
results screen:
	*show score
	*includes fact family buttons
	*disable visited buttons

----------------------------------------------------------*/




	
var	cardFront = document.getElementById("card-front").innerHTML,
	score = 0,
	prodArrAfterFam = 0,
	ans = 0;


/*---------------------------------------------------------
function to get fact fam from user input on click
and put that value in a variable 
then display variable on card and call factFam function
----------------------------------------------------------*/

function famChoice(objButton) {
	document.getElementById("famNum").innerHTML = objButton.value;
	factFam();
	document.getElementById("flash-cards-screen").style.display = "block";
	document.getElementById("fact-fam-screen").style.display = "none";
	document.getElementById("fam-btns-screen").style.display = "none";
	document.getElementById("results-screen").style.display = "none";
	
	document.getElementById("ans-input").focus();
}


/*----------------------------------------------------------
function to shuffle product array
----------------------------------------------------------*/

function shuffleArray(prodArr) {
	for (let i = prodArr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i+1));
		[prodArr[i], prodArr[j]] = [prodArr[j], prodArr[i]];
	}
	return prodArr;
}


/*-------------------------------------------
on click fact family after famChoice happens, 
set score = 0
shuffle array
display last index of product array on card & delete it


--------------------------------------------*/

function factFam() {
	//set or reset score to 0
	score = 0;
	let	prodArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
	shuffleArray(prodArr);
	//display the last index of randomized product array on card, remove that item to make sure it doesn't show up later
	document.getElementById("prodNum").innerHTML = prodArr.pop();
	prodArrAfterFam = prodArr;
}




/*--------------------------------------------
calculate correct answer
--------------------------------------------*/

function calcAns() {
	let fam = document.getElementById("famNum").innerHTML,
		prod = document.getElementById("prodNum").innerHTML;
	//multiply to get correct answer
		ans = fam * prod;
	return ans;
}

/*--------------------------------------------
check ans on btn click
--------------------------------------------*/

//if user input = ans, correct
//else, incorrect

function checkAns() {
	
	//get input
	var userAns = document.getElementById("ans-input").value,
		fam = document.getElementById("famNum").innerHTML,
		prod = document.getElementById("prodNum").innerHTML;
	
	//validate
		if (!userAns) {
			document.getElementById("msg").style.color = "#f76767";
			document.getElementById("msg").innerHTML = "Please enter a number first.";
		} else {
			calcAns();
			
			
			//calculate if ans = userAns
			if (userAns == ans) {
				document.getElementById("msg").style.color = "#E7D097";
				document.getElementById("msg").innerHTML = "Correct!";
				document.getElementById("corr-ans").innerHTML = ans;
				document.getElementById("flip-card").style.display = "inline";
				score = score + 1;
				document.getElementById("ans-input").disabled = "true";
				document.getElementById("next").style.visibility = "visible";
			} else {
				document.getElementById("msg").style.color = "#f76767";
				document.getElementById("msg").innerHTML = "Incorrect. The answer is " + ans + "."
				document.getElementById("corr-ans").innerHTML = ans;
				document.getElementById("flip-card").style.display = "inline";
				document.getElementById("ans-input").style.border = "2px solid red";
				document.getElementById("ans-input").disabled = "true";
				document.getElementById("next").style.visibility = "visible";
			}
		}
}



/*--------------------------------------------
next btn click
- if array length != 0, pop last array item, display it on card
- calc ans
- else, show results screen
--------------------------------------------*/

function nextQ() {
	
	clearInput();
	
	document.getElementById("flip-card").style.display = "none";
	document.getElementById("ans-input").disabled = "";
	document.getElementById("ans-input").focus();
	document.getElementById("ans-input").style.border = "none";
	document.getElementById("msg").innerHTML = "";
	document.getElementById("msg").style.color = "#E7D097";
	document.getElementById("next").style.visibility = "hidden";
	
	if (prodArrAfterFam.length > 0) {
		shuffleArray(prodArrAfterFam);
		document.getElementById("prodNum").innerHTML = prodArrAfterFam.pop();
		
	} else {
		document.getElementById("score-area").innerHTML = score;
		if (score < 7) {
			document.getElementById("good-bad").innerHTML = "Better luck next time!";
		}
		document.getElementById("flash-cards-screen").style.display = "none";
		
		//show results screen
		document.getElementById("results-screen").style.display = "block";
		document.getElementById("fam-btns-screen").style.display = "block";
	}
	
}


/*--------------------------------------------
clear input
--------------------------------------------*/

function clearInput() {
	document.getElementById("ans-input").value = "";
}




