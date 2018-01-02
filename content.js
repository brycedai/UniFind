chrome.runtime.onMessage.addListener(gotMessage);

//counts the number of times the message appears in a tab
function gotMessage(message, sender, sendResponse) {
	let search = message.txt.toLowerCase();
	let body = document.body;
	let bodyText = body.innerText.toLowerCase();
	let numFound = 0;
	let index = bodyText.indexOf(search, 0);
	while (index != -1) {
		numFound++;
		index = bodyText.indexOf(search, index + search.length);
	}
	// console.log(numFound);
	//sends the number of times the message was found back to popup.js
	sendResponse(numFound);
}

