var vue = null;
var urls = [
	"https://brandondevmn.github.io/DiceJs/meta.json"
];

function onLoad() {
	vue = new Vue({
		el: '#app',
		data: {
			apps: []
		}
	});
	
	for(var i = 0; i < urls.length; i++){
		var url = urls[i];
		http("GET", url, function(response){
			var json = JSON.parse(response);
			vue.data.apps.push(json);
		});
	}
}

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