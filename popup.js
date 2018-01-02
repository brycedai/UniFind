//sets up all the Event Listeners 
document.addEventListener("DOMContentLoaded", function() {
  let findButton = document.getElementById("button");
  let textBox = document.getElementById("userinput");
  textBox.focus();
  findButton.addEventListener("click", searchAllTabs);
  textBox.addEventListener("keydown", function(event){
  	if (event.keyCode === 13){
  		event.preventDefault();
  		searchAllTabs();
  	}
  });
});

function searchAllTabs(){
	clearList();
	let UserInput = document.getElementById("userinput");
	let maxWidth = 250;
	//calls the following function on all tabs in the window with the extension open 
	chrome.tabs.query({currentWindow: true}, function(tabs) {
	  for (tab of tabs){
	  	let tabTitle = getTitle(tab);
	  	//sends the tab and user input to content.js.
	  	//Then creates a list in popup.html with the tab titles and the number of times the input was found
	    chrome.tabs.sendMessage(tab.id, {txt: UserInput.value}, function(response) {
	    	//Doesn't print out tabs with undefined. 
	    	//This means that new tab and all the chrome:// tabs won't appear
	    	if (response !== undefined){
	   			let li = document.createElement("li");
	 				li.innerHTML = tabTitle + ": " + response;
	 				maxWidth = updateWidth(li, maxWidth);
	 				document.getElementById("tabs").append(li);
    		}	    		
    	});
   	}
 	});
}

//clears the list of tabs
function clearList() {
	let list = document.getElementById("tabs");
	while(list.firstChild){
		list.removeChild(list.firstChild);
	}
}

//returns the title of the passed in tab
function getTitle(tab) {
	let tabTitle = tab.title.trim();
  //removes the text of the title after a "-" if one exists
  let titleDashIndex = tabTitle.indexOf("-");
  if (titleDashIndex != -1){
  	tabTitle = tabTitle.substring(0, titleDashIndex).trim();
  }		
  return tabTitle;
}

//changes the width of the popup so that each tab is one line. 
//The max width is set to 400px in find.css.
function updateWidth(li, maxWidth) {
	let canvas = document.createElement('canvas');
	let ctx = canvas.getContext("2d");
	ctx.font = "12px Arial";        
	let width = ctx.measureText(li.innerHTML).width + 20;
	console.log(width);
	if (width > maxWidth){
		document.body.style.width = "" + width + "px";
	}
	return width > maxWidth ? width : maxWidth;
}
