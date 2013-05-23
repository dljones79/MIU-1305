// David Jones
// MIU 1305
// Week 3

//Don't initialize until the DOM is done loading.
window.addEventListener("DOMContentLoaded", function(){
	
	// When ready...
	window.addEventListener("load",function() {
		// Set a timeout...
		setTimeout(function(){
			// Hide the address bar!
			window.scrollTo(0, 1);
			}, 0);
	});

	//Variable Defaults
	var charClasses = ["-- Choose A Class --", "Berserker", "Guardian", "Paladin", "Shadowknight", "Monk", "Bruiser", 
		"Ranger", "Assassin", "Swashbuckler", "Beastlord", "Brigand", "Troubadour", "Dirge", "Mystic", "Defiler", "Templar",
		"Inquisitor", "Fury", "Warden", "Wizard", "Warlock", "Necromancer", "Conjuror", "Coercer", "Illusionist"],
		sexData,
		enervated,
		harrows,
		skyshrine,
		errorMessages = get('formErrors');
	; //End of Variable Defaults

	//getElementById Function
	function get(elm){
		var theElm = document.getElementById(elm);
		return theElm;
	}
	
	//Array Function to populate a form element. (JavaScript: Array Function)
	function createClassSelect(){
		var fTag = document.getElementsByTagName("form"), //This will be an array.
			selLi = get('selClass'),
			makeSel = document.createElement('select');
			makeSel.setAttribute("id", "classes");
			makeSel.setAttribute("data-native-menu", "false");
		for(var i=0, j=charClasses.length; i<j; i++){
			var createOp = document.createElement('option');
			var optionTxt = charClasses[i];
			createOp.setAttribute("value", optionTxt);
			createOp.innerHTML = optionTxt;
			makeSel.appendChild(createOp);
		}
		selLi.appendChild(makeSel);
	}
	
	// Functions to find values of radio buttons.
	function selRadio(){
		var rad = document.forms[0].sex;
		for (var i = 0; i<rad.length; i++){
			if(rad[i].checked){
			sexData = rad[i].value;
			}
		}
	}
	
	//Function to find checkbox data.
	function chkBoxData(){
		if(get('enervated').checked){
		 	enervated = "Yes";
		}else {
			enervated = "No";
		}
		
		if(get('harrows').checked){
			harrows = "Yes";
		}else {
			harrows = "No";
		}
		
		if(get('skyshrine').checked){
			skyshrine = "Yes";
		}else {
			skyshrine = "No";
		}
	} 
	
	function saveData(aKey){
		//If statement to determine if we are using a previous key or need to make a new one.
		if(!aKey){
			// Create random number for each character.
			var uniqueId        = Math.floor(Math.random()*100000001);
		}else{
			//Set the uniqueId to the existing key we are editing
			//This key has been passed from the editButton event handler
			//to the validateFields function, and then passed into this function.
			var uniqueId = aKey;
		}
		// Get data from form and store in an object.
		// Object properties contain array with form label and input values.
		selRadio();
		chkBoxData();
		var obj 			= {};
			obj.cName 		= ["Name:", get('cName').value];
			obj.account 	= ["Account:", get('account').value];
			obj.server 	    = ["Server:", get('server').value];
			obj.guild 		= ["Guild:", get('guild').value];
			obj.creation	= ["Creation Date:", get('creation').value];
			obj.today		= ["Today's Date:", get('today').value];
			obj.charClass	= ["Class:", get('classes').value];
			obj.sex 		= ["Sex:", sexData]; 
			obj.level 		= ["Level:", get('level').value];
			obj.aa 		    = ["AA\'s:", get('aa').value];
			obj.enervated   = ["Enervated:", enervated];
			obj.harrows 	= ["Harrows:", harrows];
			obj.skyshrine 	= ["Skyshrine:", skyshrine]; 
			obj.bio 		= ["Bio:", get('bio').value];
		//Using stringify to convert data to string and store into Local Data
		localStorage.setItem(uniqueId, JSON.stringify(obj));
		alert("Character Saved!");
		window.location.reload();	
	}
	
	//Switch/Case to toggle visibility of form and buttons.
	function controls(arg){
		switch(arg){
			case "on":
				get('characterDataForm').style.display = "none";
				get('clearData').style.display = "inline";
				get('dispData').style.display = "none";
				get('newChar').style.display = "inline";
				break;				
			case "off":
				get('characterDataForm').style.display = "block";
				get('clearData').style.display = "inline";
				get('dispData').style.display = "inline";
				get('newChar').style.display = "none";
				get('elements').style.display = "none";
				break;				
			default:
				return false;
		}
	}
	
	//Function to display saved character data on screen.
	function displayData(){
		controls("on");
		if(localStorage.length === 0){
			alert("No character data on file!  Default data added.");
			loadDefaultData();
		}
		//Gets data from local storage and writes it.
		var container = document.createElement('div');
		container.setAttribute("id", "elements");
		var makeUl = document.createElement('ul');
		container.appendChild(makeUl);
		document.body.appendChild(container);
		get('elements').style.display = "block";
		for(var i = 0, j=localStorage.length; i<j; i++){
			var makeListItem = document.createElement('li');
			var makeEditLi = document.createElement('li');
			makeUl.appendChild(makeListItem);
			var theKey = localStorage.key(i);
			var val = localStorage.getItem(theKey);
			//Converting to an object
			var newStr = JSON.parse(val);
			var subUl = document.createElement('ul');
			makeListItem.appendChild(subUl);
			selectImage(newStr.charClass[1], subUl);
			for(var x in newStr){
				var newLi = document.createElement('li');
				subUl.appendChild(newLi); 
				var optText = newStr[x][0]+" "+newStr[x][1];
				newLi.innerHTML = optText;
				subUl.appendChild(makeEditLi);
			}
			createEditLinks(localStorage.key(i), makeEditLi); //Function call to create edit and delete links.		
		}
	}
	
	//Sets the image for the correct class for each character.
	function selectImage(className, subUl){
		var imgLi = document.createElement('li');
		subUl.appendChild(imgLi);
		var imageTag = document.createElement('img');
		imageTag.setAttribute("id", "classImg");
		var source = imageTag.setAttribute("src", "img/class_images/"+ className + ".png");
		imgLi.appendChild(imageTag);
	}
	
	//Test data for form.  Auto Filled.
	function loadDefaultData(){
		//JSON.js file contains data used here.
		//Store data into local storage.
		for(var x in jsonObj){
			var ranId = Math.floor(Math.random()*100000001);
			localStorage.setItem(ranId, JSON.stringify(jsonObj[x]));
		}
		
	}
	//Creates edit and delete links for stored data.
	function createEditLinks(objKey, makeEditLi){
		//Edit Link
		var editChar = document.createElement('a');
		editChar.href = "#";
		editChar.key = objKey;
		var text = "Edit Character";
		editChar.addEventListener("click", editCharacter);
		editChar.innerHTML = text;
		makeEditLi.appendChild(editChar);
		
		var pageBreak = document.createElement('br');
		makeEditLi.appendChild(pageBreak);
		
		//Delete Link
		var delChar = document.createElement('a');
		delChar.href = "#";
		delChar.key = objKey;
		var delText = "Delete Character";
		delChar.addEventListener("click", deleteCharacter);
		delChar.innerHTML = delText;
		makeEditLi.appendChild(delChar);
	}
	
	function editCharacter(){
		// Retrieve data from local storage.
		var keyVal = localStorage.getItem(this.key);
		var charObj = JSON.parse(keyVal);
		
		//Show the form
		controls("off");
		
		//Send data to form fields.
		get('cName').value = charObj.cName[1];
		get('account').value = charObj.account[1];
		get('server').value = charObj.server[1];
		get('guild').value = charObj.guild[1];
		get('creation').value = charObj.creation[1];
		get('today').value = charObj.today[1];
		get('classes').value = charObj.charClass[1];
		var sexRadios = document.forms[0].sex;
		for(var i=0; i<sexRadios.length; i++){
			if(sexRadios[i].value == "Male"){
				sexRadios[i].setAttribute("checked", "checked");
			}else if(sexRadios[i].value == "Female"){
				sexRadios[i].setAttribute("checked", "checked");
			}
		}
		get('level').value = charObj.level[1];
		get('lvl').innerHTML = charObj.level[1]; //Sets output for level range.
		get('aa').value = charObj.aa[1];
		get('alternate').innerHTML = charObj.aa[1]; //Sets output for aa range.
		if(charObj.enervated[1] == "Yes"){
			get('enervated').setAttribute("checked", "checked");
		}
		if(charObj.harrows[1] == "Yes"){
			get('harrows').setAttribute("checked", "checked");
		}
		if(charObj.skyshrine[1] == "Yes"){
			get('skyshrine').setAttribute("checked", "checked");
		}
		get('bio').value = charObj.bio[1];
		
		//Remove listener from Add Character button
		addChar.removeEventListener("click", saveData);
		//Change value of button to edit
		get('addChar').value = "Edit Character";
		var editButton = get('addChar');
		//Save the key value established in this function as a property of the editButton event
		//so we can use that value when we save the data we edited.
		editButton.addEventListener("click", validateFields);
		editButton.key = this.key;
	}
	
	function deleteCharacter(){
		var verify = confirm("Are you sure you want to delete this character?");
		if(verify){
			localStorage.removeItem(this.key);
			alert("Character was deleted.");
			window.location.reload();
		}else{
			alert("Character not deleted.");
		}
	}
	//Function to clear all data in local storage.
	function clearAllData(){
		if(localStorage.length === 0){
			alert("Nothing to clear! Storage empty.");
		}else {
			localStorage.clear();
			alert("Character data was erased!")
			window.location.reload();
			return false;
		}
	}
	
	function validateFields(eventData){
		//Defining elements needed to check
		var getName = get('cName');
		var getAccount = get('account');
		var getClass = get('classes');
		
		//Reset messages
		errorMessages.innerHTML = "";
			getName.style.border = "1px solid black";
			getAccount.style.border = "1px solid black";
			getClass.style.border = "1px solid black";
			
		//Check elements and get error messages.
		var messages = [];
		
		//Validations
		if(getName.value === ""){
			var cNameError = "Please enter a character name.";
			getName.style.border = "1px solid red";
			messages.push(cNameError);
		}
		
		if(getAccount.value === ""){
			var accountError = "Please enter an account.";
			getAccount.style.border = "1px solid red";
			messages.push(accountError);
		}
		
		if(getClass.value === "--Choose A Class--"){
			var classError = "Please choose a class.";
			getClass.style.border = "1px solid red";
			messages.push(classError);
		}
		
		//If errors present, we will display them on the screen
		if(messages.length >= 1){
			for(var i = 0, j=messages.length; i < j; i++){
				var errText = document.createElement('li');
				errText.setAttribute("id", "errorLi");
				errText.innerHTML = messages[i];
				errorMessages.appendChild(errText);
			}
			eventData.preventDefault();
			return false;
		}else{
			//Save data if no errors are present. 
			//Sending key value (Key value comes from the editCharacter function).
			//This key value was passed throught the editButton event listener as a property.
			saveData(this.key);
		}

	}

	//Calling function to build character class select data.
	createClassSelect();

	//Event Listeners for Links and Button Clicks
	var dispData = get('dispData');
	dispData.addEventListener("click", displayData);
	var clearData = get('clearData');
	clearData.addEventListener("click", clearAllData); 
	var addChar = get('addChar');
	addChar.addEventListener("click", validateFields);
	
});


