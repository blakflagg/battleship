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
	shipLength: 3,
	shipsSunk: 0,
	
	ships: [{locations:[0,0,0], hits: ["","",""]},
			{locations:[0,0,0], hits: ["","",""]},
			{locations:[0,0,0], hits: ["","",""]}],
			
	fire: function(guess){
		
		for(var i = 0; i < this.numShips; i++){
			var ship = this.ships[i];
			locations = ship.locations;
			var index = locations.indexOf(guess);
			if(index >= 0){
				//We have a hit!
				ship.hits[index] = "hit";
				view.displayHit(guess);
				view.displayMessage("HIT!!!");
				
				if(this.isSunk(ship)){
					view.displayMessage("You Sank my battleship!");
					this.shipsSunk++;
				}
				return true;
			}
		}
		view.displayMiss(guess);
		view.displayMessage("You Missed.");
		
		return false;
	},
	
	isSunk: function(ship){
		for(var i = 0;i < this.shipLength;i++){
			if(ship.hits[i] !== "hit"){
				return false;
			}
		}
		return true;
	},
	
	generateShipLocations: function(){
		var locations;
		for(var i = 0; i < this.numShips; i++){
			
			do{
				locations = this.generateShip();
				
			}while(this.collision(locations));
			this.ships[i].locations = locations;
		}
	},
	
	generateShip: function(){
		var direction = Math.floor(Math.random() * 2);
		var row, col;
		
		if(direction === 1){
			//Generate horizontal ship
			row = Math.floor(Math.random() * this.boardSize);
			col = Math.floor(Math.random() * (this.boardSize - this.shipLength));
			
		}else{
			//Generate veritcal ship
			row = Math.floor(Math.random() * (this.boardSize - this.shipLength));
			col = Math.floor(Math.random() * this.boardSize);
		}
		
		var newShipLocations = [];
		
		for(var i = 0; i < this.shipLength; i++){
			if(direction === 1){
				// add location to array for new horizontal ship
				newShipLocations.push(row + "" + (col + i));
			}else{
				//add location for new vertical ship
				newShipLocations.push((row + i)+ "" +col);
			}
		}
		return newShipLocations;
	},
	
	collision: function(locations){
		for(var i = 0; i < this.numShips; i++){
			var ship = model.ships[i];
			for(var j = 0; j< locations.length;j++){
				if(ship.locations.indexOf(locations[j]) >=0){
					return true;
				}
			}
		}
		return false;
	}
	
};

var controller = {
	guessess: 0,
	
	processGuess: function(guess){
		var location = parseGuess(guess);
		if(location){
			this.guessess++;
			var hit = model.fire(location);
			
			if (hit && model.shipsSunk === model.numShips){
				view.displayMessage("You sank all my battleships, in " + this.guessess + " guessess");
				
			}
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
				
			}else if(row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize){
				alert("Oops, that's off the board!");
			}else{
				return row + column;
			}
			
		}
		return null;
	}; //Left off on page 355 
	
function handleFireButton(){
	
	var guessInput = document.getElementById("guessInput");
	var guess = guessInput.value;
	controller.processGuess(guess);
	guessInput.value = "";
};

function init(){
	var fireButton = document.getElementById("fireButton");
	fireButton.onclick = handleFireButton;
	
	var guessInput = document.getElementById("guessInput");
	guessInput.onkeypress = handleKeyPress;
	model.generateShipLocations();
	
};

function handleKeyPress(e){
	var fireButton = document.getElementById("fireButton");
	var key = e.keyCode;
	
	if(key === 13){
		fireButton.click();
		return false;
	}
};


window.onload = init;



