//David Jones
//MiU 1305
//Week 3 


$('#home').on('pageinit', function(){
	//code needed for home page goes here
});	
		
$('#addItem').on('pageinit', function(){

	var charForm = $('#characterDataForm'),
		errorsLink = $('#errorsLink')
	;
	charForm.validate({
		invalidHandler: function(form, validator) {
			errorsLink.click();
			var errorText = '';
			for(var key in validator.submitted){
				var label = $('label[for^="'+ key +'"]').not('.error');
				var legend = label.closest('fieldset').find('.ui-controlgroup-label');
				var fieldName = legend.length ? legend.text() : label.text();
				errorText += '<li>'+ fieldName +'</li>';
			};
			$("#recordErrors ul").html(errorText);
		},
		submitHandler: function() {
			var data = charForm.serializeArray();
				storeData(data);
				}
	});
	
	//any other code needed for addItem page goes here
	var clearData = get('clearData');
	clearData.addEventListener("click", clearLocal); 
	var dispData = get('dispData');
	dispData.addEventListener("click", getData);
	
});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

// Functions to find values of radio buttons.
function selRadio(){
	var rad = document.forms[1].sex;
	for (var i = 0; i<rad.length; i++){
		if(rad[i].checked){
		sexData = rad[i].value;
		}
	}
};

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
};

//getElementById Function
var get = function(elm){
		var theElm = document.getElementById(elm);
		return theElm;
}; // End of get.

//If no data stored, this will load default data.
var autofillData = function (){
 	//JSON.js file contains data used here.
	//Store data into local storage.
	for(var x in jsonObj){
		var ranId = Math.floor(Math.random()*100000001);
		localStorage.setItem(ranId, JSON.stringify(jsonObj[x]));
	}
}; // End of autofillData

var getData = function(){
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
};


//Stores data to local storage upon submit.
var storeData = function(data){
//If statement to determine if we are using a previous key or need to make a new one.

	if(!data){
		// Create random number for each character.
		var uniqueId        = Math.floor(Math.random()*100000001);
	}else{
		//Set the uniqueId to the existing key we are editing
		//This key has been passed from the editButton event handler
		//to the validateFields function, and then passed into this function.
		var uniqueId = data;
	}
//	var uniqueId        = Math.floor(Math.random()*100000001);
	// Get data from form and store in an object.
	// Object properties contain array with form label and input values.
	selRadio();
	chkBoxData();
	var obj 			= {};
		obj.cName 		= ["Name:", get('cName').value];
		obj.account 	= ["Account:", get('account').value];
		obj.server 	    = ["Server:", get('server').value];
		obj.guild 		= ["Guild:", get('guild').value];
		obj.today		= ["Today\'s Date:", get('today').value];
		obj.creation	= ["Creation Date:", get('creation').value];
		obj.charClass	= ["Class:", get('class').value];
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

}; // End of storeData

var	deleteItem = function (){
	var verify = confirm("Are you sure you want to delete this character?");
		if(verify){
			localStorage.removeItem(this.key);
			alert("Character was deleted.");
			window.location.reload();
		}else{
			alert("Character not deleted.");
		}		
}; // End of deleteItem
					
var clearLocal = function(){
	if(localStorage.length === 0){
			alert("Nothing to clear! Storage empty.");
		}else {
			localStorage.clear();
			alert("Character data was erased!")
			window.location.reload();
			return false;
		}
}; // End of clearLocal

//Sets the image for the correct class for each character.
function selectImage(className, subUl){
	var imgLi = document.createElement('li');
	subUl.appendChild(imgLi);
	var imageTag = document.createElement('img');
	imageTag.setAttribute("id", "classImg");
	var source = imageTag.setAttribute("src", "img/class_images/"+ className + ".png");
	imgLi.appendChild(imageTag);
}; // End of selectImage

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
	delChar.addEventListener("click", deleteItem);
	delChar.innerHTML = delText;
	makeEditLi.appendChild(delChar);
}; // End of createEditLinks

function editCharacter(){
	// Retrieve data from local storage.
	var keyVal = localStorage.getItem(this.key);
	var charObj = JSON.parse(keyVal);
	
	//Send data to form fields.
	get('cName').value = charObj.cName[1];
	get('account').value = charObj.account[1];
	get('server').value = charObj.server[1];
	get('guild').value = charObj.guild[1];
	get('today').value = charObj.creation[1];
	get('creation').value = charObj.creation[1];
	get('class').value = charObj.charClass[1];
	var sexRadios = document.forms[1].sex;
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


