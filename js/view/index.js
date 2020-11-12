// list of all meta.json files
var urls = [
	"https://brandondevmn.github.io/DiceJs/meta.json",
	"https://brandondevmn.github.io/DiceJs2/meta.json"
];

// called on load
function onLoad() {
	// create view

	// loop over urls
	for(var i = 0; i < urls.length; i++){
		// for each url
		var url = urls[i];

		// pull data from urls
		http("GET", url, function(response){
			// parse the response
			var json = JSON.parse(response);

			// add it to the view
			// TODO
		});
	}
}

// simple http function
function http(verb, url, onResponse){
	var h = new XMLHttpRequest();
	
	h.onreadystatechange = function() {
		if(this.readyState === 4 && this.status === 200){
			onResponse(h.responseText);
		}
	};
	
	h.open("GET", url);
	h.send();
}