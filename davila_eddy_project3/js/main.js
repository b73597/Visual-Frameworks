/* 
<!-- Eddy Davila -->
<!-- Project 3 -->
<!-- VFW 1304 -- >	
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
	alert("Transaction Saved!");
}

	// Get Data
	function getData(){
		toggleControls("on");
		if(localStorage.length ===0){
			alert("No data in local storage."); 
		}
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$('items').style.display = "block";
		for(var i=0, len=localStorage.length; i<len; i++){
			var makeli = document.createElement('li');
			var linksLi = document.createElement('li');
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
			makeSublist.appendChild(linksLi);
		}
		makeItemLinks(localStorage.key(i), linksLi); // Create edit/ delte buttons/links for e/item in Local Storage.
	}
}
//Make Item Links
//Create edit and delte links.
function makeItemLinks(key, linksLi) {
	//add edit single link
	var editLink = document.createElement('a');
	editLink.href = "#";
	editLink.key = key;
	var editText = "Edit Guitar Transaction";
	editLink.addEventListener("click", editItem);
	editLink.innerHTML = editText;
	linksLi.appendChild(editLink);

	// add linebreak
	var breakTag = document.createElement('br');
	linksLi.appendChild(breakTag);

	//add delete single link
	var deleteLink = document.createElement('a');
	deleteLink.href = "#";
	deleteLink.key = key;
	var deleteText = "Delete Guitar Transaction";
	deleteLink.addEventListener("click" , deleteItem);
	deleteLink.innerHTML = deleteText;
	linksLi.appendChild(deleteLink);
}

function editItem(){
		// grab data from local storage
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);

		// show form
		toggleControls("off");

		// populate the form fields with current localStorage values.
		$('fname').value = item.fname[1];
		$('lname').value = item.lname[1];
		$('email').value = item.email[1];
		$('date').value = item.date[1];
		$('guitar').value = item.guitar[1];
		$('store').value = item.store[1];
		$('rating').value = item.rating[1];
		$('pickups').value = item.pickups[1];
		$('strings').value = item.strings[1];
		$('effects').value = item.effects[1];
		var radios = document.forms[0].curency;
		for(var i = 0; i<radios.length; i++){
			if(radios.value == "Cash" && item.curency[1] == "Cash"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "Credit" && item.curency[1] == "Credit"){
				radios[i].setAttribute("checked", "checked");
			}
		}
		if(item.coupon[1] == "Yes"){
			$('coupon').setAttribute("checked", "checked");
		}
		$('comments').value = item.comments[1];

		// remove the initial listener from the input save button
		save.removeEventListener("click", storeData);

		// change submit button value to edit button
		$('submit').value = "Edit Guitar Transaction";
		var editSubmit = $('submit');

		//save key value
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
	}

	function deleteItem(){
		var ask = confirm("Are you sure you want to delete?");
		if(ask){
			localStorage.removeItem(this.key);
			alert("Contact was deleted!");
			window.location.reload();
		}else{
			alert("Contact was not deleted.");
		}
	}	
	// clear local data ------------------------------------------

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


	function validate(e){
		// what to validate
		var getFname = $('fname');
		var getLname = $('lname');
		var getEmail = $('email');

		// need input border 
		errMsg.innerHTML = "";
			getFname.style.border = "1px solid black";
			getLname.style.border = "1px solid black";
			getEmail.style.border = "1px solid black";

		// error messages
		var messageArry = [];
		// first name validation
		if(getFname.value === ""){
			var fNameError = "Please enter your First Name."
			getFname.style.border = "1px solid red";
			messageArry.push(fNameError);
		}
		// last name validation
		if(getLname.value === ""){
			var lNameError = "Please enter your Last Name."
			getLname.style.border = "1px solid red";
			messageArry.push(lNameError);
		}
		// email validation
		var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if(!(re.exec(getEmail.value))){
			var emailError = "Please enter a valid email address.";
			getEmail.style.border = "1px solid red";
			messageArry.push(emailError);
		}
		if(messageArry.length >= 1){
			for(var i =0, j=messageArry.length; i < j; i++){
				var txt = document.createElement('li');
				txt.innerHTML =messageArry[i];
				errMsg.appendChild(txt);
			}
			e.preventDefault();
			return false;
		}else{
			// save valid data
			storeData(this.key);
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