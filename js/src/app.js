function getDocument (url) {
	const templateXHR = new XMLHttpRequest();
	templateXHR.responseType = "document";
	templateXHR.addEventListener("load", function() {pushDoc(templateXHR.responseXML);}, false);
	templateXHR.open("GET", url, true);
	templateXHR.send();
	return templateXHR;
}

function pushDoc (document) {
	navigationDocument.pushDocument(document);
}

App.onLaunch = function (options) {
	const templateURL = 'http://localhost:9001/src/templates/alert.tvml';
	getDocument(templateURL);
}

App.onExit = function () {
	console.log('App finished');
}
