/**
 * @author Home
 */


//variables

var view = {
	
	//method takes a string message and displays it
	//in the message display area
	
	displayMessage: function(msg){
		
		//code here
		var messageArea = document.getElementById("messageArea");
		messageArea.innerHTML = msg;
	},
	
	displayHit: function(location){
		var cell = document.getElementById(location);
		cell.setAttribute("class","hit");
		
	},
	
	displayMiss: function(location){
		var cell = document.getElementById(location);
		cell.setAttribute("class","miss");
	}
	
};

var model = {
	boardSize: 7,
	numShips: 3,
	shipLength; 3,
	shipsSunk 0,
	
	ships: [{locations:["06","16","26"], hits: ["","",""]},
			{locations:["24","34","44"], hits: ["","",""]},
			{locations:["10","11","12"], hits: ["","",""]}],
			
	fire: function(guess){
		
		for(var i = 0; i < this.numShips; i++){
			var ship = this.ships[i];
			locations = ship.locations;
			var index = locations.indexOf(guess);
			if(index >= 0){
				//We have a hit!
				ship.hits[index] = "hit";
				return true;
			}
		}
		return false;
	},
	
	isSunk: function(ship){
		for(var i = 0;i < this.shipLength;i++){
			if(ship.hits[i] !== "hit"){
				return false;
			}
		}
		return true;
	}
	
	
	
};

var controller = {
	guessess: 0,
	
	processGuess: function(guess){
		var location = parseGuess(guess);
		if(location){
			
		}
	}
	
	
};

function parseGuess(guess){
		var alphabet = ["A","B","C","D","E","F","G"];
		
		if(guess === null || guess.length !==2){
			alert("oops, please enter a letter and a number on the board.");
			
		}else{
			firstChar = guess.charAt(0);
			var row = alphabet.indexOf(firstChar);
			var column = guess.charAt(1);
			
			if(isNaN(row) || isNaN(column)){
				alert("oops, that isn't on the board.");
				
			}else if(row < 0 || row >= model.boardSize){
				alert("Oops, that's off the board!");
			}else{
				return row + column;
			}
			
		}
		return null;
	}; //Left off on page 355 

view.displayMessage("HIT!!!");
view.displayHit("00");
view.displayHit("66");
view.displayMiss("55");
