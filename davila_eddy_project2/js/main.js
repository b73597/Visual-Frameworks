/* 
	Marco Rodriguez -->
  	06-07-12 -->
 	Project 2 -->
	VFW 1206 -- >
*/
// Javascript file 

//Wait for DOM to load
window.addEventListener("DOMContentLoaded", function(){
	//getElementById 
	function $(x){
		var theElement = document.getElementById(x);
		return theElement;
	}

	// Options Pickups
	function addPickups(){
		var formTag = document.getElementsByTagName("form"), // form element tag
			selectLi = $('pickups')
			makeSelect = document.createElement('select');
			makeSelect.setAttribute("id", "addon");

		for(var i=0, f=addon.length; i<f; i++){ // loop thru our variable data
			var makeOption = document.createElement('option');
			var optText = addon[i];
			makeOption.setAttribute("value", addon[i]);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}	
		selectLi.appendChild(makeSelect);
	}

	//  Options Strings

	function addStrings(){
		var formTag = document.getElementsByTagName("form"), // form element tag
			selectLi = $("strings"),
			makeSelect = document.createElement('select');
			makeSelect.setAttribute("id", "xtra");

		for(var i=0, h=xtra.length; i<h; i++){ // loop variable data
			var makeOption = document.createElement("option");
			var optText = xtra[i];
			makeOption.setAttribute("value", xtra[i]);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}	
		selectLi.appendChild(makeSelect);
	}

	// Options Effects

	function addEffects(){
		var formTag = document.getElementsByTagName("form"), // form element tag
			selectLi = $('effect'),
			makeSelect = document.createElement('select');
			makeSelect.setAttribute("id", "effects");

		for(var i=0, a=effects.length; i<a; i++){ // loop thru our variable data
			var makeOption = document.createElement('option');
			var optText = effects[i];
			makeOption.setAttribute("value", effects[i]);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}	
		selectLi.appendChild(makeSelect);
	}

	// Radio button function

	function getSelectedRadio(){
		var radios = document.forms[0].currency;
		for(var i=0; i<radios.length; i++){
			if(radios[i].checked){
				currencyValue = radios[i].value;
			}
		}
	}

	// CheckBox

	function getCheckboxValue(){
		if($('coupon').checked){
			siteValue = $('coupon').value;
		}else{
			siteValue = "No";
		}
	}

// toggle controls

function toggleControls(n){
	switch(n){
		case "on":
			$('contactForm').style.display  = "none";
			$('clear').style.display 		= "inline";
			$('displayLink').style.display 	= "none";
			$('addNew').style.display 		= "inline";
			break;
				// off
		case "off":
			$('contactForm').style.display  = "block";
			$('clear').style.display 		= "inline";
			$('displayLink').style.display 	= "inline";
			$('addNew').style.display 		= "none";
			$('items').style.display 		= "none";
			break;
		default:
			return false;		
		}
}

// stores object data
	function storeData(){
	var id = Math.floor(Math.random()*100000001); 
	getSelectedRadio();  
	getCheckboxValue(); 
	var item  				= {};
		item.fname			= ["First Name:", 	$('fname').value];
		item.lname			= ["Last Name:", 	$('lname').value];
		item.email			= ["Email:", 		$('email').value];
		item.date			= ["Date:", 		$('date').value];
		item.guitar			= ["Brand:", 		$('guitar').value];
		item.store			= ["Retailer:", 	$('store').value];
		item.rating		        = ["Ranking:", 		$('rating').value];
		item.pickups			= ["Pick Ups:", 	$('pickups').value];
		item.strings			= ["Incude Strings:", 	$('strings').value];
		item.effects			= ["Effects:", 		$('effects').value];
		item.curency			= ["Method of Payment:", currencyValue];
		item.coupon			= ["Have Coupon?:", 	siteValue];
		item.comments			= ["Comments:", 	$('comments').value];
	// Stringify
	localStorage.setItem(id, JSON.stringify(item));
	alert("Contact Saved!");
}

	// Get Data
	function getData(){
		toggleControls("on");
		if(localStorage.length ===0){
			alert("There is no data in local storage."); 
		}
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$('items').style.display = "block";
		for(var i=0, len=localStorage.length; i<len; i++){
			var makeli = document.createElement('li');
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value);
			var makeSublist = document.createElement('ul');
			makeli.appendChild(makeSublist);

		for(var n in obj){
			var makeSubli = document.createElement('li');
			makeSublist.appendChild(makeSubli);
			var optSubText = obj[n][0]+" "+obj[n][1];
			makeSubli.innerHTML = optSubText;
		} 
	}
}

	// clear local data

function clearLocal(){
	if(localStorage.length === 0){
		alert("Nothing to delete."); // alert
	}else{
		localStorage.clear();
		alert("All Data Deleted");
		window.location.reload();
		return false;
	}
}

	// Array for the drop down menu
	var addon = ["--Pick Ups--", "EMG", "D Mustain", "Axis"],
		xtra = ["--Strings--", "Nickel", "Elixir", "Ernie Ball"],
		effects = ["--Effects--", "Distortion", "Delay", "Reverb"],
		currencyValue // value
		siteValue = "No" //page value 
		;

	// Calling Drop-Down functions
		addPickups();
		addStrings();
		addEffects();	

	//Display Data
	var displayLink = $("displayLink");
	displayLink.addEventListener("click", getData);
	// clears local data event
	var clearLink = $("clear");
	clearLink.addEventListener("click", clearLocal);
	// submits stored data event 
	var save = $("submit");
	save.addEventListener("click", storeData);

});