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
	
	
};

var controller = {
	
	
};

view.displayMessage("HIT!!!");
view.displayHit("00");
view.displayHit("66");
view.displayMiss("55");
