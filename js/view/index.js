// list of all meta.json files
var urls = [
	"https://brandondevmn.github.io/DiceJs/meta.json",
	"https://brandondevmn.github.io/DiceJs2/meta.json"
];

// list of loaded apps
var apps = [];
var currentApp = null;

// called on load
function onLoad() {
	// set height
	setAppSize();
	
	// default view
	switchView('appList');

	// load each url for meta data, then load UI
	loadUrlFromList(0, loadAppListUI);
}

function setAppSize() {
	var app = document.getElementById('app');
	app.style.height = window.innerHeight;
	app.style.width = window.innerWidth;
}

function loadAppSingleUI()
{
	// get view div
	var view = document.getElementById('appSingle');

	// create icon
	var icon = document.createElement("img");
	icon.classList.add("appIcon");
	icon.setAttribute("src", currentApp.icon);
	view.appendChild(icon);

	// create label
	var label = document.createElement("div"); 
	label.classList.add("appLabel");
	label.innerText = currentApp.name;
	view.appendChild(label);

	// create launch button
}

function loadAppListUI()
{
	// find app list
	var appList = document.getElementById('appList');

	// loop over found apps
	apps.forEach(app => {
		// create the div
		var listing = document.createElement("div"); 
		listing.onclick = function()
		{
			currentApp = app;
			switchView('appSingle');
		};
		listing.classList.add("appListing");
		appList.appendChild(listing);

		// create icon
		var icon = document.createElement("img");
		icon.classList.add("appIcon");
		icon.setAttribute("src", app.icon);
		listing.appendChild(icon);

		// create label
		var label = document.createElement("div"); 
		label.classList.add("appLabel");
		label.innerText = app.name;
		listing.appendChild(label);
	});
}

function switchView(viewId)
{
	// hide all views
	var views = document.getElementsByClassName("view");
	for(var i = 0; i < views.length; i++)
	{
		views[i].style.visibility = 'hidden';
	}

	// grab the view
	var view = document.getElementById(viewId);

	// check if we should run js
	if(view.hasAttribute('onview') == true)
	{
		// pull the js we should run
		var js = view.getAttribute('onview');

		// run the js
		eval(js);
	}

	// switch views
	view.style.visibility = 'visible';
}

function loadUrlFromList(index, whenDone)
{
	// check if we are done
	if(urls.length <= index)
	{
		whenDone();
	}
	else
	{
		// pull url
		var url = urls[index];

		// pull data from urls
		http("GET", url, function(response){
			// parse the response
			var app = JSON.parse(response);

			// add to values
			apps.push(app);

			// call next
			loadUrlFromList(index+1, whenDone);
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