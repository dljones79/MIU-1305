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
	
});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

var autofillData = function (){
	 
};

var getData = function(){

};

var storeData = function(data){
	
}; 

var	deleteItem = function (){
			
};
					
var clearLocal = function(){

};


